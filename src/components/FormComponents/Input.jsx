import React, { forwardRef } from "react";
import { useId } from "react";

function Input({ label, type = "text", className = "", ...props }, ref) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <div className="mb-1 px-3 py-1 text-md md:text-base  text-left font-bold">
          <label htmlFor={id}>{`${label}: `}</label>
        </div>
      )}
      <input
        type={type}
        className={`block px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
        id={id}
        {...props}
        ref={ref}
      />
    </div>
  );
}

export default forwardRef(Input);
