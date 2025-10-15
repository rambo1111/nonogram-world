import React from "react";
import { Loader } from "lucide-react";

interface NeoButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  variant?: "primary" | "secondary" | "accent" | "neutral"; // Add "neutral"
  isLoading?: boolean;
  disabled?: boolean;
}

const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  isLoading = false,
  disabled = false,
}) => {
  const colorClasses = {
    primary: "bg-yellow-300 hover:bg-yellow-400 border-black",
    secondary: "bg-pink-400 hover:bg-pink-500 border-black",
    accent: "bg-cyan-400 hover:bg-cyan-500 border-black",
    neutral: "bg-gray-600 hover:bg-gray-700 text-white border-black",
  };
  const primaryShine = variant === "primary" ? "animate-shine" : "";

  return (
    <button
      onClick={onClick}
      disabled={isLoading || disabled}
      className={`relative font-bold py-3 px-6 border-2 rounded-lg shadow-neo transition-all duration-150 transform hover:-translate-y-1 active:shadow-neo-sm active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-neo overflow-hidden ${colorClasses[variant]} ${className}`}
    >
      <span className={`absolute top-0 left-0 w-full h-full ${primaryShine}`} />
      <span className="relative z-10 flex items-center justify-center gap-3">
        {isLoading && <Loader className="animate-spin" />}
        {children}
      </span>
    </button>
  );
};

export default NeoButton;