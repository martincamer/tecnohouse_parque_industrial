import React from "react";

export const Button = ({ type, titulo }) => {
  return (
    <button
      className="bg-black py-2 px-6 w-full rounded-xl text-white text-base  hover:shadow-slate-300 hover:shadow-md  transition-all ease-in-out duration-300"
      type={type}
    >
      {titulo}
    </button>
  );
};
