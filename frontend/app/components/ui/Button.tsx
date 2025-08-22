"use client";

import React from "react";
import Spinner from "@/components/ui/Spinner";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  fullWidth?: boolean;
  variant?: ButtonVariant;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-primary-600 to-secondary-600 hover:from-primary-500 hover:to-secondary-500 text-white",
  secondary:
    "bg-dark-700/50 hover:bg-dark-600/50 border border-dark-600 text-white",
  outline:
    "bg-transparent border border-dark-600 text-white hover:bg-dark-700/30",
  ghost:
    "bg-transparent text-white hover:bg-dark-700/30",
};

export function Button({
  loading = false,
  fullWidth = true,
  variant = "primary",
  className = "",
  children,
  disabled,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-lg font-semibold transition-all duration-200 px-4 py-3 disabled:cursor-not-allowed disabled:opacity-60";
  return (
    <button
      className={`${base} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading}
      {...rest}
    >
      {loading && <Spinner className="mr-2" />}
      {children}
    </button>
  );
}

export default Button;
