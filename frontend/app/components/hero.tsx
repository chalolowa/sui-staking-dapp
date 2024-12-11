import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import bulletbg from "@/public/bullet-bg02.png";
import { AuthService } from "@/utils/authService";
import Link from "next/link";
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
          <Popover>
            <PopoverTrigger asChild>
              <Button className="text-lg">Get staking</Button>
            </PopoverTrigger>
            <PopoverContent className="p-4 bg-transparent rounded-lg shadow-lg">
              <div className="space-y-4">
                <div>
                  <Button
                    className="w-full bg-blue-500 font-bold text-lg hover:bg-blue-800"
                    //onClick={() => AuthService.loginWithProvider("google")}
                  >
                    Sign in with Google
                  </Button>
                </div>
                <div>
                  <Button
                    className="w-full bg-green-500 font-bold text-lg hover:bg-green-800"
                    //onClick={() => AuthService.loginWithProvider("microsoft")}
                  >
                    Sign in with Microsoft
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button className="text-lg">
            <Link href="/whitelist">Learn more</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
