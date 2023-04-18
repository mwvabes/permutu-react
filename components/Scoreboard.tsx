import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user, { getLoggedInThunk, refresh } from "../redux/user";
import Link from "next/link";
import MyLoader from "./MyLoader";
import PlayerClaims from "./PlayerClaims";

import { GiTrophyCup } from "react-icons/gi";
import HR from "./HR";

const PlayerScore = ({ player, t }: { player: any; t: any }) => {
  return (
    <div
      className={`flex flex-row border-2 border-cborder rounded-lg items-center w-full mb-2 ${
        player.place === 1
          ? "bg-gradient-to-r from-yellow-500 to-yellow-700 p-1 border-corange"
          : ""
      }`}
    >
      <div className="flex bg-cbrown flex-col md:flex-row rounded-lg w-full items-center relative overflow-hidden">
        <div
          className={`${
            player.place === 1 ? "absolute" : "hidden"
          } text-8xl text-cbrownl2 z-0`}
          style={{ left: "-35px" }}
        >
          <GiTrophyCup />
        </div>
        <div className="w-full md:w-2/6 flex flex-col flex-wrap align-center items-center p-2 text-center z-10">
          <h3 className="text-3xl">
            {player.place === 1
              ? `${t.winner} 🎉`
              : `${t.place} ${player.place}`}
          </h3>
          <p className="text-clabel italic">{t.totalPoints}:</p>
          <p className={`font-bold text-6xl`}>{player.points}</p>
          <p className="monospace text-2xl">{player.username}</p>
        </div>
        <div className={`w-4/`}>
          <PlayerClaims player={player} t={t} short={true} />
        </div>
      </div>
    </div>
  );
};

export default function Scoreboard({ room, t }: { room: any; t: any }) {
  if (room === undefined) return <></>;
  if (room.status != "ended") return <></>;

  return (
    <div className="border border-cbrownl2 flex flex-col items-center md:w-4/5 lg:w-1/2 mt-10 rounded-lg bg-cbrownl2 p-4 overflow-hidden">
      <div className="flex items-center flex-shrink-0 text-white space-x-1.5 mb-6 mt-4">
        <div className="permutuBlock permutu permutuBlockHeader permutuBrown text-2xl">
          V
        </div>
        <div className="permutuBlock permutu permutuBlockHeader permutuBrown text-2xl">
          R
        </div>
        <div className="permutuBlock permutu permutuBlockHeader permutuBrown text-2xl">
          Q
        </div>
        <span className="font-semibold text-xl tracking-tight ml-2">
          Permutu Online
        </span>
        <span className="font-bold text-xl tracking-tight ml-2 monospace">
          [{room.name}]
        </span>
      </div>
      <HR />
      <h2 className="text-3xl m-2 mt-4">{t.gameHasEnded}</h2>
      <h3 className="p-2 italic">{t.summary}</h3>
      <h3 className="p-2 text-clabel text-sm italic">{t.drawInfo}</h3>
      {room.players
        .sort((p1: any, p2: any) => {
          return p1.place - p2.place < 0 ? -1 : p1.place - p2.place > 0 ? 1 : 0;
        })
        .map((p: any) => {
          return <PlayerScore player={p} key={p.uuid} t={t} />;
        })}
      <p className="text-clabel">{t.gameWillReloadAutomatically}</p>
    </div>
  );
}
