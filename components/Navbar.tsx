import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInThunk, refresh } from "../redux/user";
import Link from "next/link";
import { useRouter } from "next/router";
import ReactCountryFlag from "react-country-flag";

const flagStyle = {
  width: "1.5em",
  boxShadow: "0px 0px 3px #e0e0e0",
};

import { AiOutlineCaretDown } from "react-icons/ai";
import { IoIosLogOut } from "react-icons/io";
import ReactTooltip from "react-tooltip";

export default function Navbar(props: any) {
  const router = useRouter();
  const { t, changeLanguage } = props;
  const { user } = useSelector((state: any) => state.user);

  const [show, setShow] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between flex-wrap bg-corange px-2 md:px-5 py-2 shadow-lg">
        <ReactTooltip place="right" type="dark" effect="float" />
        <Link href="/">
          <a>
            <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer hover:opacity-90 space-x-1.5">
              <div className="permutuBlock permutu permutuBlockHeader permutuRed text-2xl">
                D
              </div>
              <div className="permutuBlock permutu permutuBlockHeader permutuBlack text-2xl">
                M
              </div>
              <div className="permutuBlock permutu permutuBlockHeader permutuGreen text-2xl">
                U
              </div>
              <span className="font-semibold text-xl tracking-tight ml-2">
                Permutu Online
              </span>
            </div>
          </a>
        </Link>
        <div className="block md:hidden">
          <button
            onClick={() => setShow(!show)}
            className="flex items-center px-3 py-2 border rounded text-gray-100 border-gray-200 hover:text-white hover:border-white"
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>
        <div
          className={
            show
              ? "w-full block flex-grow md:flex md:justify-end md:w-auto items-center md:flex-col static md:absolute right-0 top-14 bg-amber-600 z-40"
              : "hidden"
          }
        >
          <div className="flex md:flex-col static md:relative z-40">
            <Link href="/">
              <a className="block md:inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-corange hover:bg-white mt-4 md:mt-0">
                {t.homepage}
              </a>
            </Link>
            <Link href="/tutorial">
              <a className="block md:inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-corange hover:bg-white mt-4 md:mt-0">
                {t.howToPlay}
              </a>
            </Link>
            {/* <a
              href="#"
              className="block md:inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-corange hover:bg-white mt-4 md:mt-0"
            >
              {t.profileSettings}
            </a> */}
            <p className="block md:inline-block text-sm px-4 leading-none rounded text-white border-white mt-4 md:mt-0 flex items-center">
              <span className="py-2 ">{t.language}:</span>
              <button
                className="transition hover:opacity-80 mx-1 text-xl cursor-pointer"
                onClick={() => changeLanguage("en")}
              >
                <ReactCountryFlag
                  svg
                  //style={{ width: "2.5em" }}
                  countryCode="US"
                />
              </button>
              <button
                className="transition hover:opacity-80 mx-1 text-xl cursor-pointer"
                onClick={() => changeLanguage("pl")}
              >
                <ReactCountryFlag
                  svg
                  //style={{ width: "2.5em" }}
                  countryCode="PL"
                />
              </button>
            </p>
            <a
              href={`${process.env.AUTH_API_PUBLIC_ADDRESS}/auth/logout`}
              className="block md:inline-block text-sm px-4 py-2 leading-none rounded text-white border-white hover:border-transparent hover:text-corange hover:bg-white mt-4 md:mt-0 flex items-center font-bold"
            >
              <span className="flex items-center">
                <div
                  className="text-2xl text-cgray mr-2"
                  //style={{ top: "-15px", left: "13px" }}
                >
                  <IoIosLogOut />
                </div>
                {t.logout}
              </span>
            </a>
          </div>
        </div>
        <div className="hidden md:flex items-center flex-row font-bold underline">
          <Link href="/tutorial">
            <a className="no-underline block md:inline-block px-4 py-2 leading-none rounded text-white border-white hover:border-transparent mt-4 md:mt-0">
              {t.howToPlay}
            </a>
          </Link>
          <Link href={user.username ? `/player/${user.username}` : "/"}>
            <a>
              <div className="flex items-center cursor-pointer hover:opacity-80 transition-opacity duration-200">
                <span>{user ? user.username : ""}</span>
                {user && user.country != "*" ? (
                  <ReactCountryFlag
                    svg
                    style={flagStyle}
                    countryCode={user.country}
                  />
                ) : (
                  ""
                )}
              </div>
            </a>
          </Link>
          <div
            className="p-0.5 bg-amber-600 ml-2 rounded-md cursor-pointer"
            onClick={() => setShow(!show)}
          >
            <div
              className="text-2xl text-cgray"
              //style={{ top: "-15px", left: "13px" }}
            >
              <AiOutlineCaretDown />
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
