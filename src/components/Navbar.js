import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="flex space-x-8">
      <Link href="#projects" className="text-xl md:text-2xl lg:text-3xl hover:text-primary hover:underline hover:scale-105 transition-transform transition-colors duration-300">
        Projects
      </Link>
      <Link href="#contact" className="text-xl md:text-2xl lg:text-3xl hover:text-primary hover:underline hover:scale-105 transition-transform transition-colors duration-300">
        Contact
      </Link>
    </nav>
  );
};

export default Navbar;