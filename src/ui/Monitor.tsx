import classNames from "classnames";

interface IMonitor extends React.HTMLAttributes<HTMLElement>{
}

const Monitor = ({children,className}:IMonitor) => {

  const styleMonitor = classNames('absolute top-0 left-0 w-full min-h-full border-4 border-orange-500 grid')

  return ( 
    <>
    <div className={styleMonitor}>{children}</div>
    </>
   );
}
 
export default Monitor;