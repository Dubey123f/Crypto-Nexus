import React, { useState } from "react";
import { Clock } from "lucide-react"; // ✅ Import the missing Clock icon
import "@/app/globals.css";
// Select Wrapper
export const Select = ({ children, className = "" }) => (
  <div className={`relative w-full ${className}`}>{children}</div>
);

// Select Trigger (Dropdown Button)
export const SelectTrigger = ({ value, onClick, className = "" }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-between w-full bg-gray-900 text-white px-4 py-2 rounded-lg border border-gray-700 shadow-md transition-all duration-300 hover:border-blue-500 focus:ring-2 focus:ring-blue-500 ${className}`}
  >
    <span>{value || "Select an option"}</span>
    <Clock className="w-5 h-5 text-gray-400" />
  </button>
);

// Select Content (Dropdown Menu)
export const SelectContent = ({ children, isOpen, className = "" }) => (
  <div
    className={`absolute mt-2 w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg transition-all transform ${
      isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
    } ${className}`}
  >
    {children}
  </div>
);

// Select Item
export const SelectItem = ({ children, onClick, icon: Icon, className = "" }) => (
  <div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-2 cursor-pointer text-white hover:bg-gray-800 transition-all ${className}`}
  >
    {Icon && <Icon className="w-5 h-5 text-gray-400" />}
    {children}
  </div>
);

// Select Value (Displays Selected Option)
export const SelectValue = ({ children }) => <span>{children}</span>;
