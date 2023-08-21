import TailwindProvider from "@/lib/TailwindProvider";
import { useEffect, useState } from "react";

export const useScreen = (tw:TailwindProvider) => {
  const [screen, setScreen] = useState<string>();

  useEffect(() => {
    const handleResize = () => {
      setScreen(tw.resolveScreen(window.innerWidth));
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [tw]);
  return screen;
}