import { AppProps } from "next/dist/shared/lib/router/router";
import Navbar from "./Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";

const RoomWasDeleted = (props: any) => {
  const router = useRouter();
  const { t }: any = props;

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  });

  return (
    <div className="flex flex-col align-center items-center m-0 my-8 md:m-8 bg-cbrownl2 bg-gradient-to-t from-cbrown to-cbrownl2 rounded-md shadow-xl p-8">
      <div className="flex items-center flex-shrink-0 text-white space-x-1.5">
        <div className="permutuBlock permutu permutuBlockHeader permutuRed text-2xl">
          D
        </div>
        <div className="permutuBlock permutu permutuBlockHeader permutuBlack text-2xl">
          M
        </div>
        <div className="permutuBlock permutu permutuBlockHeader permutuGreen text-2xl">
          U
        </div>
        <span className="font-semibold text-xl tracking-tight ml-2 ">
          Permutu Online
        </span>
      </div>
      <p className="mt-6 text-center">{t.roomWasDeleted}.</p>
      <p className="mt-6 text-clabel text-center">{t.roomWasDeletedInfo}.</p>
      <p className="mt-2 text-clabel text-center flex flex-col md:flex-row mt-2 md:m-0 items-center">
        {t.youWillBeRedirectedToHomepage}...{" "}
        <Link href="/">
          <button className="ml-2 transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold p-0.5 rounded">
            <span className="bg-cbrown rounded-sm w-full h-full p-1 px-2 hover:bg-transparent transition duration-280 ease-in-out">
              {t.goNow}
            </span>
          </button>
        </Link>
      </p>
    </div>
  );
};

export default RoomWasDeleted;
