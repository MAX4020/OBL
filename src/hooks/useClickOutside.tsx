import React from "react";
type IUseOutsideClickCallback = ()=>void

export default function useOutsideClick(callback:IUseOutsideClickCallback){
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const handleClick = (event:any) => {
      console.log(ref.current)
      console.log(event.target)
      console.log(ref.current.contains(event.target))
      ref.current && !ref.current.contains(event.target) && callback()
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
};