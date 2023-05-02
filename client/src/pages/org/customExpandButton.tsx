import React from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import "./styles.css";
import { FC } from 'react';


const CustomExpandButton: FC<any> = (node) => {
  return (
    <>
      {node && (
        <div className="expand-btn">
          <span >{node.children ? <FaAngleUp size={35} /> : <FaAngleDown size={35} />}</span>
        </div>
      )}
    </>
  );
};

export default CustomExpandButton;
