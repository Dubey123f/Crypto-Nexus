import React from "react";
import "@/app/globals.css";
export const Input = ({ id, value, onChange, className = "" }) => (
  <input
    id={id}
    type="text"
    value={value}
    onChange={onChange}
    className={`border p-2 rounded ${className}`}
  />
);
