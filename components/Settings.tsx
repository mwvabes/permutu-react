import { useState } from "react";

const Settings = ({
  show,
  handleShowSettings,
  t,
  socket,
  room,
}: {
  show: boolean;
  handleShowSettings: Function;
  socket: any;
  t: any;
  room: any;
}) => {
  const [boardSizeSelect, setBoardSizeSelect] = useState(
    room.settingsSize || 1
  );
  const [boardComplexitySelect, setBoardComplexitySelect] = useState(
    room.settingsComplexit || 0
  );
  if (!show) return <></>;
  const changeBoardSize = (e: any) => {
    e.preventDefault();
    socket.emit("changeBoardSize", {
      name: room.name,
      size: boardSizeSelect,
      complex: boardComplexitySelect,
    });
  };

  const handleBoardSizeSelect = (v: any) => {
    setBoardSizeSelect(v.target.value);
  };

  const handleBoardComplexitySelect = (v: any) => {
    setBoardComplexitySelect(v.target.value);
  };

  return (
    <div className="absolute bg-cbrown border-2 border-cborder p-2 right-0 flex flex-col rounded-md z-50">
      <span className="mr-20">{t.settings}</span>
      <form onSubmit={changeBoardSize} className="flex flex-col space-y-1">
        <label htmlFor="boardSize" className="text-sm italic text-clabel">
          {t.boardSizeVariant}
        </label>
        <select
          name="boardSize"
          className="bg-cbrown mr-2 border border-cborder"
          onChange={handleBoardSizeSelect}
          defaultValue={room.settingsSize}
        >
          <option value="1">{t.smaller}</option>
          <option value="2">{t.medium}</option>
          <option value="3">{t.standard}</option>
        </select>
        <label htmlFor="boardSize" className="text-sm italic text-clabel">
          {t.complexityLabel}
        </label>
        <select
          name="boardComplexity"
          className="bg-cbrown mr-2 border border-cborder"
          onChange={handleBoardComplexitySelect}
          defaultValue={room.settingsComplexity}
        >
          <option value="1">{t.disallowRepeat}</option>
          <option value="0">{t.allowRepeat}</option>
        </select>
        <button
          className="transition flex flex-row items-center justify-center bg-primary bg-gradient-to-r from-yellow-600 to-red-600 text-white font-bold p-0.5 rounded focus:outline-none focus:shadow-outline mr-2"
          type="submit"
        >
          {t.saveChanges}
        </button>
      </form>
      <span
        className="italic text-sm cursor-pointer hover:text-corange text-clabel mt-4"
        onClick={() => handleShowSettings()}
      >
        {t.close}
      </span>
    </div>
  );
};

export default Settings;
