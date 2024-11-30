"use client";
import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Define the backend Socket.IO server URL
const SOCKET_URL = 'http://localhost:5000'; // Replace with your backend URL

const Connect = () => {
  // State to hold device information
  const [deviceInfo, setDeviceInfo] = useState({
    name: '',
    macAddress: '', // Will be simulated
    ipAddress: '',  // To be fetched dynamically
    status: 'offline', // default status
  });

  // State to manage real-time connection status and messages
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]); // List of connected devices
  const [message, setMessage] = useState<string>(''); // Latest message received

  // Create a socket connection (to be managed with connect and disconnect logic)
  useEffect(() => {
    const socket = io(SOCKET_URL);

    // Listen for updates on connected devices
    socket.on('connected-devices', (devices: string[]) => {
      setConnectedDevices(devices);
    });

    // Listen for messages from other devices
    socket.on('new-message', (msg: string) => {
      setMessage(msg);
    });

    // Cleanup the socket connection when component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);

  // Fetch the device's public IP address
  const fetchIpAddress = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch (error) {
      console.error("Error fetching IP address:", error);
      return '';
    }
  };

  // Simulate MAC address (In reality, this would need to be handled server-side or through specific APIs)
  const simulateMacAddress = () => {
    return '00:14:22:01:23:45'; // Simulated MAC Address (This should be dynamic if possible)
  };

  // Handle device connection (Send device info to server)
  const handleConnect = async () => {
    if (!deviceInfo.name) {
      alert('Please provide a device name');
      return;
    }

    // Fetch IP address and simulate MAC address
    const ip = await fetchIpAddress();
    const mac = simulateMacAddress();

    setDeviceInfo({
      name: deviceInfo.name,
      macAddress: mac,
      ipAddress: ip,
      status: 'online', // Change device status to online once connected
    });

    // Send device info to server upon connection
    const socket = io(SOCKET_URL);
    socket.emit('device-connect', deviceInfo);
  };

  // Handle device disconnection
  const handleDisconnect = () => {
    setDeviceInfo({
      name: '',
      macAddress: '',
      ipAddress: '',
      status: 'offline',
    });

    // Emit disconnection event to the server
    const socket = io(SOCKET_URL);
    socket.emit('device-disconnect', deviceInfo);
    socket.disconnect();
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-6">Connect Your Device</h2>

      <div className="space-y-4">
        {/* Device Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700">Device Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={deviceInfo.name}
            onChange={(e) => setDeviceInfo({ ...deviceInfo, name: e.target.value })}
            placeholder="Enter device name"
            className="mt-2 w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Connect or Disconnect Button */}
        <div className="mt-4">
          {deviceInfo.status === 'offline' ? (
            <button
              onClick={handleConnect}
              className="w-full py-3 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Connect Device
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
      {deviceInfo.ipAddress && deviceInfo.macAddress && (
        <div className="mt-8">
          <p className="text-sm text-gray-600">IP Address: {deviceInfo.ipAddress}</p>
          <p className="text-sm text-gray-600">MAC Address: {deviceInfo.macAddress}</p>
        </div>
      )}

      {/* Connected Devices */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-800">Connected Devices:</h3>
        <ul className="mt-2 space-y-2">
          {connectedDevices.length > 0 ? (
            connectedDevices.map((device, index) => (
              <li key={index} className="text-sm text-gray-600">{device}</li>
            ))
          ) : (
            <li className="text-sm text-gray-500">No devices connected</li>
          )}
        </ul>
      </div>

      {/* Messages */}
      <div className="mt-8">
        <h3 className="text-xl font-medium text-gray-800">Messages:</h3>
        <p className="mt-2 text-sm text-gray-600">{message ? message : 'No new messages'}</p>
      </div>
    </div>
  );
};

export default Connect;
