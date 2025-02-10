import { Space_Mono } from "next/font/google";
import Link from "next/link";

const space = Space_Mono({
  subsets: ["latin"],
  weight: ["400"],
});

function Navbar() {
  return (
    <nav className={space.className}>
      <div className="px-5 lg:px-10 pt-6">
        <ul className="grid grid-cols-1 text-xl gap-y-4 md:flex md:items-center md:justify-between">
          <li>
            <h1 className="text-2xl font-semibold">Nico Suwanto</h1>
            <h2>Frontend Developer</h2>
          </li>
          <li>
            <Link
              href="/"
              className="hover:border-b-4 hover:border-black transition-all duration-200 block md:inline"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/work"
              className="hover:border-b-4 hover:border-black transition-all duration-200 block md:inline"
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="hover:border-b-4 hover:border-black transition-all duration-200 block md:inline"
            >
              Contact
            </Link>
          </li>
          <li className="hidden md:block">
            <h1>Currently working on</h1>
            <h2 className="font-bold">PT. Pharos Indonesia</h2>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
