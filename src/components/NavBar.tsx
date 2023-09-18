import Image from "next/image";
import Logo from "../../public/logo.png"
const NavBar = () => {
  return (
    <nav className="bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center">
          <Image
            src={Logo}
            className="mr-3"
            alt="Spend Smart Logo"
            width={32}
            height={32}
          />
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
            Spend Smart
          </span>
        </div>
        <div className="w-full md:block md:w-auto">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 bg-gray-800 md:bg-gray-900 border-gray-700">
            <li>
              <p
                className="block py-2 pl-3 pr-4 bg-blue-700 rounded md:bg-transparent md:p-0 text-white"
              >
                Home
              </p>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
