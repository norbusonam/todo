import { useRef, useState } from "react";

type Props = {
  text: string;
  onTextChanged: (text: string) => void;
  placeholder?: string;
  isTextArea?: boolean;
  fadedAppearance?: boolean;
  className?: string;
  canBeEmpty?: boolean;
};

export function EditableText(props: Props) {
  const [isEditingText, setIsEditingText] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") {
      inputRef.current?.blur();
    }
  };

  const updateText = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsEditingText(false);
    const newText = e.target.value.trim();
    // update if text exists
    if (!props.canBeEmpty && newText === "") return;
    if (newText === props.text) return;
    props.onTextChanged(newText);
  };

  return isEditingText ? (
    props.isTextArea ? (
      <textarea
        autoFocus
        ref={textareaRef}
        placeholder={props.placeholder}
        className={`w-full rounded-md bg-transparent px-1 outline-none ${
          props.fadedAppearance && "text-neutral-500"
        } ${props.className}`}
        onKeyDown={handleKeyDown}
        defaultValue={props.text}
        onBlur={updateText}
      />
    ) : (
      <input
        autoFocus
        ref={inputRef}
        placeholder={props.placeholder}
        type="text"
        className={`w-full rounded-md bg-transparent px-1 outline-none ${
          props.fadedAppearance && "text-neutral-500"
        } ${props.className}`}
        onKeyDown={handleKeyDown}
        defaultValue={props.text}
        onBlur={updateText}
      />
    )
  ) : (
    <button
      // pot text on top
      className={`flex overflow-hidden rounded-md px-1 text-left transition-colors hover:bg-neutral-200 active:bg-neutral-300 dark:hover:bg-neutral-800 dark:active:bg-neutral-700 ${
        props.fadedAppearance && "text-neutral-500"
      } ${props.className}`}
      onClick={() => setIsEditingText(true)}
    >
      {props.text === "" ? (
        <span className="italic text-neutral-500">Empty</span>
      ) : (
        <p
          className={props.isTextArea ? "whitespace-pre-wrap" : "line-clamp-1"}
        >
          {props.text}
        </p>
      )}
    </button>
  );
}
