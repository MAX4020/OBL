import classNames from "classnames";
import { useContext } from "react";
import { AreaContext } from "../AreaContext";

interface ISavedArea extends React.HTMLAttributes<HTMLElement> {
  fCol: number,
  fRow: number,
}

const SavedArea = ({fCol,fRow}:ISavedArea) => {
  const {listArea,setListArea} = useContext(AreaContext)
  
  const styleGrid = classNames("absolute top-0 left-0 w-full h-full grid");

  return ( 
    <>
    <div
            className={classNames(styleGrid)}
            style={{
              gridTemplateRows:    `repeat(${fRow * 2},1fr)`,
              gridTemplateColumns: `repeat(${fCol * 3},1fr)`,
            }}
          >
            {listArea.map((item: any) => (<div
              className = "bg-slate-500/75 border-2 border-slate-100"
              style = {{
                gridColumnStart: item.start[1],
                gridRowStart:    item.start[0],
                gridColumnEnd:   item.end[1],
                gridRowEnd:      item.end[0],
              }}
            >
              <div className="text-slate-400">{item.name}</div>
            </div>))}
          </div>
    </>
   );
}
 
export default SavedArea;