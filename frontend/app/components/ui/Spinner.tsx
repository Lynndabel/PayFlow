"use client";

import { Loader2 } from "lucide-react";
import React from "react";

export interface SpinnerProps {
  size?: number;
  className?: string;
  "aria-label"?: string;
}

export function Spinner({ size = 16, className = "", ...rest }: SpinnerProps) {
  return (
    <Loader2
      className={`animate-spin ${className}`}
      style={{ width: size, height: size }}
      aria-live="polite"
      role="status"
      {...rest}
    />
  );
}

export default Spinner;
