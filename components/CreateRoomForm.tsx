import { AppProps } from "next/dist/shared/lib/router/router";
import Navbar from "./Navbar";
import Head from "next/head";
import React, { useEffect, useState } from "react";
import store from "../redux/store";
import { Provider } from "react-redux";
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

interface MyFormData {
  variant: number;
  hidden: true;
  protectedJoin: boolean;
  protectedJoinPin: number;
}

const CreateRoomForm = (props: any) => {
  const { t, refreshUserRooms }: any = props;

  const [loading, setLoading] = useState(false);

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MyFormData>({ mode: "onChange" });

  const onSubmit = handleSubmit((data) => {
    setLoading(true);
    axios
      .post(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}/rooms/create`, data)
      .then((response) => {
        setLoading(false);
      })
      .catch((e: AxiosError) => {
        setLoading(false);
      });
  });

  return (
    <div className="mx-6 mt-6 mb-2">
      <div className="flex flex-col flex-1">
        <h1 className="underline text-left text-xl md:text-3xl font-bold mb-6">
          {t.createRoom}
        </h1>

        <form
          action=""
          onSubmit={onSubmit}
          className="flex flex-col flex-wrap items-center w-full"
        >
          <div className="flex flex-col md:flex-row flex-wrap w-full ">
            <div className="flex relative flex-col mr-0 md:mr-4 justify-center flex-1 border border-cborder p-2 py-3 rounded-lg bg-cbrown mb-2">
              <div
                className="text-2xl ml-1 absolute text-cicon"
                style={{ top: "-15px", left: "15px" }}
              >
                <IoIosContacts />
              </div>
              <label htmlFor="variant" className="text-clabel italic">
                <span className="flex items-center">{t.variantLabel}</span>
              </label>
              {errors.variant && (
                <span className="italic text-calertlabel">
                  {t.wrongVariantFormat}
                </span>
              )}

              <input
                {...register("variant")}
                type="range"
                id="myRange"
                step="1"
                min="2"
                max="6"
                defaultValue="2"
              />
              <div className="flex flex-row justify-between mx-1">
                <span
                  onClick={() => setValue("variant", 2)}
                  className="px-1 cursor-pointer"
                >
                  2
                </span>
                <span
                  onClick={() => setValue("variant", 3)}
                  className="px-1 cursor-pointer"
                >
                  3
                </span>
                <span
                  onClick={() => setValue("variant", 4)}
                  className="px-1 cursor-pointer"
                >
                  4
                </span>
                <span
                  onClick={() => setValue("variant", 5)}
                  className="px-1 cursor-pointer"
                >
                  5
                </span>
                <span
                  onClick={() => setValue("variant", 6)}
                  className="px-1 cursor-pointer"
                >
                  6
                </span>
              </div>
            </div>

            <div
              className={`flex relative flex-col mr-0 md:mr-4 flex-1 justify-center border border-cborder p-2 py-3 rounded-lg bg-cbrown mb-2 ${
                watch("protectedJoin") ? "text-cgray" : "text-clabel"
              }`}
            >
              <div
                className="text-2xl absolute  text-cicon"
                style={{ top: "-15px", left: "13px" }}
              >
                <IoIosLock />
              </div>
              <label
                htmlFor="protectedJoin"
                className="flex flex-col items-start cursor-pointer"
              >
                <div className="flex flex-row">
                  <div className="relative">
                    <input
                      type="checkbox"
                      {...register("protectedJoin")}
                      id="protectedJoin"
                      className="sr-only"
                    />
                    <div
                      className={`block bg-cswitchbg w-10 h-6 rounded-full border ${
                        watch("protectedJoin")
                          ? "border-cgray"
                          : "border-clabel"
                      }`}
                    ></div>
                    <div className="dot absolute left-1 top-1 bg-clabel w-4 h-4 rounded-full transition"></div>
                  </div>
                  <div className="ml-3 italic flex">{t.protectedJoinLabel}</div>
                </div>
              </label>
              <label
                htmlFor="protectedJoinPin"
                className="italic flex flex-row mt-2 align-center"
              >
                <span>{t.pinCode}:</span>
                <input
                  type="text"
                  {...register("protectedJoinPin", {
                    //disabled: !watch("protectedJoin"),
                    required: watch("protectedJoin"),
                    minLength: 4,
                    maxLength: 6,
                    pattern: /^\d+$/,
                  })}
                  className={`bg-cbrown border border-cborder rounded:sm w-20 ml-2 px-2 text-gray placeholder-cplaceholder leading-tight focus:outline-none focus:shadow-outline  ${
                    errors.protectedJoinPin && "border-calertborder"
                  }`}
                />
              </label>
              {errors.protectedJoinPin && (
                <span className="italic text-calertlabel text-xs mt-2">
                  {t.wrongPinFormat}
                </span>
              )}
            </div>

            <div className="flex flex-col flex-1">
              <div
                className={`flex relative flex-col flex-1 justify-center border border-cborder p-2 rounded-lg bg-cbrown mb-2 ${
                  watch("hidden") ? "text-cgray" : "text-clabel"
                }`}
              >
                <div
                  className="text-2xl absolute text-cicon"
                  style={{ top: "-15px", left: "13px" }}
                >
                  <IoIosEyeOff />
                </div>
                <label
                  htmlFor="hidden"
                  className="flex flex-col items-start cursor-pointer"
                >
                  <div className="flex flex-row items-center">
                    <div className="relative">
                      <input
                        type="checkbox"
                        {...register("hidden")}
                        id="hidden"
                        className="sr-only"
                      />
                      <div className="block bg-cswitchbg w-10 h-6 rounded-full border border-clabel"></div>
                      <div
                        className={`dot absolute left-1 top-1 bg-clabel w-4 h-4 rounded-full transition ${
                          watch("hidden") ? "border-cgray" : "border-clabel"
                        }`}
                      ></div>
                    </div>
                    <div className="ml-3 italic flex">{t.hideOnListLabel}</div>
                  </div>
                </label>
              </div>

              <button
                className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 hover:opacity-80 text-white font-bold py-2 px-2 my-2 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                <MyLoader loading={loading} />
                <div className={`text-2xl mr-2 ${loading ? "hidden" : ""} `}>
                  <IoIosPlay />
                </div>
                {t.createRoom}
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="flex flex-col flex-1"></div>
    </div>
  );
};

export default CreateRoomForm;
