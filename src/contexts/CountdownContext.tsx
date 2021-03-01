import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { ChallengesContext } from "./ChallengesContext";


interface CountdownContextData {
    minutes: number;
    seconds: number;
    haveFinished: boolean;
    isactive:boolean;
    startCountdown:() => void;
    resetCountdown:() => void;
}


interface CountdownProviderProps {
    children: ReactNode;
}

export const CountdownContext = createContext({} as CountdownContextData) 

let countdownTimeout: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps){

    const { startNewChallenge } = useContext(ChallengesContext);

    const [time, setTime] = useState(30 * 60);
    const [isactive, setisActive] = useState(false);
    const [haveFinished, setHaveFinished] = useState(false);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown(){
        setisActive(true);
       }
   
       function resetCountdown(){
         clearTimeout(countdownTimeout);
         setisActive(false);
         setTime(30 * 60);
         setHaveFinished(false);
       }
   
       useEffect(() => {
         if (isactive && time > 0){
           countdownTimeout = setTimeout(() => {
             setTime(time -1);
           }, 1000);
         } else if (isactive && time == 0){
           setHaveFinished(true);
           setisActive(false);
           startNewChallenge();
         }
       }, [isactive, time])
   


    return(
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            haveFinished,
            isactive,
            startCountdown,
            resetCountdown,
        }}>
            
            {children}
        </CountdownContext.Provider>
    )
}