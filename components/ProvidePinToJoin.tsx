import { AppProps } from "next/dist/shared/lib/router/router";
import Navbar from "./Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import Link from "next/link";
import { useForm } from "react-hook-form";

interface MyFormData {
  pin: number;
}

const ProvidePinToJoin = (props: any) => {
  const router = useRouter();
  const { t, handleJoinPin, pinUnauthorized }: any = props;
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<MyFormData>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    handleJoinPin(data.pin);
  });

  return (
    <div className="flex flex-col align-center items-center m-0 my-8 md:m-8 bg-cbrownl2 bg-gradient-to-t from-cbrown to-cbrownl2 rounded-md shadow-xl p-8 w-full">
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
      <p className="mt-6 text-center">{t.roomJoinIsProtected}.</p>
      <p className="mt-6 text-clabel text-center">{t.provideAPinToJoin}.</p>
      <form
        action=""
        className="text-left mt-2 flex-col items-center justify-center text-center"
        onSubmit={onSubmit}
      >
        <div className="flex">
          <input
            autoFocus
            className="bg-cbrown border border-cborder rounded w-full py-2 px-3 text-gray placeholder-cplaceholder leading-tight focus:outline-none focus:shadow-outline focus:border-cfocusborder"
            style={{ borderColor: errors.pin ? "#f88" : "" }}
            {...register("pin", {
              required: true,
              minLength: 4,
              maxLength: 6,
            })}
            size={6}
            type="tel"
            placeholder={t.pinCode}
            autoComplete="off"
          />
          <button className="ml-2 transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold p-0.5 rounded">
            <span className="bg-cbrown rounded-sm w-full h-full p-1 px-2 hover:bg-transparent transition duration-280 ease-in-out">
              {t.join}
            </span>
          </button>
        </div>
        {errors.pin && (
          <label
            htmlFor="pin"
            className="text-sm italic text-calertlabel text-center"
          >
            {t.wrongPinFormat}
          </label>
        )}

        {pinUnauthorized && (
          <label
            htmlFor="pin"
            className="text-sm italic text-corange text-center"
          >
            {t.unauthorizedPin}
          </label>
        )}
      </form>
    </div>
  );
};

export default ProvidePinToJoin;
