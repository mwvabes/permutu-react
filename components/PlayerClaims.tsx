import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedInThunk, refresh } from "../redux/user";
import Link from "next/link";
import MyLoader from "./MyLoader";

export default function PlayerClaims({
  player,
  t,
  short,
}: {
  player: any;
  t: any;
  short: boolean;
}) {
  const { user } = useSelector((state: any) => state.user);

  const claimsAnything = player.claims.find(
    (c: any) => c.claims[0] || c.claims[1] || c.claims[2]
  );

  const claims = player.claims.sort((a: any, b: any) => {
    return a.symbol < b.symbol ? -1 : a.symbol > b.symbol ? 1 : 0;
  });

  return (
    <div
      className={`flex flex-col items-center ${
        !short ? "m-2 border-2 rounded-md bg-cbrownl" : ""
      }  ${
        player.uuid === user.uuid
          ? "border-amber-500 text-amber-500"
          : "border-cborder"
      }`}
    >
      <p
        className={`font-bold border-b border-cborder p-1 px-6 w-full text-center ${
          short ? "hidden" : ""
        }`}
      >{`${
        player.uuid === user.uuid
          ? t.yourClaims
          : `${t.opponent}${" "}${player.username}`
      }`}</p>
      {!claimsAnything && <p className="p-1">{t.claimsNothing}</p>}
      {claimsAnything && (
        <div className="flex flex-row flex-wrap text-center space-x-1 justify-center my-2 mx-3">
          <div className="flex space-x-1">
            {claims
              .filter(
                (c: any) =>
                  c.claims[0] === true &&
                  c.claims[1] === true &&
                  c.claims[2] === true
              )
              .map((c: any) => {
                return (
                  <div
                    key={c.symbol}
                    className="flex flex-col bg-cbrownl2 rounded-md space-y-0.5"
                  >
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuRed text-2xl ${
                        c.claims[0] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuBlack text-2xl ${
                        c.claims[1] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuGreen text-2xl ${
                        c.claims[2] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex space-x-1">
            {claims
              .filter(
                (c: any) =>
                  (c.claims[0] === true &&
                    c.claims[1] === true &&
                    c.claims[2] === false) ||
                  (c.claims[0] === true &&
                    c.claims[2] === true &&
                    c.claims[1] === false) ||
                  (c.claims[1] === true &&
                    c.claims[2] === true &&
                    c.claims[0] === false)
              )
              .map((c: any) => {
                return (
                  <div
                    key={c.symbol}
                    className="flex flex-col bg-cbrownl2 rounded-md space-y-0.5"
                  >
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuRed text-2xl ${
                        c.claims[0] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuBlack text-2xl ${
                        c.claims[1] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuGreen text-2xl ${
                        c.claims[2] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="flex space-x-1">
            {claims
              .filter(
                (c: any) =>
                  (c.claims[0] === false &&
                    c.claims[1] === false &&
                    c.claims[2] === true) ||
                  (c.claims[0] === false &&
                    c.claims[2] === false &&
                    c.claims[1] === true) ||
                  (c.claims[1] === false &&
                    c.claims[2] === false &&
                    c.claims[0] === true)
              )
              .map((c: any) => {
                return (
                  <div
                    key={c.symbol}
                    className="flex flex-col bg-cbrownl2 rounded-md space-y-0.5"
                  >
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuRed text-2xl ${
                        c.claims[0] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuBlack text-2xl ${
                        c.claims[1] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                    <div
                      className={`p-1 text-center permutuBlock permutu permutuGreen text-2xl ${
                        c.claims[2] ? "" : "opacity-0"
                      }`}
                    >
                      {c.symbol}
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}
