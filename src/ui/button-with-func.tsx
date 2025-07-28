import React from "react";

export interface ButtonProps {
  buttonName: string;
  buttonFunc: () => void;
}

const FuncButton: React.FC<ButtonProps> = (props) => {
  return (
    <button
      className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      onClick={props.buttonFunc}
    >
      {props.buttonName}
    </button>
  );
};

export default FuncButton;
