import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import Board from "../../components/Board";
import MyLoader from "../../components/MyLoader";
import PlayerClaims from "../../components/PlayerClaims";
import WaitingForStart from "../../components/WaitingForStart";
import {
  AiOutlineMinusCircle,
  AiOutlinePlusCircle,
  AiOutlineSetting,
} from "react-icons/ai";
import { CgCrown } from "react-icons/cg";
import { MdOutlineChair, MdLockOutline } from "react-icons/md";
import { GoSignOut } from "react-icons/go";
import Scoreboard from "../../components/Scoreboard";
import { classNames } from "react-select/dist/declarations/src/utils";
import Chat from "../../components/Chat";
import QuickHelp from "../../components/QuickHelp";
import RoomWasDeleted from "../../components/RoomWasDeleted";
import ProvidePinToJoin from "../../components/ProvidePinToJoin";
import Settings from "../../components/Settings";
import StatusBar from "../../components/StatusBar";
import ReactTooltip from "react-tooltip";
import ModalLeave from "../../components/ModalLeave";

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
  turnTimeLimit: number;
}

interface Player {
  username: string;
  country: string;
  uuid: string;
  claims: [];
  isModerator: boolean;
  locked: boolean;
}

interface Message {
  message: string;
  uuid: string;
  time: string;
}

const socket = io(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}`, {
  withCredentials: true,
  //query: `name=${name}`,
});

const Game = ({ t }: { t: any }) => {
  const router = useRouter();
  const { name } = router.query;
  const [shortcut, setShortcut] = useState<Shortcut>();
  const { user } = useSelector((state: any) => state.user);
  const [room, setRoom] = useState<Room>();
  const [subStatus, setSubStatus] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);

  const [showSettings, setShowSettings] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [showQuickHelp, setShowQuickHelp] = useState(false);

  const [boardSize, setBoardSize] = useState(2);

  const [pageTitle, setPageTitle] = useState<string>("");

  const [messages, setMessages] = useState<Message[]>([]);

  const [wasDeleted, setWasDeleted] = useState(false);

  const [joinPinRequired, setJoinPinRequired] = useState<boolean>(false);
  const [joinPin, setJoinPin] = useState<number>();
  const [pinUnauthorized, setPinUnauthorized] = useState<boolean>(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };

  const handleJoinPinRequired = (val: any) => {
    setJoinPinRequired(val);
  };

  const handleJoinPin = (val: any) => {
    setJoinPin(val);
    getRoom(val);
  };

  const handleShowSettings = () => {
    setShowSettings(!showSettings);
  };

  const handleShowChat = () => {
    setShowChat(!showChat);
    if (showQuickHelp) handleShowQuickHelp();
  };

  const handleShowQuickHelp = () => {
    setShowQuickHelp(!showQuickHelp);
    if (showChat) handleShowChat();
  };

  const handleBoardSize = (type: string) => {
    if (type == "plus" && boardSize == 4) {
    } else if (type == "plus") {
      setBoardSize((size) => {
        return size + 1;
      });
    } else if (type == "minus" && boardSize == 2) {
    } else if (type == "minus") {
      setBoardSize((size) => {
        return size - 1;
      });
    }
  };

  const move = (t: string, i: number, b: number = 0) => {
    socket.emit("move", { name, t, i, b });
  };

  useEffect(() => {
    if (room === undefined) {
    } else {
      if (
        room.status === "ingame" &&
        room.players[room.turn].uuid === user.uuid
      ) {
        setPageTitle(`Permutu ${name ? "| " + name : ""}`);
      } else {
        setPageTitle(`Permutu ${name ? "| " + name : ""}`);
      }
    }
  }, [room]);

  const refresh = () => {
    socket.emit("refresh", { name });
  };

  useEffect(() => {
    const socket = io(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}`, {
      // withCredentials: "true",
      //query: `name=${name}`,
      extraHeaders: {
        "Access-Control-Allow-Origin": "*",
      },
      query: {
        name: `${name}`,
      },
    });

    socket.on("room", (room) => {
      setRoom(room);
    });
    socket.on("roomChanged", (room) => {
      refresh();
    });
    socket.on("noActionDelete", (room) => {
      setWasDeleted(true);
    });
    const date = new Date();
    socket.on("message", (message: string, uuid: string) => {
      setMessages((r) => [
        ...r,
        { uuid, message, time: `${date.getHours()}:${date.getMinutes()}` },
      ]);
    });
  }, [name]);

  useEffect(() => {
    if (room === undefined) {
    } else if (room.status === "waiting") {
      setSubStatus("waiting");
    } else if (room.status === "ingame" && room.turn != null) {
      if (room.players[room.turn].uuid === user.uuid) {
        setSubStatus("yourturn");
      } else {
        setSubStatus("opponentmove");
      }
    }
  }, [room]);

  const takeASeat = (i: number) => {
    socket.emit("takeASeat", { name, user, i });
  };

  const handleLeaveASeat = () => {
    const takenSeat = room?.players.findIndex((p) => p.uuid === user.uuid);

    if (takenSeat != -1) {
      leaveASeat(takenSeat);
    }
    handleShowModal();
  };

  const leaveASeat = (i: any) => {
    console.log("leaving ", i, user, name);
    socket.emit("leaveASeat", { name, user, i });
  };

  const renderOpponentsBoards = () => {
    if (room != undefined) {
      if (room.status != "ingame") return <></>;
      const players = room.players.filter((p) => {
        return p.uuid != user.uuid;
      });
      return players.map((player) => {
        if (player === undefined) return <></>;
        return (
          <PlayerClaims key={player.uuid} player={player} t={t} short={false} />
        );
      });
    }
    return <></>;
  };

  const renderPlayerBoard = () => {
    if (room != undefined) {
      if (room.status != "ingame") return <></>;
      const player = room.players.find((p) => {
        return p.uuid === user.uuid;
      });
      if (player != undefined && player.claims != undefined)
        return <PlayerClaims player={player} t={t} short={false} />;
    }
    return <></>;
  };

  const renderSeats = () => {
    if (room) {
      return (
        <div className="flex flex-row mx-4 space-x-1 rounded-md flex-wrap">
          {room.players.map((s: Player, i: number) => {
            return (
              <div
                key={i}
                className="bg-cbrown flex items-center mr-3 space-x-1 px-2"
              >
                {s.isModerator == true && (
                  <>
                    <div
                      className="text-2xl text-amber-400"
                      //style={{ top: "-15px", left: "13px" }}
                      data-tip={t.playerIsOperator}
                    >
                      <CgCrown />
                    </div>
                  </>
                )}
                {s.locked == true && (
                  <>
                    <div
                      className="text-2xl text-red-400"
                      data-tip={t.playerLeft}
                      //style={{ top: "-15px", left: "13px" }}
                    >
                      <MdLockOutline />
                    </div>
                  </>
                )}
                <span className="monospace">{i + 1}</span>

                <p className={`${s.uuid ? "text-cgray" : "text-freeSeatText"}`}>
                  {s.uuid ? (
                    <a
                      href={`${window.location.origin}/player/${s.username}`}
                      className="hover:opacity-80 transition-opacity duration-200"
                    >
                      <span className="underline">{s.username}</span>
                    </a>
                  ) : (
                    t.freeSeat
                  )}
                </p>
                {s.uuid == null && (
                  <button
                    className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold p-0.5 rounded focus:outline-none focus:shadow-outline px-2"
                    onClick={() => takeASeat(i)}
                  >
                    {t.takeASeat}
                  </button>
                )}
                {s.uuid == user.uuid && !s.locked && (
                  <button
                    className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold p-0.5 rounded focus:outline-none focus:shadow-outline"
                    onClick={() => handleShowModal()}
                  >
                    <span className="bg-cbrown rounded-sm flex items-center justify-center w-full h-full p-1 px-2 hover:bg-transparent transition duration-280 ease-in-out">
                      <div
                        className="text-xl bp-1 rounded-lg"
                        //style={{ top: "-15px", left: "13px" }}
                      >
                        <GoSignOut />
                      </div>{" "}
                      {t.leaveASeat}
                    </span>
                  </button>
                )}
              </div>
            );
          })}
        </div>
      );
    }
    return <></>;
  };

  const renderDesc = () => {
    const isModerator = room
      ? room.players.find((p) => {
          return p.uuid === user.uuid && p.isModerator;
        }) != undefined
      : false;
    if (shortcut)
      return (
        <div className="mx-3 my-1 p-1 flex items-center justify-center flex-wrap">
          <div className="flex flex-row">
            <div
              className="text-2xl text-cicon bg-cbrownl p-1 rounded-lg cursor-pointer hover:text-corange transition-color duration-280 ease-in-out"
              //style={{ top: "-15px", left: "13px" }}
              onClick={() => handleBoardSize("minus")}
            >
              <AiOutlineMinusCircle />
            </div>
            <div
              className="text-2xl text-cicon bg-cbrownl p-1 rounded-lg cursor-pointer hover:text-corange transition-color duration-280 ease-in-out"
              //style={{ top: "-15px", left: "13px" }}
              onClick={() => handleBoardSize("plus")}
            >
              <AiOutlinePlusCircle />
            </div>
          </div>
          {isModerator && (
            <div className="relative">
              <div
                className="text-2xl text-cicon bg-cbrownl p-1 rounded-lg hover:text-corange cursor-pointer"
                //style={{ top: "-15px", left: "13px" }}
                onClick={handleShowSettings}
              >
                <AiOutlineSetting />
              </div>
              <Settings
                show={showSettings}
                t={t}
                handleShowSettings={handleShowSettings}
                socket={socket}
                room={room}
              />
            </div>
          )}
          <p className={`mx-1 monospace`}>{shortcut.name}</p>
        </div>
      );
  };

  const renderInfo = () => {
    if (room == undefined) return <></>;
    if (
      room.players.filter((p: Player) => p.uuid === null).length > 0 &&
      room.status === "waiting"
    )
      return <WaitingForStart t={t} name={name} />;
  };

  const getShortcut = () => {
    axios
      .post(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}/rooms/shortcut`, {
        code: name,
      })
      .then((r) => {
        setShortcut(r.data);
      })
      .catch((e) => {
        router.push("/");
      });
  };

  const getRoom = (joinPin = "", playPin = "") => {
    axios
      .post(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}/rooms/full`, {
        code: name,
        joinPin: joinPin,
        playPin: playPin,
      })
      .then((r) => {
        setJoinPinRequired(false);
        setPinUnauthorized(false);
        setRoom(r.data);
      })
      .catch((e) => {
        if (e.response.status != 403) router.push("/");
        if (e.response.status == 403) setPinUnauthorized(true);
      });
  };

  useEffect(() => {
    if (router.query.name) {
      axios
        .post(`${process.env.GAMEPLAY_API_PUBLIC_ADDRESS}/rooms/shortcut`, {
          code: router.query.name,
        })
        .then((r) => {
          setShortcut(r.data);
          if (
            r.data.protectedJoin.isProtectedJoin &&
            r.data.createdBy != user.uuid
          ) {
            handleJoinPinRequired(true);
          } else {
            getRoom();
          }
        })
        .catch((e) => {
          router.push("/");
        });
    }
  }, [setRoom, router]);

  if (shortcut === undefined) {
    return (
      <Head>
        <title>{`Permutu ${name ? "| " + name : ""}`}</title>
      </Head>
    );
  }

  if (wasDeleted)
    return (
      <>
        <Head>
          <title>{pageTitle || "Permutu"}</title>
        </Head>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center lg:w-3/5">
            <RoomWasDeleted t={t} />
          </div>
        </div>
      </>
    );

  if (joinPinRequired === true) {
    return (
      <>
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center lg:w-2/5">
            <ProvidePinToJoin
              handleJoinPin={handleJoinPin}
              t={t}
              pinUnauthorized={pinUnauthorized}
            />
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="relative">
      <Head>
        <title>{pageTitle || "Permutu"}</title>
      </Head>
      <ModalLeave
        show={showModal}
        t={t}
        handleShow={handleShowModal}
        handleLeaveASeat={handleLeaveASeat}
      />
      <div className="flex border-b border-cborder bg-cbrownl2 justify-between flex-wrap">
        {renderSeats()}
        {renderDesc()}
      </div>
      <StatusBar room={room} t={t} user={user} />

      <div className="flex flex-col items-center">
        <Scoreboard room={room} t={t} />
        <div className="flex flex-col items-center lg:w-3/5">
          {renderInfo()}
          <Board room={room} move={move} boardSize={boardSize} />
          <div
            className={`flex justify-between w-full mb-20 ${
              room && room.status != "ingame" ? "hidden" : ""
            }`}
          >
            {renderOpponentsBoards()}
            {renderPlayerBoard()}
          </div>
        </div>
      </div>
      <QuickHelp
        t={t}
        showFull={showQuickHelp}
        handleShow={handleShowQuickHelp}
      />
      <Chat
        t={t}
        room={room}
        socket={socket}
        messages={messages}
        showFull={showChat}
        handleShow={handleShowChat}
      />
    </div>
  );
};

export default Game;
