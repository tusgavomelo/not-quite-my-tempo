import { createContext, useEffect, useState } from "react";

export const MetronomeContext = createContext<any>({});

export const MetronomeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const INITIAL_BPM = 120;
  const INITIAL_DIVS = 4;
  const INITIAL_SUBDIVS = 1;
  const INITIAL_DIV_COUNTER = 1;
  const INITIAL_SUBDIV_COUNTER = 0;

  let divCounter = INITIAL_DIV_COUNTER;
  let subdivCounter = INITIAL_SUBDIV_COUNTER;

  const [bpm, setBpm] = useState(INITIAL_BPM);
  const [divs, setDivs] = useState(INITIAL_DIVS);
  const [subdivs, setSubdivs] = useState(INITIAL_SUBDIVS);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [activeDiv, setActiveDiv] = useState<number | null>(null);
  const [activeSubdiv, setActiveSubdiv] = useState<number | null>(null);

  useEffect(() => {
    if (intervalId) {
      stopInterval();
      startInterval();
    }
  }, [bpm, divs, subdivs]);

  const clickMetronome = () => {
    const subdivStep = subdivCounter % subdivs;
    if (subdivStep > 0) {
      // this is a subdivision
      setActiveSubdiv(subdivStep);
      console.log("& ", subdivStep);
    } else {
      setActiveDiv(divCounter);
      if (divCounter > 1) {
        // this is a division, but not the first
        console.log("click!", divCounter);
        if (divCounter === divs) {
          // this is the last division, reset divCounter
          divCounter = 0;
        }
      } else {
        // this is the first division
        console.log("ding!", divCounter);
      }
      // divCounter increments when a division is detected
      divCounter++;
    }
    // subdivCounter increments either way
    subdivCounter++;
  };

  const startInterval = () => {
    clickMetronome();
    const id = setInterval(clickMetronome, (60 / bpm / subdivs) * 1000);
    setIntervalId(id);
  };

  const stopInterval = () => {
    clearInterval(intervalId);
    setIntervalId(null);
    subdivCounter = 0;
    divCounter = 1;
    setActiveDiv(null);
    setActiveSubdiv(null);
  };

  const reset = () => {
    stopInterval();
    setBpm(INITIAL_BPM);
    setDivs(INITIAL_DIVS);
    setSubdivs(INITIAL_SUBDIVS);
  };

  const value = {
    bpm,
    divs,
    subdivs,
    intervalId,
    activeDiv,
    activeSubdiv,
    setBpm,
    setDivs,
    setSubdivs,
    startInterval,
    stopInterval,
    reset,
  };

  return (
    <MetronomeContext.Provider value={value}>
      {children}
    </MetronomeContext.Provider>
  );
};
