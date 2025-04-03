import Link from "next/link";

const NavButton = ({ href, label, active }) => {
  return (
    <Link 
      href={href} 
      className={`px-4 py-2 rounded-md transition-all duration-300 
        ${active ? "bg-blue-500 text-white" : "hover:bg-gray-700 text-gray-300"}`}
    >
      {label}
    </Link>
  );
};

export default NavButton;
