import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, className = "" }) => {
  return (
    <div
      className={`w-full bg-white border-2 border-black rounded-xl p-6 shadow-neo-lg ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;