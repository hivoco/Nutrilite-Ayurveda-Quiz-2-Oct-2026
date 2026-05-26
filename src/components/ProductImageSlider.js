import Image from "next/image";
import { useEffect, useState } from "react";

const images = [
  {
    src: "/images/products/daily-plus-multi-vitamin.png",
    alt: "amway nutrilite daily plus multi vitamin",
  },
  { src: "/images/products/plant-protein.png", alt: "amway nutrilite plant protein" },
];

const ProductImageSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid h-full place-items-center">
      {images.map((img, i) => (
        <Image
          key={img.src}
          style={{ gridArea: "1 / 1" }}
          className={`relative w-[200px] tall:w-[250px]  transition-opacity duration-700 ease-in-out ${
            activeIndex === i ? "opacity-100" : "opacity-0"
          }`}
          alt={img.alt}
          width={220}
          height={150}
          src={img.src}
          priority={true}
          quality={100}
        />
      ))}
    </div>
  );
};

export default ProductImageSlider;
