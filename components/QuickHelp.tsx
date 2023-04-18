import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user, { getLoggedInThunk, refresh } from "../redux/user";
import Link from "next/link";
import MyLoader from "./MyLoader";
import { RiCloseFill } from "react-icons/ri";
import { IoMdHelp } from "react-icons/io";
import { useForm } from "react-hook-form";
import Player from "../pages/player/[username]";

interface MyFormData {
  message: string;
}

interface Message {
  message: string;
  uuid: string;
}

const QuickHelp = ({
  t,
  showFull,
  handleShow,
}: {
  t: any;
  showFull: boolean;
  handleShow: Function;
}) => {
  return (
    <>
      <div
        className={`fixed shadow-lg text-orange-400 border-2 rounded-full bg-cbrownl cursor-pointer hover:bg-cbrownl2 transition-background duration-300 shadow-2xl right-20 bottom-4 ${
          showFull ? "border-corange" : "border-cborder"
        }`}
        onClick={() => {
          handleShow();
        }}
      >
        <p className="text-2xl p-3">
          <IoMdHelp />
        </p>
      </div>
      {showFull ? (
        <div className="z-50 fixed border-2 rounded-lg mb-8 md:mb-0 border-cborder bg-cbrownl shadow-2xl w-full md:w-1/6 right-0 md:right-2 bottom-0 md:bottom-20">
          <div className="flex bg-cbrownl2 px-3 py-1 justify-between rounded-t-md">
            <p className="mr-6 text-clabel">{t.howToPlay}</p>
            <div
              className="text-2xl text-orange-400 cursor-pointer transition duration-400 hover:bg-cbrown hover:text-amber-600"
              onClick={() => {
                handleShow();
              }}
            >
              <RiCloseFill />
            </div>
          </div>
          <div className="px-3 py-1 border-b border-cborder">
            <h1 className="font-bold text-lg">{t.ruleA}</h1>
            <p>{t.ruleAShort}.</p>
            <p className="text-amber-200">{t.ruleAShortHowTo}.</p>
          </div>
          <div className="px-3 py-1  border-b border-cborder">
            <h1 className="font-bold text-lg">{t.ruleB}</h1>
            <p>{t.ruleBShort}.</p>
            <p className="text-amber-200">{t.ruleBShortHowTo}.</p>
          </div>
          <div className="px-3 py-1">
            <p>
              {t.notClear}
              <Link href="/tutorial">
                <a className="block md:inline-block underline leading-none text-white border-white hover:text-corange ml-2">
                  {t.checkOutFullTutorial}
                </a>
              </Link>
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default QuickHelp;
