import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import ReactCountryFlag from "react-country-flag";
import HR from "../../components/HR";
import GameShortcut from "../../components/GameShortcut";

const flagStyle = {
  width: ".9em",
};

interface Shortcut {
  hidden: boolean;
  name: string;
  players: [];
  protectedJoin: { isProtectedJoin: boolean };
  status: string;
  variant: string;
}

interface Room {
  hidden: boolean;
  name: string;
  players: Player[];
  protectedJoin: { isProtectedJoin: boolean };
  status: string;
  variant: string;
  board: [];
  turn: number;
}

interface Player {
  username: string;
  country: string;
  uuid: string;
  claims: [];
  isModerator: boolean;
}

interface Game {
  won: number;
  lost: number;
  games: [];
}

const socket = io(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}`, {
  withCredentials: true,
  //query: `name=${name}`,
});

const Player = ({ t }: { t: any }) => {
  const router = useRouter();
  const { username } = router.query;
  const { user } = useSelector((state: any) => state.user);
  const [player, setPlayer] = useState<Player>();
  const [games, setGames] = useState<Game>();
  const [pageTitle, setPageTitle] = useState(undefined);

  const getPlayer = () => {
    axios
      .get(`${process.env.COMMUNITY_API_PUBLIC_ADDRESS}/users`, {
        params: { username: router.query.username },
      })
      .then((r) => {
        setPlayer(r.data);
      })
      .catch((e) => {
        router.push("/");
      });
  };

  const getGames = () => {
    axios
      .get(`${process.env.COMMUNITY_API_PUBLIC_ADDRESS}/games`, {
        params: { username: router.query.username },
      })
      .then((r) => {
        setGames(r.data);
      })
      .catch((e) => {});
  };

  useEffect(() => {
    if (router.query) {
      getPlayer();
      getGames();
    }
  }, [router]);

  if (!player) return <></>;

  return (
    <>
      <Head>
        <title>{pageTitle || "Permutu"}</title>
        <meta key="robots" name="robots" content="noindex,follow" />
        <meta key="googlebot" name="googlebot" content="noindex,follow" />
      </Head>
      <div className="flex flex-col items-center">
        <div className="md:w-3/5 mt-6 items-center justify-center text-center bg-cbrown md:rounded-xl border border-cbrownl2">
          <div className="flex flex-col items-center mt-2">
            <h1 className="text-2xl font-bold underline text-clabel">
              {t.playerProfile}
            </h1>
            <h2 className="text-3xl">
              {player && player.country != "*" ? (
                <ReactCountryFlag
                  svg
                  style={flagStyle}
                  countryCode={player.country}
                />
              ) : (
                ""
              )}
              <span className="ml-3">{player.username}</span>
            </h2>
          </div>
          <div className="flex flex-row mx-10 flex-wrap">
            <div className="flex md:flex-col items-center m-2 p-3 bg-cbrown border border-cborder rounded-md flex-1 h-full justify-between">
              <h3 className="italic text-clabel">{t.won}</h3>
              <p className="ml-2 md:ml-0 md:text-6xl underline text-lime-500">
                {games ? games.won : ""}
              </p>
            </div>
            <div className="flex md:flex-col items-center m-2 p-3 bg-cbrown border border-cborder rounded-md flex-1 h-full justify-between">
              <h3 className="italic text-clabel">{t.lost}</h3>
              <p className="ml-2 md:ml-0 md:text-6xl underline text-red-500">
                {games ? games.lost : ""}
              </p>
            </div>
            <div className="flex md:flex-col items-center m-2 p-3 bg-cbrown border border-cborder rounded-md flex-1 h-full justify-between">
              <h3 className="italic text-clabel">{t.wonLostRatio}</h3>
              <p className="ml-2 md:ml-0 md:text-6xl underline text-amber-600">
                {games
                  ? isNaN(parseFloat((games.won / games.lost).toFixed(3)))
                    ? "-"
                    : parseFloat((games.won / games.lost).toFixed(3))
                  : "-"}
              </p>
            </div>
          </div>
          <div className="my-2">
            <HR />
          </div>
          <div>
            <h1 className="text-2xl font-bold underline text-clabel mb-0.5">
              {t.gamesHistory}
            </h1>
          </div>
          <div className="flex flex-col mx-2 mb-2 border-t border-cbrownl">
            {games?.games.map((g: any, i) => {
              return (
                <GameShortcut game={g} key={i} t={t} username={username} />
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Player;
