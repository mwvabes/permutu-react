import { AppProps } from "next/dist/shared/lib/router/router";
import Navbar from "./Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import store from "../redux/store";
import { Provider } from "react-redux";

const NoRoomsFound = (props: any) => {
  const { t }: any = props;

  // const [user, setUser] = useState(null)

  // const getUser = () => {
  //   setUser(data.getLoggedIn())
  // }

  // useEffect(() => {
  //   getUser()
  // }, [])

  return (
    <div className="flex flex-col align-center items-center m-8 text-center">
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
        <span className="font-semibold text-xl tracking-tight ml-2">
          Permutu Online
        </span>
      </div>
      <p className="mt-2 text-cgray">
        {t.noRoomsFound} {t.createYourOwn}
      </p>
    </div>
  );
};

export default NoRoomsFound;
