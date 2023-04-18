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
import { IconContext } from "react-icons";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/router";
import user from "../redux/user";

const GameShortcut = ({
  t,
  game,
  username,
}: {
  game: any;
  t: any;
  username: any;
}) => {
  const date = new Date(game.ended);

  const router = useRouter();

  const won = game.players.find(
    (p: any) => p.username === username && p.place === 1
  );

  return (
    <div
      className={`flex md:p-2 flex flex-col md:flex-row md:px-6 items-center justify-end md:justify-between border-b border-cbrownl2 transition duration-280 hover:bg-cbrownl space-x-2 ease-in-out items-stretch md:items-center space-y-0.5`}
    >
      <p className="flex space-x-1 justify-center">
        <span>
          {t.players}: {game.players.length},
        </span>
        <span>
          {t.boardSize} {game.boardSize}/26
        </span>
      </p>

      <div className="flex items-center flex-col md:flex-row flex-1 items-stretch mb-2 space-y-1 md:space-y-0 space-x-0 md:space-x-1 flex-wrap">
        {game.players.map((p: any, i: number) => {
          return (
            <p
              className={`flex border flex-wrap bg-white bg-opacity-10 p-1 px-2 rounded-md space-x-1 justify-between w-full md:w-max justify-center ${
                p.username === username
                  ? won
                    ? "border-lime-400"
                    : "border-red-400"
                  : "border-cborder"
              } `}
              key={i}
            >
              <span className="flex space-x-1 items-center">
                <span className="">
                  {t.place} {p.place}:
                </span>
                {p.username != "notfound" ? (
                  <a
                    className={`underline hover:opacity-80 transition-opacity duration-200 hover:no-underline ${
                      p.username === username
                        ? won
                          ? "text-lime-400"
                          : "text-red-400"
                        : ""
                    } `}
                    href={`${window.location.origin}/player/${p.username}`}
                  >
                    {p.username}
                  </a>
                ) : (
                  <p className="text-xs italic text-clabel">
                    {t.playerNotExists}
                  </p>
                )}
                <span>{p.place === 1 ? "🎉" : ""} </span>
              </span>
              <span className="ml-2 monospace self-end">
                {t.points}:{` `}
                {p.points}
                {` `}
              </span>
            </p>
          );
        })}
      </div>
      <p className="text-clabel">
        {date.toLocaleDateString([])}{" "}
        {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
      </p>
    </div>
  );
};

export default GameShortcut;
