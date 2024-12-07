"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { images } from "./constants";
import Description from "./Description";

const Slider = () => {
  const [activeImage, setActiveImage] = useState(0);

  const clickNext = () => {
    activeImage === images.length - 1
      ? setActiveImage(0)
      : setActiveImage(activeImage + 1);
  };
  const clickPrev = () => {
    activeImage === 0
      ? setActiveImage(images.length - 1)
      : setActiveImage(activeImage - 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clickNext();
    }, 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [activeImage]);
  return (
    <main >
      <div className="">
        {images.map((elem, idx) => (
          <div
            key={idx}
            className={`${
              idx === activeImage
                ? "relative isolate flex flex-col bg-center justify-center overflow-hidden h-[520px] z-1"
                : "hidden"
            }`}
          >
            
            <Image
              src={elem.src}
              alt=""
              width={400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover "
            />

            <Description

          />
          </div>
        ))}
      </div>
      
    </main>
  );
};

export default Slider;