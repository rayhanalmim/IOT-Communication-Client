"use client"
import Connect from "@/components/page/connect";
import Image from "next/image";
import { ethers } from "ethers";
import { useState } from "react";

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
      <h1>Home</h1>
      <Connect onWalletConnect={handleWalletConnect}></Connect>
    </div>
  );
}
