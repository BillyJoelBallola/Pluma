"use client";

import React, {
  useRef,
  useEffect,
  useImperativeHandle,
  forwardRef,
  TextareaHTMLAttributes,
} from "react";

type Props = {
  placeholder?: string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const AutoResizingTextAria = forwardRef<HTMLTextAreaElement, Props>(
  ({ placeholder, className, ...rest }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const resize = () => {
      const el = textareaRef.current;
      if (el) {
        el.style.height = "auto";
        el.style.height = `${el.scrollHeight}px`;
      }
    };

    useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

    useEffect(() => {
      resize();
    }, []);

    return (
      <textarea
        ref={textareaRef}
        onInput={resize}
        placeholder={placeholder}
        rows={1}
        className={`${className} outline-0 text-2xl font-bold resize-none overflow-hidden w-full`}
        {...rest}
      />
    );
  }
);

AutoResizingTextAria.displayName = "AutoResizingTextAria";

export default AutoResizingTextAria;
