import React from "react";
type IUseOutsideClickCallback = ()=>void

export default function useOutsideClick(callback:IUseOutsideClickCallback){
  const ref = React.useRef<any>();

  React.useEffect(() => {
    const handleClick = (event:any) => {
      ref.current && !ref.current.contains(event.target) && callback()
    };

    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return ref;
};