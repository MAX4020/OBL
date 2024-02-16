import { useContext } from "react";
import Chunk from "./Chunk";
import { AreaContext } from "../AreaContext";

interface IDisplays extends React.HTMLAttributes<HTMLElement> {
  monitors: []
}

const Displays = ({monitors}:IDisplays) => {
  return ( 
    <>
    {monitors.map((item: any) => (
            <Chunk
              style={{
                gridColumnStart: item.point.col,
                gridColumnEnd:   item.point.col + item.size.w,
                gridRowStart:    item.point.row,
                gridRowEnd:      item.point.row + item.size.h,

                gridTemplateRows: `repeat(${item.grid.row},1fr)`,
                gridTemplateColumns: `repeat(${item.grid.col},1fr)`,
              }}
            >
              <div className="text-slate-400">{item.name}</div>
            </Chunk>
          ))}
    </>
   );
}
 
export default Displays;