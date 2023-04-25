import React, { MouseEventHandler, ReactNode } from "react";
import "../css/Button.css";
import { ITestable } from "../../common";

interface IButton {
  className?: string;
  active?: boolean;
  color?: string;
  children?: ReactNode;
  onClick?: MouseEventHandler<HTMLDivElement>;
}

const Button: React.FC<IButton & ITestable> = props => {
  let classVar = "btn";
  if (props.className) {
    classVar = `${props.className} ${classVar}`;
  }
  if (props.active) {
    classVar += " active";
  }
  const buttonStyle = {
    backgroundColor: props.active ? "#ddd" : props.color || "#ccc",
    padding: "4px",
    margin: "4px",
    borderRadius: "5px",
    cursor: "pointer"
  };
  return (
    <div style={buttonStyle} className={classVar} onClick={props.onClick} role="button" data-testid={props.testId}>
      {props.children}
    </div>
  );
};

export default Button;
