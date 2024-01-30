import { HTMLAttributes, useRef, useState } from 'react';
import { FaChevronRight,FaChevronLeft } from 'react-icons/fa6';
import './App.css';
import Chunk from './ui/Chunk';
import Monitor from './ui/Monitor';
import MenuCust from "./ui/MenuCust"
import useOutsideClick from './hooks/useClickOutside';
import { link } from 'fs';
import classNames from 'classnames';
import { MyContext, MyContextProvider } from './Context';

const monitors:any = [
  {
    name:"HDMI-1",
    point:{row:1,col:1},
    size:{h:2,w:2},
    grid:{row:6,col:8}
  },
  {
    name:"HDMI-2",
    point:{row:1,col:3},
    size:{h:1,w:1},
    grid:{row:3,col:4}
  },
  {
    name:"HDMI-3",
    point:{row:2,col:3},
    size:{h:1,w:1},
    grid:{row:3,col:4}
  }
]

function App() {
  const [xy_start, setxystart] = useState<[number,number]>([0,0])
  const [xy_end, setxyend] = useState<[number,number]>([1,1])
  const [fCol, setFCol] = useState<number>(4)
  const [fRow, setFRow] = useState<number>(3)
  const [startArea, setStartArea] = useState<boolean>(false)
  const [startPos, setStartPos] = useState<[number,number]>([0,0])

  const onClickStart = (row:number,col:number) => {
    setxystart([col,row])
  }

  const onMouseEnterHandler = (row:number,col:number) =>{
    // console.log(`row = ${row}`)
    // console.log(`col = ${col}`)
    console.log(startArea)
    if (startArea){
      console.log([col,row])
      setxyend([col+1,row+1])
    }
  }

  const createCase = (grid:[number,number]) => {
    const cells:any = []
    for(let i = 1;i<=grid[0];i++)
      for(let j = 1;j<=grid[1];j++)
        cells.push(<div onMouseEnter={()=>onMouseEnterHandler(j,i)} onClick={()=>onClickStart(j,i)} className='border-2 border-slate-200/25'></div>)
    return cells
  }

  const styleGrid = classNames('absolute top-0 left-0 w-full h-full grid')

  return (
    <>
    <MyContextProvider>
      <Monitor>
        {monitors.map((item:any) => <Chunk style={{
          gridColumnStart:  item.point.col,
          gridColumnEnd:    item.point.col + item.size.w,
          gridRowStart:     item.point.row,
          gridRowEnd:       item.point.row + item.size.h,

          gridTemplateRows:     `repeat(${item.grid.row},1fr)`,
          gridTemplateColumns:  `repeat(${item.grid.col},1fr)`
        }}>
          <div className='text-slate-400'>{item.name}</div>
          {/* {createCase([item.grid.row,item.grid.col])} */}
        </Chunk>)}
        <div className={styleGrid} style={{
          gridTemplateRows:     `repeat(${fRow * 2},1fr)`,
          gridTemplateColumns:  `repeat(${fCol * 3},1fr)`
        }}>
          <div className='bg-red-100/75' style={{
          gridColumnStart:  xy_start[1],
          gridRowStart:     xy_start[0],
          gridColumnEnd:    xy_end[1],
          gridRowEnd:       xy_end[0]
          }}></div>
        </div>      
        <div className={styleGrid} style={{
          gridTemplateRows:     `repeat(${fRow * 2},1fr)`,
          gridTemplateColumns:  `repeat(${fCol * 3},1fr)`
        }}>
          {createCase([fRow * 2,fCol * 3])}
        </div>
      </Monitor>
      <MenuCust setStartArea={setStartArea} fRow={fRow} fCol={fCol} setFCol={setFCol} setFRow={setFRow}/>
    </MyContextProvider>
    </>
  );
}

export default App;
