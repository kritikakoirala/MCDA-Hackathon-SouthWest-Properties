import React from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`border-0 ${className}  bg-primary-color p-1 px-4  rounded-pill text-center`}
    >
      {children}
    </button>
  );
};

export default Button;
