import Link from "next/link";

const NavBar = () => {
  return (
    <div
      className="fixed inset-x-0 top-0 flex flex-row justify-between
        w-screen bg-black text-white z-50"
    >
      <Link href={"/"}>
        <div className="pl-6 p-3 font-black text-2xl cursor-pointer hover:text-gray-300">Catalina Andonie</div>
      </Link>
      <div className="flex pr-6 p-3 items-center font-black text-lg hover:underline hover:cursor-pointer text-center">
        <div>English</div>
      </div>
    </div>
  );
};

export default NavBar;
