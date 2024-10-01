import React from "react";
import { images } from "./constants";
import { motion } from "framer-motion";
import Image from "next/image";

type Props = {
  activeImage: any;
  clickNext: any;
  clickPrev: any;
};

const Description = ({ activeImage, clickNext, clickPrev }: Props) => {
  return (
    <div className="gap-y-1 overflow-hidden text-xl leading-6 ">
      
      {images.map((elem, idx) => (
        <div
          key={idx}
          className={`${
            idx === activeImage
              ? " w-full h-full  text-left"
              : "hidden"
          }`}
        >
          <motion.div
            initial={{
              opacity: idx === activeImage ? 0 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            animate={{
              opacity: idx === activeImage ? 1 : 0.5,
              scale: idx === activeImage ? 1 : 0.3,
            }}
            transition={{
              ease: "linear",
              duration: 2,
              x: { duration: 1 },
            }}
            className=""
          >
            <div className="py-16 text-5xl font-extrabold text-white">{elem.title}</div>
            <div className="leading-relaxed font-bold text-l tracking-wide italic text-white">
              {" "}
              {elem.desc}
            </div>
          </motion.div>

          
          <div className="absolute md:bottom-1 bottom-10 right-10 md:right-0 w-full flex justify-center items-center">
            <div
              className="absolute bottom-2 right-10 cursor-pointer"
              onClick={clickPrev}
            >
              
            </div>

            <div
              className="absolute bottom-2 right-2 cursor-pointer"
              onClick={clickNext}
            >
              <Image src="/rights.svg"
              width="20"
              height="10"
               alt="" />
            </div>
          </div>
        </div>
      ))}
    </div>
    
  );
};

export default Description;