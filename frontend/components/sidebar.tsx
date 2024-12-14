import React from "react";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./ui/command";
import { Calendar, Smile, Calculator, User, Settings } from "lucide-react";
import sidebar from "@/public/sidebarbg.jpg";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="hidden md:block h-[100vh]">
      <Command
        className="w-px shadow-md md:min-w-[250px] bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${sidebar.src})` }}
      >
        <CommandList>
          <CommandGroup className="text-white text-2xl" heading="Dashboard">
            <CommandItem>
              <Calendar className="mr-2 h-4 w-4" />
              <Link href="/staking">Stake</Link>
            </CommandItem>
            <CommandItem>
              <Smile className="mr-2 h-4 w-4" />
              <Link href="/history">Transaction history</Link>
            </CommandItem>
            <CommandItem>
              <Calculator className="mr-2 h-4 w-4" />
              <Link href="/stats">View stats</Link>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup className="text-white" heading="Settings">
            <CommandItem>
              <User className="mr-2 h-4 w-4" />
              <Link href="/profile">Profile</Link>
            </CommandItem>
            <CommandItem>
              <Settings className="mr-2 h-4 w-4" />
              <Link href="/settings">Settings</Link>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    </div>
  );
};

export default Sidebar;
