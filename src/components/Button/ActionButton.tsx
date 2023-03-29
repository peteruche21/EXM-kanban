import React, { FC } from "react";
import { IActionButton } from "../../types";

const ActionButton: FC<IActionButton> = ({
  text,
  type,
  classname,
  callback,
}) => {
  return (
    <button
      className={`btn btn-accent capitalize ${classname}`}
      onClick={callback}
      type={type}
    >
      {text}
    </button>
  );
};

export default ActionButton;
