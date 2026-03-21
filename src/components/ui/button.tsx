"use client";

import { useEffect } from "react";

interface ButtonProps {
  loading?: boolean;
  children: React.ReactNode;
  loadingText?: string;
  type?: "submit" | "button" | "reset";
  disabled?: boolean;
  className?: string;
}

function Button({
  loading = false,
  children,
  loadingText = "Loading...",
  type = "submit",
  disabled,
  className,
}: ButtonProps) {
  useEffect(() => {
    import("ldrs").then(({ ring }) => ring.register());
  }, []);

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`bg-[#4F46E5] hover:bg-[#4338CA] cursor-pointer transition-colors py-2.5 rounded-md text-white font-semibold text-sm w-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 ${className} `}
    >
      {loading ? (
        <>
          {loadingText}
          <l-ring size="18" stroke="2" color="white" speed="2" />
        </>
      ) : (
        children
      )}
    </button>
  );
}


export default Button;