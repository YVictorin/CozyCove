import React from "react";

const SupportTextBox = ({ text }) => {
  return (
    <div className="p-4 bg-blue-100 rounded-md shadow-md">
      <p className="text-blue-700">{text}</p>
    </div>
  );
};

export default SupportTextBox;
