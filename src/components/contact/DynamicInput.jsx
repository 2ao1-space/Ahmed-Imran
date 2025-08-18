import { useRef, useEffect } from "react";

export const DynamicInput = ({
  name,
  placeholder,
  value,
  onChange,
  isLoading,
  type = "text",
}) => {
  const spanRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-resize input based on content
  useEffect(() => {
    if (spanRef.current && inputRef.current) {
      const spanWidth = spanRef.current.offsetWidth;
      inputRef.current.style.width = `${spanWidth + 5}px`;
    }
  }, [value]);

  return (
    <span className="relative inline-block min-w-[50px]">
      {/* Hidden span to measure text width */}
      <span ref={spanRef} className="absolute invisible whitespace-nowrap px-1">
        {value || placeholder}{" "}
      </span>

      {/* Actual input */}
      <input
        ref={inputRef}
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="inline-block bg-transparent text-main text-base md:text-3xl font-medium border-b border-main placeholder:text-main dark:border-white/30 focus:outline-none focus:border-primary-500 px-1 transition-all"
        style={{ minWidth: "50px", width: value ? "auto" : "120px" }}
        disabled={isLoading}
        autoComplete={
          name === "email" ? "email" : name === "name" ? "name" : "off"
        }
      />
    </span>
  );
};
