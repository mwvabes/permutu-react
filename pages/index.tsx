import axios from "axios";
import type { NextLayoutComponentType, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import CreateRoomForm from "../components/CreateRoomForm";
import HR from "../components/HR";
import NoRoomsFound from "../components/NoRoomsFound";
import RoomShortcut from "../components/RoomShortcut";
import { CgCrown } from "react-icons/cg";
import { BsGlobe2 } from "react-icons/bs";
import MyLoader from "../components/MyLoader";
import { IoIosRefresh } from "react-icons/io";

const socket = io(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}`, {
  // withCredentials: "true",
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});

interface Room {
  name: string;
}

const Home: NextLayoutComponentType = ({ t }: { t: any }) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [roomsCreatedByUser, setRoomsCreatedByUser] = useState<Room[]>([]);

  useEffect(() => {
    refreshRooms();
  }, []);

  const refreshRooms = () => {
    axios
      .get(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}/rooms/createdByUser`)
      .then((r) => {
        setRoomsCreatedByUser(r.data);
      });
    axios
      .get(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}/rooms/discover`)
      .then((r) => {
        setRooms(r.data);
      });
  };

  const renderRoomsCreatedByUser = () => {
    if (roomsCreatedByUser.length === 0)
      return <p className="p-2 text-center">{t.youHaventCreatedAnyRoom}</p>;
    return roomsCreatedByUser.map((r) => {
      return (
        <div key={r.name}>
          <RoomShortcut key={r.name} room={r} t={t} />
        </div>
      );
    });
  };

  const renderRooms = () => {
    if (rooms.length === 0) return <NoRoomsFound t={t} />;
    return rooms.map((r) => {
      return (
        <div key={r.name}>
          <RoomShortcut key={r.name} room={r} t={t} />
        </div>
      );
    });
  };

  useEffect(() => {
    socket.on("room-created", () => {
      refreshRooms();
    });
  }, []);

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-lg bg-cbrownd rounded-b-lg">
        <CreateRoomForm t={t} refreshUserRooms={refreshRooms} />
        <div className="">
          <HR />
        </div>
        <div className="flex py-1 px-6 items-center bg-gradient-to-b from-cbrownl to-cbrown justify-between">
          <h1 className="text-left text-xl md:text-2xl font-bold flex items-center">
            {t.yourRooms}
            <span className={`text-3xl px-2`}>
              <CgCrown />
            </span>
            <span className="text-lg text-clabel">
              ({roomsCreatedByUser.length}/5)
            </span>
          </h1>
          <span className="text-clabel italic">{t.roomLimitInfo}</span>
        </div>

        {renderRoomsCreatedByUser()}
        <div className="">
          <HR />
        </div>
        <div className="flex justify-between bg-gradient-to-b from-cbrownl to-cbrown">
          <h1 className="text-left text-xl md:text-2xl font-bold py-1 px-6 flex items-center ">
            {t.discoverRooms}
            <span className={`text-2xl px-2`}>
              <BsGlobe2 />
            </span>
          </h1>
          <button
            className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 hover:opacity-80 text-white font-bold py-2 px-2 my-2 rounded focus:outline-none focus:shadow-outline mr-6"
            onClick={() => {
              refreshRooms();
            }}
          >
            <div className={`text-2xl mr-2`}>
              <IoIosRefresh />
            </div>
            {t.refreshRooms}
          </button>
        </div>
        {renderRooms()}
        <div></div>
      </div>
    </div>
  );
};

export default Home;
