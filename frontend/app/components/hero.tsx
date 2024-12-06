import { Button } from "@/components/ui/button";
import bulletbg from "@/public/bullet-bg02.png";
import React from "react";

const Hero = () => {
  return (
    <div
      className="bg-cover bg-center min-h-screen relative flex items-center justify-center"
      style={{ backgroundImage: `url(${bulletbg.src})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative max-w-3xl space-y-6 text-center text-white z-10">
        <h1 className="text-5xl font-extrabol leading-tight">
          Welcome to the Sui Staking Dapp
        </h1>
        <p className="text-lg md:text-xl">
          Stake your assets, earn rewards, and level up while enjoying a
          gamified experience. Join now and claim exclusive NFTs!
        </p>
        <div className="justify-center flex space-x-4">
          <Button className="text-lg">Get staking</Button>
          <Button className="text-lg">Learn more</Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
