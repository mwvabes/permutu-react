import { useEffect, useState } from "react";
import { RiMoonClearFill } from "react-icons/ri";
import { useSelector } from "react-redux";

interface Room {
  turnTimeLimit: number;
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

const CurrentStatusExtended = ({ room, t }: { room: any; t: any }) => {
  const { user } = useSelector((state: any) => state.user);
  const lastAction = [...room.actions]
    .reverse()
    .find(
      (action: any) =>
        !(action.type === "WRONG_MOVE" && action.uuid != user.uuid)
    );

  const shouldWarn = lastAction.type == "WRONG_MOVE";

  const wrongMovesInTurn = room.actions.filter(
    (action: any) =>
      action.type === "WRONG_MOVE" &&
      action.uuid === user.uuid &&
      action.moveCount === room.moveCount
  ).length;

  const player = room.players.find((p: any) => p.uuid === lastAction.uuid);

  return (
    <div
      className={`flex w-full px-2 py-1 border ${
        shouldWarn ? "border-calertborderwarning" : "border-cborder2"
      } bg-cbrown mb-1 rounded-lg items-center justify-center overflow-hidden`}
    >
      <div className="flex space-x-2 items-center">
        <p>{t.lastAction}:</p>
        {lastAction.type === "SKIP_TURN" && (
          <p className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.player}</span>
            <span className="monospace">
              {player ? player.username : "***"}
            </span>
            <span>{t.skippedTurn}</span>
          </p>
        )}
        {lastAction.type === "START" && (
          <p className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.gameStarted}</span>
          </p>
        )}
        {lastAction.type === "RESET" && (
          <p className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.reset}</span>
          </p>
        )}
        {lastAction.type === "CHANGE_SETTINGS" && (
          <p className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.settingsChanged}</span>
          </p>
        )}
        {lastAction.type === "CREATE" && (
          <p className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.roomCreated}</span>
          </p>
        )}
        {(lastAction.type === "MOVE_ONE" || lastAction.type === "MOVE_COL") && (
          <div className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.player}</span>
            <span className="monospace">{player.username}</span>
            <span>{t.took}</span>
            <div className="flex space-x-0.5">
              {lastAction.symbols.map((symbol: any) => {
                console.log("sym", symbol);
                return (
                  <div
                    key={symbol.symbol + symbol.color}
                    className={`p-0.5 text-center permutuBlock permutu text-md 
                    ${symbol.color == 0 ? " permutuRed" : ""}
                    ${symbol.color == 1 ? " permutuBlack" : ""}
                    ${symbol.color == 2 ? " permutuGreen" : ""}
                    `}
                  >
                    {symbol.symbol}
                  </div>
                );
              })}
            </div>
            <span>
              {t.fromColumn} {lastAction.column}
            </span>
          </div>
        )}
        {lastAction.type === "WRONG_MOVE" && lastAction.uuid === user.uuid && (
          <p className="flex space-x-1 font-bold flex-wrap items-center justify-center">
            <span>{t.youMadeWrongMove}</span>
            <span className="monospace text-calertlabel">
              [{wrongMovesInTurn}/3]
            </span>
            <span>{t.youCanMakeThreeWrongMovesMax}</span>
          </p>
        )}
      </div>
    </div>
  );
};

const StatusBar = ({
  room,
  t,
  user,
}: {
  room: Room | undefined;
  t: any;
  user: any;
}) => {
  const [time, setTime] = useState<string>("");
  const [timerInterval, setTimerInterval] = useState<any>();

  useEffect(() => {
    if (room === undefined) return;
    else if (room.status === undefined) return;
    else if (room.status === "waiting") return;
    clearInterval(timerInterval);
    if (room === undefined) {
    } else {
      setTimerInterval(
        setInterval(() => {
          const now = new Date().getTime();
          const diff = new Date(room.turnTimeLimit - now);
          //setTime(`${diff.getMinutes()}:${diff.getSeconds()}`);
          setTime(
            `${diff.getMinutes()}:${
              diff.getSeconds() < 10
                ? `0${diff.getSeconds()}`
                : diff.getSeconds()
            }`
          );
        }, 500)
      );
    }
  }, [room]);

  if (room === undefined) return <></>;
  else if (room.status === undefined) return <></>;
  else if (room.status === "waiting") return <></>;

  if (room.status === "ingame") {
    if (room.players[room.turn].uuid === user.uuid) {
      return (
        <div className="flex flex-col items-center">
          <div
            className="h-3 mb-3 rounded-b-xl animate-pulse bg-gradient-to-r 
    from-lime-600
    to-lime-700
    w-full text-center font-bold"
          ></div>
          <div className="flex flex-col md:w-3/5 items-center justify-center">
            <div
              className={`mb-3 text-2xl px-4 py-1.5 border border-lime-500 transition-all duration-250 ease-in-out bg-cbrownl2 rounded-xl space-x-1`}
            >
              <span>{t.yourTurn}</span>
              <span className="monospace text-lime-400">[{time}]</span>
            </div>
            <CurrentStatusExtended room={room} t={t} />
          </div>
        </div>
      );
    } else {
      return (
        <div className="flex flex-col items-center">
          <div
            className="h-3 mb-3 rounded-b-xl bg-corange
    w-full text-center font-bold"
          ></div>
          <div className="flex flex-col md:w-3/5 items-center justify-center">
            <div
              className={`mb-3 text-2xl px-4 py-1.5 border border-cborder transition-all duration-250 ease-in-out bg-cbrownl2 rounded-xl`}
            >
              {t.player} <b>{room.players[room.turn].username}</b>{" "}
              {t.makesAMove}
              <span className="monospace">[{time}]</span>
            </div>
            <CurrentStatusExtended room={room} t={t} />
          </div>
        </div>
      );
    }
  } else {
    return <></>;
  }
};

export default StatusBar;
