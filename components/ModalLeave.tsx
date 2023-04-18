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
import { IoIosLogOut, IoMdClose } from "react-icons/io";
import ReactTooltip from "react-tooltip";

export default function ModalLeave(props: any) {
  const router = useRouter();
  const { t, show, handleShow, handleLeaveASeat } = props;
  const { user } = useSelector((state: any) => state.user);

  if (!show) return <></>;

  return (
    <>
      <div className="absolute w-full h-full bg-cbrown z-40 p-10 flex justify-center items-center opacity-95"></div>
      <div className="absolute w-full h-full z-50 p-10 flex justify-center items-center">
        <div className="bg-cbrownl p-10 opacity-100 border-2 border-cborder rounded-md">
          <div className="flex w-full justify-between">
            <h1 className="text-xl md:text-2xl font-bold mb-4">
              {t.youWantToLeaveGame}
            </h1>

            <div
              className="text-2xl text-cgray cursor-pointer hover:opacity-90"
              //style={{ top: "-15px", left: "13px" }}
              onClick={() => handleShow()}
            >
              <IoMdClose />
            </div>
          </div>

          <p className="mb-10">{t.youWantToLeaveGameDesc}</p>
          <div className="flex w-full justify-end">
            <button
              className="transition flex flex-row items-center justify-center bg-cbrown hover:opacity-80 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline mr-6 border-cborder border-2"
              onClick={() => handleShow()}
            >
              {t.dontLeave}
            </button>

            <button
              className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 hover:opacity-80 text-white font-bold py-2 px-2 rounded focus:outline-none focus:shadow-outline"
              onClick={() => handleLeaveASeat()}
            >
              {t.acceptLeave}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
