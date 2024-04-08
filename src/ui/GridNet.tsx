import classNames from "classnames";
import { useContext } from "react";
import { AreaContext } from "../AreaContext";
import { styleGrid } from "./Style";

interface IGridNet extends React.HTMLAttributes<HTMLElement> {
  fCol: number,
  fRow: number,
}

const GridNet = ({fCol,fRow}:IGridNet) => {
  const {startArea, setStartArea, xyStart, setxyStart,xyEnd, setxyEnd, activeSave, setActiveSave} = useContext(AreaContext)

  const onClickStart = (row: number, col: number) => {
    if (startArea){
      setxyStart([col, row]);
    }
  };

  const onMouseUpEnd = () => {
    if(startArea){
      setStartArea(false)
      setActiveSave(true)
    }
  }

  const onMouseEnterHandler = (row: number, col: number) => {
    if (startArea) {
      setxyEnd([col+1,row+1])
    }
  };
  
  const createCase = (grid: [number, number]) => {
    const cells: any = [];
    for (let i = 1; i <= grid[0]; i++)
      for (let j = 1; j <= grid[1]; j++)
        cells.push(
          <div
            onMouseEnter = {() => onMouseEnterHandler(j, i)}
            onMouseDown = {() => onClickStart(j, i)}
            onMouseUp={() => onMouseUpEnd()}
            className = "border-2 border-slate-200/25"
          ></div>
        );
    return cells;
   
  };
  return ( 
    <>
    {startArea &&
            <div
            className={classNames(styleGrid)}
            style={{
              gridTemplateRows:    `repeat(${fRow * 2},1fr)`,
              gridTemplateColumns: `repeat(${fCol * 3},1fr)`,
            }}
          >
            <div
              className = "bg-red-100/75"
              style = {{
                gridColumnStart: xyStart[1],
                gridRowStart:    xyStart[0],
                gridColumnEnd:   xyEnd[1],
                gridRowEnd:      xyEnd[0],
              }}
            ></div>
          </div>}
        <div
      className = {styleGrid}
      style = {{
        gridTemplateRows:    `repeat(${fRow * 2},1fr)`,
        gridTemplateColumns: `repeat(${fCol * 3},1fr)`,
      }}
    >
      {createCase([fRow * 2, fCol * 3])}
    </div>
    </>
   );
}
 
export default GridNet;