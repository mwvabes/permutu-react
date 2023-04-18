import { AppProps } from "next/dist/shared/lib/router/router";
import Navbar from "./Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import store from "../redux/store";
import { Provider } from "react-redux";

const WaitingForStart = (props: any) => {
  const { t, name }: any = props;

  // const [user, setUser] = useState(null)

  // const getUser = () => {
  //   setUser(data.getLoggedIn())
  // }

  // useEffect(() => {
  //   getUser()
  // }, [])

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
        <span className="font-bold text-xl tracking-tight ml-2 monospace">
          [{name}]
        </span>
      </div>
      <p className="mt-6 text-clabel text-center">{t.waitingForStart}.</p>
      <p className="mt-2 text-clabel text-2xl text-center">
        {t.everyPlacesShouldBeTaken}.
      </p>
    </div>
  );
};

export default WaitingForStart;
