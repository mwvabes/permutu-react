import { AppProps } from "next/dist/shared/lib/router/router";
import Navbar from "./Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import store from "../redux/store";
import { Provider, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import MyLoader from "./MyLoader";
import {
  IoIosPlay,
  IoIosContacts,
  IoIosLock,
  IoIosEyeOff,
  IoMdAlert,
} from "react-icons/io";
import { CgCrown } from "react-icons/cg";
import { IconContext } from "react-icons";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";

const RoomShortcut = ({ room, t }: { room: any; t: any }) => {
  const router = useRouter();
  const { name } = room;

  const { user } = useSelector((state: any) => state.user);

  const renderStatus = () => {
    if (room.status === "waiting") {
      return <span className="text-cwaiting underline">{t.waiting}</span>;
    }
    if (room.status === "ingame") {
      return <span className="text-cingame underline">{t.ingame}</span>;
    }
    if (room.status === "ended") {
      return <span className="text-cended underline">{t.ended}</span>;
    }
  };

  return (
    <div
      className={`p-2 flex flex-col md:flex-row px-6 items-center justify-end md:justify-between border-b border-cbrownl hover:bg-cbrown transition duration-380 ease-in-out 
    `}
    >
      <a href={`${window.location.origin}/game/${name}`}>
        <h2 className="weight-bold p-0.5 px-2 border border-cborder font-bold text-xl rounded-lg hover:bg-cbrownl hover:text-corange cursor-pointer transition duration-280 ease-in-out monospace flex items-center">
          {name}
        </h2>
      </a>
      <div
        className={`text-2xl px-1 ${
          room.createdBy === user.uuid ? "text-corange" : "text-cbrownl"
        }`}
      >
        <CgCrown />
      </div>
      <p className="p-1 text-cgray">
        <span className="monospace">
          {room.players.filter((p: any) => p.uuid).length}/
          <span className="text-lg">{room.variant}</span>
        </span>{" "}
        {t.variantPlayers}
      </p>
      <p className="p-1 text-clabel">
        {t.status}: {renderStatus()}
      </p>

      <div className="p-1 flex">
        <div
          className={`text-2xl px-1 ${
            room.protectedJoin.isProtectedJoin ? "text-cgray" : "text-cbrownl"
          }`}
        >
          <IoIosLock />
        </div>

        <div
          className={`text-2xl px-1 ${room.hidden ? "text-cgray" : "hidden"}`}
        >
          <IoIosEyeOff />
        </div>
      </div>
      <a href={`${window.location.origin}/game/${name}`}>
        <button className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold p-0.5 my-2 rounded focus:outline-none focus:shadow-outline">
          <span className="bg-cbrown rounded-sm w-full h-full p-1 px-20 hover:bg-transparent transition duration-280 ease-in-out">
            {t.join}
          </span>
        </button>
      </a>
    </div>
  );
};

export default RoomShortcut;
