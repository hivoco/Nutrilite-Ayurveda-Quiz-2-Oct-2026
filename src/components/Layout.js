import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Layout = ({ children, className = "", bgImage = "/bg/bg.png", topImage, bottomImage }) => {
  // const top = topImage || bottomImage;
  // const bottom = bottomImage || topImage;

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
      {/* {top && (
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
      )} */}

      {children}

      {/* {bottom && (
        <Image
          className={`absolute w-full h-auto -bottom-4 left-0 -z-10 transition-opacity duration-1000 ease-in-out ${
            visible ? "opacity-100" : "opacity-0"
          }`}
          src={bottom}
          width={375}
          height={36}
          alt="bottom-image"
          priority={true}
        />
      )} */}

      {router.pathname === "/" && (
        <Image
          className={`absolute  w-auto  left-1/2 -translate-x-1/2 bottom-10 z-0
        transition-all duration-1000 ease-in-out ${
            visible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
          src={"/logos/hivoco-color-logo-black-text.png"}
          width={100}
          height={20}
          alt="hivoco company logo"
          priority={true}
        />
      )}
      
    </div>
  );
};

export default Layout;
