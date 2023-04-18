import { AppProps } from "next/dist/shared/lib/router/router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import user, { getLoggedInThunk, refresh } from "../redux/user";
import Link from "next/link";
import MyLoader from "./MyLoader";

const BlockCol = ({
  c,
  i,
  move,
  handleCover,
  boardSize,
  isFocused,
  handleFocusedColumns,
  resetFocusedColumns,
  hasMove,
}: {
  c: any;
  i: number;
  move: Function;
  handleCover: Function;
  handleFocusedColumns: Function;
  resetFocusedColumns: Function;
  isFocused: boolean;
  boardSize: number;
  hasMove: boolean;
}) => {
  const [hover, setHover] = useState<string | null>(null);

  const [hoverClass, setHoverClass] = useState<string>("");

  const [topClicked, setTopClicked] = useState<boolean>(false);

  const selectOneBlock = (i: number, b: number) => {
    handleHover(null);
    handleCover(false);
    setTopClicked(false);
    resetFocusedColumns();
    if (!(c[0] === "*" && c[1] === "*" && c[2] === "*")) move("one", i, b);
  };

  const clickTop = (i: number) => {
    if (c[0] === "*" && c[1] === "*" && c[2] === "*") return;

    handleHover(null);
    handleCover(true);

    if (c[0] === "*" || c[1] === "*" || c[2] === "*") {
      if (!(c[0] === "*" && c[1] === "*" && c[2] === "*")) move("column", i);
    } else {
      setTopClicked(true);
    }
    handleFocusedColumns(i);
  };

  const clickBottom = (i: number) => {
    handleHover(null);
    if (!(c[0] === "*" && c[1] === "*" && c[2] === "*")) move("column", i);
  };

  const handleHover = (val: string | null) => {
    if (!hasMove) return;
    if (val === "top" && (c[0] === "*" || c[1] === "*" || c[2] === "*"))
      setHover("bottom");
    else setHover(val);
  };

  useEffect(() => {
    if (isFocused) {
    } else if (hover === "top") {
      setHoverClass("permutuHovered");
    } else if (hover === "bottom") {
      setHoverClass("border-amber-400 border-4");
    } else {
      setHoverClass("");
    }
  }, [hover]);

  return (
    <div className={`flex flex-col relative h-full`}>
      <div
        className={`flex flex-col absolute h-full w-full rounded-md z-10  ${
          hover === "bottom" ? hoverClass : ""
        } ${
          isFocused || !hasMove || (c[0] == "*" && c[1] == "*" && c[2] == "*")
            ? "opacity-0"
            : "opacity-100 "
        }`}
      >
        <div
          className={`opacity-90 transition-opacity duration-500 ease-in-out relative flex-1 w-full `}
          onMouseEnter={() => handleHover("top")}
          onMouseLeave={() => handleHover(null)}
          onClick={() => clickTop(i)}
        ></div>
        <div
          className={`opacity-90 relative flex-1 w-full `}
          onMouseEnter={() => handleHover("bottom")}
          onMouseLeave={() => handleHover(null)}
          onClick={() => clickBottom(i)}
        ></div>
      </div>
      <div
        className={`flex flex-col transition-transform duration-200 ease-in-out space-y-1 h-full bg-cbrownl2 rounded-lg ${
          isFocused ? "z-40 transform scale-110" : ""
        }`}
      >
        {c[0] != "*" ? (
          <div
            className={`flex-1 p-1 text-center permutuBlock permutu permutuRed text-${boardSize}xl transition-all duration-200 ease-in-out md:text-${boardSize}xl ${
              isFocused
                ? "hover:bg-amber-200 hover:text-corange hover:border-corange"
                : ""
            }
            ${hover === "top" ? hoverClass : ""}`}
            onClick={() => {
              if (isFocused && hasMove) {
                selectOneBlock(i, 0);
              }
            }}
          >
            {c[0]}
          </div>
        ) : (
          <div className="flex-1 p-1 border-2 border-transparent"></div>
        )}
        {c[1] != "*" ? (
          <div
            className={`flex-1 p-1 text-center permutuBlock permutu permutuBlack text-${boardSize}xl transition-all duration-200 ease-in-out md:text-${boardSize}xl ${
              isFocused
                ? "hover:bg-amber-200 hover:text-corange hover:border-corange"
                : ""
            } ${hover === "top" ? hoverClass : ""} `}
            onClick={() => {
              if (isFocused && hasMove) {
                selectOneBlock(i, 1);
              }
            }}
          >
            {c[1]}
          </div>
        ) : (
          <div className="flex-1 p-1 border-2 border-transparent"></div>
        )}
        {c[2] != "*" ? (
          <div
            className={`flex-1 p-1 text-center permutuBlock permutu permutuGreen text-${boardSize}xl transition-all duration-200 ease-in-out md:text-${boardSize}xl ${
              isFocused
                ? "hover:bg-amber-200 hover:text-corange hover:border-corange"
                : ""
            } ${hover === "top" ? hoverClass : ""} `}
            onClick={() => {
              if (isFocused) {
                selectOneBlock(i, 2);
              }
            }}
          >
            {c[2]}
          </div>
        ) : (
          <div className="flex-1 p-1 border-2 border-transparent"></div>
        )}
      </div>
    </div>
  );
};

export default function Board({
  room,
  move,
  boardSize,
}: {
  room: any;
  move: Function;
  boardSize: number;
}) {
  const [coverVisible, setCoverVisible] = useState<boolean>(false);
  const [hasMove, setHasMove] = useState(false);

  const { user } = useSelector((state: any) => state.user);

  const handleCover = (v: boolean) => {
    setCoverVisible(v);
  };

  const [focusedColumns, setFocusedColumns] = useState<Array<boolean>>();

  useEffect(() => {
    if (room == undefined || room.board == undefined) {
    } else {
      if (
        room.status === "ingame" &&
        room.players[room.turn].uuid === user.uuid
      ) {
        setHasMove(true);
      } else {
        setHasMove(false);
      }
      resetFocusedColumns();
    }
  }, [room]);

  const resetFocusedColumns = () => {
    setFocusedColumns(
      Array.apply(null, Array(room.board.length)).map(function (x, i) {
        return false;
      })
    );
  };

  const handleFocusedColumns = (i: number) => {
    if (hasMove) {
      setFocusedColumns((arr) => {
        if (arr === undefined) return arr;
        else {
          let a = Array.apply(null, Array(room.board.length)).map(function (
            x,
            i
          ) {
            return false;
          });
          a[i] = true;
          return a;
        }
      });
    }
  };

  if (room == undefined || room.board == undefined) {
    return <></>;
  } else if (room.status === "ingame") {
    return (
      <div
        className={`flex relative flex-wrap justify-center px-2 pt-2 md:px-6 border-2 rounded-md w-full transition-all duration-250 ease-in-out ${
          hasMove
            ? "border-lime-500 bg-hasMoveBoardBg"
            : "border-cbrownl2 bg-cbrownl"
        }`}
      >
        <div
          className={`cursor-not-allowed absolute bg-cbrown opacity-70 w-full h-full ${
            coverVisible ? "z-30" : "hidden"
          }`}
          onClick={() => {
            setCoverVisible(false);
            resetFocusedColumns();
          }}
        ></div>
        {room.board.map((c: any, i: number) => {
          return (
            <div
              key={`${c}${i}`}
              className={`flex items-center flex-col text-white m-1.5 ${
                hasMove && !(c[0] == "*" && c[1] == "*" && c[2] == "*")
                  ? "cursor-pointer"
                  : ""
              }`}
            >
              {
                <BlockCol
                  c={c}
                  i={i}
                  move={move}
                  boardSize={boardSize}
                  hasMove={hasMove}
                  handleCover={handleCover}
                  handleFocusedColumns={handleFocusedColumns}
                  resetFocusedColumns={resetFocusedColumns}
                  isFocused={
                    focusedColumns === undefined ? false : focusedColumns[i]
                  }
                />
              }
              <span className="text-sm pt-1 text-clabel">{i + 1}</span>
            </div>
          );
        })}
      </div>
    );
  }
  return <></>;
}
