const Navbar = () => {
  return (
    <header className="z-10 backdrop-blur-sm sticky top-0">
      <nav className="container px-1 flex py-2 items-center ">
        <img src="/assets/images/logo.png" alt="" />
        <div className="ml-auto space-x-2">
          <button className="rounded-full border border-black text-black px-5 py-2 duration-200 hover:bg-black hover:text-white">
            Sign Up
          </button>
          <button className="rounded-full border border-transparent bg-black text-white px-5 py-2 duration-200 hover:bg-black/80">
            Sign In
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
