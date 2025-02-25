import { Menu, Moon, Search, Settings, Sun, User } from "lucide-react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "../../redux";
import { setIsDarkMode, setIsSidebarCollapsed } from "@/state";
import Image from "next/image";
import { useState, useEffect } from "react";
const Navbar = () => {
  const dispatch = useAppDispatch();

  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const [currPath, setCurrPath] = useState(window.location.pathname);
  useEffect(() => {
    setCurrPath(window.location.pathname);
  }, []);
  if (currPath === "/"|| currPath === "/signup" || currPath === "/forgot-password" || currPath === "/login") {
    return null;
   }
    return (
      <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-black">
        {/* Search Bar */}
        <div className="flex items-center gap-8">
          {!isSidebarCollapsed ? null : (
            <button
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <Menu className="size-8 dark:text-white" />
            </button>
          )}
          <div className="relative flex h-min w-[200px]">
            <Search className="absolute left-[4px] top-1/2 mr-2 h-5 w-5 -translate-y-1/2 transform cursor-pointer dark:text-white" />
            <input
              className="w-full rounded border-none bg-gray-100 p-2 pl-8 placeholder-gray-500 focus:border-transparent focus:outline-none dark:bg-gray-700 dark:text-white dark:placeholder-white"
              type="search"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center">
          <button
            onClick={() => dispatch(setIsDarkMode(!isDarkMode))}
            className={
              isDarkMode
                ? `rounded p-2 dark:hover:bg-gray-700`
                : `rounded p-2 hover:bg-gray-100`
            }
          >
            {isDarkMode ? (
              <Sun className="size-6 cursor-pointer dark:text-white" />
            ) : (
              <Moon className="size-6 cursor-pointer dark:text-white" />
            )}
          </button>
          <Link
            href="/settings"
            className={
              isDarkMode
                ? `h-min w-min rounded p-2 dark:hover:bg-gray-700`
                : `h-min w-min rounded p-2 hover:bg-gray-100`
            }
          >
            <Settings className="h-6 w-6 cursor-pointer dark:text-white" />
          </Link>
          <div className="ml-2 mr-5 hidden min-h-[2em] w-[0.1rem] bg-gray-200 md:inline-block"></div>
          <div className="hidden items-center justify-between md:flex">
            <div className="align-center flex size-9 justify-center">
              <Link href={"/settings"}>
                <Image
                  src={`data:image/jpeg;base64,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`}
                  alt={"User Profile Picture"}
                  width={100}
                  height={50}
                  className="h-full rounded-full object-cover"
                />
              </Link>
            </div>
            <span className="mx-3 text-gray-800 dark:text-white">Username</span>
            <button
              className="hidden rounded bg-blue-400 px-4 py-2 text-xs font-bold text-white hover:bg-blue-500 md:block"
              onClick={() => console.log("Sign out")}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    );
};

export default Navbar;
