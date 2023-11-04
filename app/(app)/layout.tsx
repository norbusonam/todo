"use client";

import {
  IconCalendar,
  IconCheckSquare,
  IconCoffee,
  IconComment,
  IconLogout,
  IconProject,
  IconSetting,
  IconUnorderedList,
  IconUser,
} from "@taskbrew/components/icons";
import {
  AccountModalContent,
  FeedbackModalContent,
  Modal,
  SettingsModalContent,
} from "@taskbrew/components/modal";
import { SidebarButton } from "@taskbrew/components/sidebar-button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Toaster } from "react-hot-toast";

export default function Layout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const session = useSession();
  const router = useRouter();
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false);
  const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);

  if (session.status === "unauthenticated") {
    redirect("/auth");
  }

  return (
    <div className="flex">
      {/* sidebar */}
      <div className="h-screen">
        <div className="flex h-full flex-col justify-between bg-neutral-100 p-4 shadow-md dark:bg-neutral-900 md:w-72">
          <div className="space-y-2 overflow-scroll text-center md:text-left">
            <Link
              href="/list"
              className="mb-4 inline-block space-x-2 transition-opacity hover:opacity-50"
            >
              <IconCoffee className="inline h-6 w-6" />
              <h2 className="hidden align-bottom text-xl font-medium leading-none md:inline">
                Taskbrew
              </h2>
            </Link>
            <h3 className="text-xs font-bold">VIEWS</h3>
            <div className="space-y-1">
              <SidebarButton
                text="List"
                icon={<IconUnorderedList className="h-6 w-6" />}
                active={pathname === "/list"}
                onClick={() => router.push("/list")}
              />
              <SidebarButton
                text="Board"
                icon={<IconProject className="h-6 w-6" />}
                active={pathname === "/board"}
                onClick={() => router.push("/board")}
              />
              <SidebarButton
                text="Calendar"
                icon={<IconCalendar className="h-6 w-6" />}
                active={pathname === "/calendar"}
                onClick={() => router.push("/calendar")}
              />
            </div>
            <h3 className="text-xs font-bold">OTHER</h3>
            <div className="space-y-1">
              <SidebarButton
                text="Completed"
                icon={<IconCheckSquare className="h-6 w-6" />}
                active={pathname === "/completed"}
                onClick={() => router.push("/completed")}
              />
            </div>
          </div>
          <div className="space-y-1 border-t-[1px] border-neutral-200 pt-2 dark:border-neutral-800">
            <SidebarButton
              text="Account"
              icon={
                session.data?.user?.image ? (
                  <Image
                    className="h-6 w-6 rounded-full"
                    width={24}
                    height={24}
                    src={session.data.user.image}
                    alt="Profile picture"
                  />
                ) : (
                  <IconUser className="h-6 w-6" />
                )
              }
              onClick={() => setIsAccountModalOpen(true)}
            />
            <SidebarButton
              text="Settings"
              icon={<IconSetting className="h-6 w-6" />}
              onClick={() => setIsSettingsModalOpen(true)}
            />
            <SidebarButton
              text="Feedback"
              icon={<IconComment className="h-6 w-6" />}
              onClick={() => setIsFeedbackModalOpen(true)}
            />
            <SidebarButton
              text="Sign out"
              icon={<IconLogout className="h-6 w-6" />}
              className="hover:bg-red-300 active:bg-red-400 dark:hover:bg-red-500 dark:active:bg-red-600"
              onClick={signOut}
            />
          </div>
        </div>
      </div>

      {/* account modal */}
      <Modal
        isOpen={isAccountModalOpen}
        closeModal={() => setIsAccountModalOpen(false)}
        title="Account"
        description="Your account details"
        hasCloseButton
      >
        <AccountModalContent />
      </Modal>

      {/* settings modal */}
      <Modal
        isOpen={isSettingsModalOpen}
        closeModal={() => setIsSettingsModalOpen(false)}
        title="Settings"
        hasCloseButton
      >
        <SettingsModalContent />
      </Modal>

      {/* feedback modal */}
      <Modal
        isOpen={isFeedbackModalOpen}
        closeModal={() => setIsFeedbackModalOpen(false)}
        title="Feedback"
        description="Tell us about your experience"
        hasCloseButton
      >
        <FeedbackModalContent
          closeModal={() => setIsFeedbackModalOpen(false)}
        />
      </Modal>

      {/* page */}
      {children}

      {/* toast setup */}
      <Toaster
        position="bottom-center"
        toastOptions={{
          className: "dark:bg-neutral-800 dark:text-white min-w-[250px]",
        }}
      />
    </div>
  );
}
