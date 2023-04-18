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
import aRuleImg from "../public/img/psAo.jpg";
import bRuleImg from "../public/img/psBo.jpg";

const socket = io(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}`, {
  // withCredentials: "true",
  extraHeaders: {
    "Access-Control-Allow-Origin": "*",
  },
});

interface Room {
  name: string;
}

const Tutorial: NextLayoutComponentType = ({ t }: { t: any }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-screen-lg rounded-b-lg my-2 px-3 bg-cbrown justify-between pb-10">
        <div className="flex">
          <div className="w-3/5">
            <h1 className="text-left text-xl md:text-2xl font-bold flex items-center ">
              {t.tut1}
            </h1>
            <p className="mb-3">{t.tut2}</p>
            <p className="mb-3">
              {t.tut3} <strong>{t.tut4}</strong>. {t.tut5}
            </p>
            <p className="text-amber-300 mb-3">
              {t.tut6}{" "}
              <a
                href="http://www.permutu.pl"
                className="underline hover:opacity-90"
              >
                {t.tut7}
              </a>
            </p>
            <p>{t.tut8}</p>
          </div>

          <div className="w-2/5 flex items-center justify-center">
            <div className="flex items-center flex-shrink-0 text-white mr-6 cursor-pointer hover:opacity-90 space-x-1.5 bg-cbrownl p-3 rounded-md">
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
          </div>
        </div>
        <div className="my-2">
          <HR />
        </div>
        <div className="w-full flex rounded-b-lg my-2 space-y-2 space-x-6">
          <div className="w-1/2">
            <h1 className="text-left text-xl md:text-2xl font-bold flex items-center">
              {t.tut9}
            </h1>
            <p>{t.tut10}</p>
            <p>{t.tut11}</p>
          </div>
          <div className="w-1/2">
            <h1 className="text-left text-xl md:text-2xl font-bold flex items-center">
              {t.howToPlay}
            </h1>
            <p>{t.tut12}</p>
            <p>
              {t.tut13}
              <strong>{t.tut14}</strong>.
            </p>
            <p>{t.tut15}</p>
          </div>
        </div>

        <div className="my-2">
          <HR />
        </div>
        <div className="w-full max-w-screen-lg rounded-b-lg my-2">
          <div className="flex flex-row space-x-3 justify-between items-center">
            <div className="w-3/5">
              <h1 className="text-left text-xl md:text-2xl font-bold flex items-center">
                {t.tut16}
              </h1>
              {t.tut17}
              <ul className="list-disc">
                <li className="ml-6 underline">
                  {t.tut18}
                  <strong>{t.tut19}</strong> {t.tut20}
                </li>
                {t.tut21}
                <li className="ml-6 underline">{t.tut22}</li>
              </ul>
            </div>
            <div className="w-2/5">
              <div className="border border-cborder">
                <Image
                  src={aRuleImg}
                  layout="responsive"
                  // height={250}
                  // width={250}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <HR />
        </div>
        <div className="w-full max-w-screen-lg rounded-b-lg my-2">
          <div className="flex flex-row space-x-3 items-center">
            <div className="w-3/5">
              <h1 className="text-left text-xl md:text-2xl font-bold flex items-center">
                {t.tut23}
              </h1>
              {t.tut24}
              <ul className="list-disc">
                <li className="ml-6 underline">{t.tut25}</li>
                {t.tut26}
                <li className="ml-6 underline">
                  <strong>{t.tut27}</strong> {t.tut28}
                </li>
              </ul>
            </div>
            <div className="w-2/5">
              <div className="border border-cborder">
                <Image
                  src={bRuleImg}
                  layout="responsive"
                  // height={250}
                  // width={400}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="my-2">
          <HR />
        </div>
        <div className="w-full max-w-screen-lg rounded-b-lg my-2">
          <h1 className="text-left text-xl md:text-2xl font-bold flex items-center">
            {t.tut29}
          </h1>

          <ul className="list-disc">
            <li className="ml-6 underline">
              {t.tut30} <strong>{t.tut31}</strong>
            </li>
            {t.tut33}
            <li className="ml-6 underline">
              {t.tut34} <strong>{t.tut35}</strong> {t.tut36}
            </li>
            {t.tut37}
          </ul>

          <p>{t.drawInfo}</p>
        </div>
      </div>
    </div>
  );
};

export default Tutorial;
