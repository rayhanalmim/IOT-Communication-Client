"use client";

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { ethers } from "ethers";
import Web3Modal from "web3modal";
import { EthereumProvider } from "@walletconnect/ethereum-provider";

// Configuration for Web3Modal and Socket.IO
const SOCKET_URL = "http://localhost:5000";
const NODE_API_URL = "http://localhost:5000/getMacAddress";

const Connect = ({
  onWalletConnect,
}: {
  onWalletConnect: (provider: ethers.providers.Web3Provider | null) => void;
}) => {
  const [deviceInfo, setDeviceInfo] = useState({
    name: "",
    macAddress: "",
    ipAddress: "",
    status: "offline",
    walletAddress: "",
  });

  const [connectedDevices, setConnectedDevices] = useState<string[]>([]);
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Socket.IO connection and event handling
  useEffect(() => {
    const socket = io(SOCKET_URL);

    socket.on("connected-devices", (devices: string[]) => {
      setConnectedDevices(devices);
    });

    socket.on("new-message", (msg: string) => {
      setMessage(msg);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetching IP address
  const fetchIpAddress = async () => {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return "";
    }
  };

  // Fetching MAC address
  const fetchMacAddress = async () => {
    try {
      const response = await fetch(NODE_API_URL);
      const data = await response.json();
      return data.macAddress || "Unavailable";
    } catch (error) {
      console.log("Error fetching MAC address:", error);
      return "Unavailable";
    }
  };

  const connectWallet = async () => {
    try {
      setLoading(true);

      // WalletConnect provider setup
      const providerOptions = {
        walletconnect: {
          package: EthereumProvider,
          options: {
            projectId: "YOUR_WALLETCONNECT_PROJECT_ID",
            rpc: {
              43113: "https://api.avax-test.network/ext/bc/C/rpc",
            },
          },
        },
      };

      const web3Modal = new Web3Modal({
        cacheProvider: true,
        providerOptions,
      });

      // Connect to wallet
      const instance = await web3Modal.connect();
      const provider = new ethers.providers.Web3Provider(instance);
      const signer = provider.getSigner();
      const walletAddress = await signer.getAddress();

      // Fetch device info (IP & MAC address)
      const ip = await fetchIpAddress();
      const mac = await fetchMacAddress();

      setDeviceInfo({
        ...deviceInfo,
        walletAddress,
        ipAddress: ip,
        macAddress: mac,
        status: "online",
      });

      // Emit device connection via socket
      const socket = io(SOCKET_URL);
      socket.emit("device-connect", {
        name: deviceInfo.name,
        walletAddress,
        ipAddress: ip,
        macAddress: mac,
        status: "online",
      });
    } catch (error) {
      console.error("Error connecting wallet:", error);
    } finally {
      setLoading(false);
    }
  };

  // Disconnect device
  const handleDisconnect = () => {
    const socket = io(SOCKET_URL);

    socket.emit("device-disconnect", deviceInfo);

    setDeviceInfo({
      name: "",
      macAddress: "",
      ipAddress: "",
      walletAddress: "",
      status: "offline",
    });

    socket.disconnect();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">

      {deviceInfo.walletAddress ? (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Your device is connected
        </h2>
      ) : (
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Connect Your Device
        </h2>
      )}

      <div className="space-y-4">
        {/* Device Name */}
        {deviceInfo.walletAddress || (
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Device Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={deviceInfo.name}
              onChange={(e) =>
                setDeviceInfo({ ...deviceInfo, name: e.target.value })
              }
              placeholder="Enter device name"
              className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}

        {/* Connect or Disconnect Button */}
        <div className="mt-4">
          {deviceInfo.status === "offline" ? (
            <button
              onClick={connectWallet}
              disabled={loading}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {loading ? "Connecting..." : "Connect Device"}
            </button>
          ) : (
            <button
              onClick={handleDisconnect}
              className="w-full py-3 px-4 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Disconnect Device
            </button>
          )}
        </div>
      </div>

      {/* Display Device Info */}
      {deviceInfo.walletAddress && (
        <div className="mt-8">
          <p className="text-sm text-gray-600">
            Wallet Address: {deviceInfo.name}
          </p>
          <p className="text-sm text-gray-600">
            Wallet Address: {deviceInfo.walletAddress}
          </p>
          <p className="text-sm text-gray-600">
            IP Address: {deviceInfo.ipAddress}
          </p>
          <p className="text-sm text-gray-600">
            MAC Address: {deviceInfo.macAddress}
          </p>
        </div>
      )}

      {/* Connected Devices */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-800">
          Connected Devices:
        </h3>
        <ul className="mt-2 space-y-2">
          {connectedDevices.length > 0 ? (
            connectedDevices.map((device, index) => (
              <li key={index} className="text-sm text-gray-600">
                {device}
              </li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No devices connected</li>
          )}
        </ul>
      </div>

      {/* Messages */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-800">Messages:</h3>
        <p className="mt-2 text-sm text-gray-600">
          {message ? message : "No new messages"}
        </p>
      </div>
    </div>
  );
};

export default Connect;
