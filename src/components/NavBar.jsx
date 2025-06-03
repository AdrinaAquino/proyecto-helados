export default function NavBar({ toggleMenu }) {
  return (
    <div className="bg-[#7a4193] text-white p-4 flex justify-between items-center shadow-md shadow-violet-200">
      <img src="logo.jpeg" alt="Logo" className="h-10 rounded-full" />
      <button className="md:hidden" onClick={toggleMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8 p-1 rounded-full cursor-pointer hover:bg-[#8b7ce8]"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>
  );
}
