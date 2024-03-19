import React from "react";

export const Input = ({ type, placeholder, register }) => {
  return (
    <input
      {...register(type, { required: true })}
      type={type}
      placeholder={placeholder}
      className="rounded-xl py-[8px] px-2 w-full shadow-sm border-slate-300 border-[1px] bg-white outline-none  outline-[1px] placeholder:text-sm"
    />
  );
};
