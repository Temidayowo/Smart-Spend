"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface InputProps {
  label: string;
  placeholder: string;
  name: string;
  hasIcon?: boolean;
  required?: boolean;
}

const Input = ({ label, placeholder, name, hasIcon, required }: InputProps) => {
  const [show, setShow] = useState(false);
  //   const [value, setValue] = useState("");

  return (
    <div className="flex flex-col gap-2 relative w-full">
      <label htmlFor={name} className="text-[15px] font-medium">
        {label}
      </label>

      <div className="relative">
        <input
          type={hasIcon ? (show ? "text" : "password") : "text"}
          id={name}
          name={name}
          placeholder={placeholder}
          required={required}
          className="border outline-none font-normal border-[#d5d1db] font-medium text-small bg-white box-border px-4 py-2 rounded-lg w-full pr-10 focus:border-[#4F46E5] focus:ring-2 focus:ring-[#4F46E5]/20 transition-all"
        />

        {hasIcon && (
          <button
            type="button"
            onClick={() => setShow(!show)}
            className="absolute inset-y-0 right-3 flex items-center"
          >
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
