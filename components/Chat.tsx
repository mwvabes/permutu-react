import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user, { getLoggedInThunk, refresh } from "../redux/user";
import Link from "next/link";
import MyLoader from "./MyLoader";
import { RiMessageLine, RiCloseFill, RiChatOffLine } from "react-icons/ri";
import { useForm } from "react-hook-form";
import Player from "../pages/player/[username]";

interface MyFormData {
  message: string;
}

interface Message {
  message: string;
  uuid: string;
}

const Chat = ({
  t,
  room,
  socket,
  messages,
  showFull,
  handleShow,
}: {
  t: any;
  room: any;
  socket: any;
  messages: any;
  showFull: boolean;
  handleShow: Function;
}) => {
  const { user } = useSelector((state: any) => state.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<MyFormData>({ mode: "onChange" });

  const [isUnread, setIsUnread] = useState(false);
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTo(0, messagesRef.current.scrollHeight);
    }
  }, [messages, showFull]);

  useEffect(() => {
    if (!showFull && messages.length > 0) {
      setIsUnread(true);
    }
  }, [messages]);

  const canChat = room
    ? room.players.find((player: any) => player.uuid === user.uuid) != undefined
    : false;

  const onSubmit = handleSubmit((data) => {
    reset({ message: "" });
    socket.emit("sendMessage", { name: room.name, message: data.message });
  });

  return (
    <>
      <div
        className={`fixed shadow-lg text-orange-400 border-2 rounded-full cursor-pointer bg-cbrownl hover:bg-cbrownl2 transition-background duration-300 shadow-2xl right-4 bottom-4 ${
          showFull ? "border-corange" : "border-cborder"
        }`}
        onClick={() => {
          handleShow();
          setIsUnread(false);
        }}
      >
        <div
          className={`absolute h-3 w-3 bg-red-500 rounded-full animate-ping left-2 top-2 ${
            isUnread ? "" : "hidden"
          }`}
        ></div>
        <div
          className={`absolute h-3 w-3 bg-red-500 rounded-full left-2 top-2 ${
            isUnread ? "" : "hidden"
          }`}
        ></div>
        <p className="text-2xl p-3">
          {showFull ? <RiChatOffLine /> : <RiMessageLine />}
        </p>
      </div>
      {showFull ? (
        <div className="z-50 fixed border-2 rounded-lg mb-8 md:mb-0 border-cborder bg-cbrownl shadow-2xl w-full md:w-2/5 lg:w-1/3 2xl:w-1/6 right-0 md:right-2 bottom-12 md:bottom-20">
          <div className="flex bg-cbrownl2 px-3 py-1 justify-between rounded-t-md">
            <p className="mr-6 text-clabel">
              {t.roomChat} <span className="monospace">[{room.name}]</span>
            </p>
            <div
              className="text-2xl text-orange-400 cursor-pointer transition duration-400 hover:bg-cbrown hover:text-amber-600"
              onClick={() => {
                handleShow();
              }}
            >
              <RiCloseFill />
            </div>
          </div>
          <div
            className="px-3 py-0.5 shadow-inner flex-col h-60 overflow-y-scroll border-b border-amber-900 justify-end"
            ref={messagesRef}
          >
            {messages.length === 0 ? (
              <p className="text-center">{t.chatIsEmpty}</p>
            ) : (
              messages.map((message: any, i: number) => {
                const player = room.players.find(
                  (player: any) => player.uuid === message.uuid
                );
                const isAuthor = message.uuid === user.uuid;
                return (
                  <div
                    key={i}
                    className={`mb-2 flex flex-col border-cborder ${
                      isAuthor ? "border-r" : "border-l"
                    }`}
                  >
                    <h2
                      className={`ml-2 text-sm italic text-clabel ${
                        isAuthor ? "text-right" : ""
                      }`}
                    >
                      {player.username}, <span>{message.time}</span>
                    </h2>
                    <p
                      className={`px-2 py-0.5 rounded-lg bg-cbrown w-min max-w-full break-words ${
                        isAuthor ? "self-end" : ""
                      }`}
                    >
                      {message.message}
                    </p>
                  </div>
                );
              })
            )}
          </div>
          {canChat ? (
            <form className="flex " action="" onSubmit={onSubmit}>
              <input
                className={`bg-cbrown rounded-bl-lg p-0.5 px-2 text-gray placeholder-cplaceholder leading-tight focus:outline-none focus:shadow-outline focus:border-cfocusborder w-full ${
                  errors.message ? "bg-red-900" : ""
                }`}
                placeholder={t.chatMessagePlaceHolder}
                autoComplete="off"
                {...register("message", {
                  required: true,
                  minLength: 1,
                  maxLength: 100,
                })}
                maxLength={100}
              />
              <button
                className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 hover:opacity-80 text-white font-bold py-2 px-4 rounded-br-md"
                type="submit"
              >
                {t.sendMessage}
              </button>
            </form>
          ) : (
            <p className="text-clabel italic px-3 text-center text-xs py-1">
              {t.chatOnlyForPlayersOnSeat}
            </p>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Chat;
