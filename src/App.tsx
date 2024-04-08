import { useState } from "react";
import "./App.css";
import Monitor from "./ui/Monitor";
import MenuCust from "./ui/MenuCust";
import { MyContextProvider } from "./AreaContext";
import ModalSave from "./ui/ModalSave";
import SavedArea from "./ui/SavedArea";
import Displays from "./ui/Displays";
import GridNet from "./ui/GridNet";
import ModalCreatePreset from "./ui/ModalCreatePreset";

const monitors: any = [
  {
    name: "HDMI-1",
    point: { row: 1, col: 1 },
    size: { h: 2, w: 2 },
    grid: { row: 6, col: 8 },
  },
  {
    name: "HDMI-2",
    point: { row: 1, col: 3 },
    size: { h: 1, w: 1 },
    grid: { row: 3, col: 4 },
  },
  {
    name: "HDMI-3",
    point: { row: 2, col: 3 },
    size: { h: 1, w: 1 },
    grid: { row: 3, col: 4 },
  },
];

function App() {
  const [fCol, setFCol] = useState<number>(4);
  const [fRow, setFRow] = useState<number>(3);

  return (
    <>
      <MyContextProvider>
        <Monitor>
        <Displays monitors={monitors}/>
        <SavedArea fCol={fCol} fRow={fRow}></SavedArea>
        <GridNet fCol={fCol} fRow={fRow}/>
        </Monitor>
        <MenuCust
          fRow = {fRow}
          fCol = {fCol}
          setFCol = {setFCol}
          setFRow = {setFRow}
          monitors = {monitors.map((item: any, _index: number) => (<li className = "list-none p-2">{_index + 1}. {item.name} : {`[${item.size.h}:${item.size.w}]`}</li>))}
        />
        <ModalSave></ModalSave>
        <ModalCreatePreset/>
      </MyContextProvider>
    </>
  );
}

export default App;
