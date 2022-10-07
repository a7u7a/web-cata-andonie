const NavBar = () => {
  return (
    <div
      className="fixed inset-x-0 top-0 flex flex-row justify-between
    w-screen bg-black text-white z-50"
    >
      <div className="pl-6 p-3 font-black text-2xl">Catalina Andonie</div>
      <div className="flex pr-6 p-3 items-center font-black text-lg hover:underline hover:cursor-pointer text-center">
        <div>English</div>
      </div>
    </div>
  );
};
export default NavBar;
