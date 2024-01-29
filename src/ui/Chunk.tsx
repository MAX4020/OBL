import classNames from "classnames";

const Chunk = ({children,style,onClick}:any) => {

  const styleChunk = classNames('relative border-2 border-slate-200 grid')

  return ( 
    <>
    <div style={style} onClick={onClick} className={styleChunk}>{children}</div>
    </>
   );
}
 
export default Chunk;