import React from "react";

export type RowProps = {
  children?: React.ReactNode;
  className?: string;
};

const Row: React.FC<RowProps> = ({ children, className }) => {
  return <div className={`flex flex-row ${className}`}>{children}</div>;
};

export default Row;
