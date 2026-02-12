import { Link } from "react-router-dom";
import { MdPerson } from "react-icons/md";


export default function Navbar() {
  return (
    <header className="h-16 bg-white shadow flex items-center justify-end px-6">
      <Link
        to="/login"
        className="flex items-center gap-2 text-gray-700 hover:text-black font-medium"
      >
       <MdPerson className="text-xl" />
        <span>Login</span>
      </Link>
    </header>
  );
}
