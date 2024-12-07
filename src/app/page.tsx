"use client";
import Image from "next/image";
import { ethers } from "ethers";
import { useState } from "react";
import ConnectUser from "@/components/page/ConnectUser";
import ConnectedDev from "@/components/page/ConnectedDev";

export default function Home() {
  const [provider, setProvider] =
    useState<ethers.providers.Web3Provider | null>(null);

  const handleWalletConnect = (
    connectedProvider: ethers.providers.Web3Provider | null
  ) => {
    setProvider(connectedProvider);
  };

  return (
    <div>
      <div className="pt-4">
        {provider ? (
          <ConnectUser onWalletConnect={handleWalletConnect}></ConnectUser>
        ) : (
          <div className="grid grid-cols-2">
            <ConnectUser onWalletConnect={handleWalletConnect}></ConnectUser>
            <ConnectedDev connectedDevices={["1", "2", "3"]}></ConnectedDev>
          </div>
        )}
      </div>
    </div>
  );
}
