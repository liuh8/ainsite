import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-8">
      <Head>
        <title>AinSite - Home</title>
      </Head>
      <nav className="flex space-x-8 mb-8">
        <a href="/projects" className="text-xl md:text-2xl lg:text-3xl hover:text-primary transition-colors duration-300">
          Projects
        </a>
        <a href="#contact" className="text-xl md:text-2xl lg:text-3xl hover:text-primary transition-colors duration-300">
          Contact
        </a>
      </nav>
      <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 opacity-0 text-foreground animate-fadeIn">
        AinSite
      </h1>
      <p className="text-lg md:text-xl lg:text-2xl text-center max-w-2xl px-4 opacity-0 animate-fadeIn delay-500">
        Hello, I'm Ainsley, welcome to my portfolio!!
      </p>
    </div>
  );
}