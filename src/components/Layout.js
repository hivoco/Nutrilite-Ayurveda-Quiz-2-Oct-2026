import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = ({ children, className = "", bgImage = "/bg/bg.png", topImage, bottomImage }) => {
  const top = topImage;
  const bottom = bottomImage;

  const router = useRouter();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      style={{ backgroundImage: bgImage ? `url(${bgImage})` : "" }}
      className={`h-svh w-full bg-no-repeat bg-cover bg-center overflow-hidden relative isolate ${className}`}
    >
      {top && (
        <Image
          className={`absolute w-full h-auto left-0 -z-10 -top-4 transition-opacity duration-1000 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          src={top}
          width={375}
          height={36}
          alt="top-image"
          priority={true}
        />
      )}

      {children}

      {bottom && (
        <Image
          className={`absolute w-full h-auto max-h-[100px] object-cover object-bottom bottom-0 left-0 -z-10 transition-opacity duration-1000 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          src={bottom}
          width={375}
          height={36}
          alt="bottom-image"
          priority={true}
        />
      )}

      {router.pathname === "/" && (
        <Image
          className={`absolute  h-6 w-auto  left-1/2 -translate-x-1/2 z-0 ${
            bottom ? "bottom-[calc(min(13.4vw,100px)_+_10px)]" : "bottom-10"
          }
        transition-all duration-1000 ease-in-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          src={
            bgImage === "/bg/bg-2.jpg"
              ? "/logos/hivoco-color-logo-black-text.png"
              : "/logos/hivoco-white-text.png"
          }
          width={133}
          height={24}
          alt="hivoco company logo"
          priority={true}
        />
      )}
      
    </div>
  );
};

export default Layout;
