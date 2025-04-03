// import React from "react";

// export const Card = ({ children, className = "" }) => (
//   <div className={`bg-white text-black p-4 rounded-lg shadow-md ${className}`}>
//     {children}
//   </div>
// );

// export const CardHeader = ({ children }) => (
//   <div className="border-b pb-2 mb-2">{children}</div>
// );

// export const CardTitle = ({ children }) => (
//   <h2 className="text-lg font-bold">{children}</h2>
// );

// export const CardContent = ({ children }) => <div>{children}</div>;


import React from "react";
import "@/app/globals.css";
// Main Card Component
export const Card = ({ children, className = "" }) => (
  <div className={`bg-gray-900 text-white p-6 rounded-xl shadow-lg border border-gray-700 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${className}`}>
    {children}
  </div>
);

// Card Header
export const CardHeader = ({ children, className = "" }) => (
  <div className={`border-b border-gray-700 pb-4 mb-4 ${className}`}>
    {children}
  </div>
);

// Card Title
export const CardTitle = ({ children, className = "" }) => (
  <h2 className={`text-2xl font-bold text-white tracking-tight ${className}`}>
    {children}
  </h2>
);

// Card Description
export const CardDescription = ({ children, className = "" }) => (
  <p className={`text-gray-400 text-sm leading-relaxed ${className}`}>
    {children}
  </p>
);

// Card Content
export const CardContent = ({ children, className = "" }) => (
  <div className={`text-gray-300 ${className}`}>{children}</div>
);

// Card Footer
export const CardFooter = ({ children, className = "" }) => (
  <div className={`border-t border-gray-700 pt-4 mt-4 flex justify-between items-center ${className}`}>
    {children}
  </div>
);
