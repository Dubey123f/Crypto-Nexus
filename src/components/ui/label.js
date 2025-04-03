import React from "react";
import "@/app/globals.css";
export const Label = ({ htmlFor, className = "", children }) => (
  <label htmlFor={htmlFor} className={`font-medium ${className}`}>
    {children}
  </label>
);
