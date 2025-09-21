import { useState, useEffect, useRef } from "react";
import Step from "../../shared/components/Step/Step";
import P from "../../shared/components/P/P";
import useTranslation from "../../../Shared/hooks/useTranslation";

import "./FirstStep.css";

export default function FirstStep() {
  const { translation } = useTranslation();

  // Textos para rotar
  // const texts = [
  //   translation.Landing.text5,
  //   translation.Landing.text51,
  // ];

  // const [currentTextIndex, setCurrentTextIndex] = useState(0); 
  // const [visible, setVisible] = useState(true); 
  // const intervalRef = useRef<NodeJS.Timeout | null>(null); 

  
  // const handleTextChange = () => {
  //   setVisible(false); 

  //   setTimeout(() => {
  //     setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length); 
  //     setVisible(true); 
  //   }, 500);
  // };

  // useEffect(() => {
  //   intervalRef.current = setInterval(handleTextChange, 7000);

  //   return () => {
  //     if (intervalRef.current) {
  //       clearInterval(intervalRef.current);
  //     }
  //   };
  // }, []); 

  return (
    <Step>
      <div className="flex flex-col ">
      <P bold>{translation.Landing.subTitle1}</P><br/>
      <p></p>
      {/* <P className={visible ? "fade-in" : "fade-out"}>{texts[currentTextIndex]}</P> */}
    <P>{translation.Landing.text5}</P><br/>
    <P>{translation.Landing.text51}</P>
    
      </div>
    </Step>
  );
}
