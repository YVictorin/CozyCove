import React from "react";

const SupportTextBox = ({ text, user }) => {
  return (
    <div
      className={`p-1 xs:p-1.5 sm:p-3 md:p-4 rounded-md shadow-md mb-1 xs:mb-1.5 sm:mb-2 ${
        user
          ? "bg-blue-100 self-end ml-auto"
          : "bg-gray-100 self-start mr-auto"
      } max-w-[95%] xs:max-w-[90%] sm:max-w-[75%] md:max-w-[60%]`}
    >
      <p className={`${
        user ? "text-blue-700" : "text-gray-700"
      } break-words text-[9px] xs:text-[10px] sm:text-sm md:text-base leading-tight xs:leading-normal`}>
        {text}
      </p>
    </div>
  );
};

export default SupportTextBox;