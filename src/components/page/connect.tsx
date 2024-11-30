import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

// Define the backend Socket.IO server URL
const SOCKET_URL = 'http://localhost:5000'; // Replace with your backend URL

const Connect = () => {
  // State to hold device information
  const [deviceInfo, setDeviceInfo] = useState({
    name: '',
    macAddress: '',
    ipAddress: '',
    status: 'offline', // default status
  });

  // State to manage real-time connection status and messages
  const [connectedDevices, setConnectedDevices] = useState<string[]>([]); // List of connected devices
  const [message, setMessage] = useState<string>(''); // Latest message received

  // Create a socket connection
  useEffect(() => {
    const socket = io(SOCKET_URL);

    // Send device info to server upon connection
    socket.emit('device-connect', deviceInfo);

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
  }, [deviceInfo]);

  // Handle input changes for device information
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDeviceInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle device connection (Send device info to server)
  const handleConnect = () => {
    if (!deviceInfo.name || !deviceInfo.macAddress || !deviceInfo.ipAddress) {
      alert('Please fill in all fields');
      return;
    }

    // Simulate device information for now (can be retrieved from device APIs in real scenarios)
    setDeviceInfo({
      ...deviceInfo,
      status: 'online', // Change device status to online once connected
    });
  };

  return (
    <div>
      <h2>Connect Your Device</h2>
      
      <div>
        <label>Device Name:</label>
        <input
          type="text"
          name="name"
          value={deviceInfo.name}
          onChange={handleChange}
          placeholder="Enter device name"
        />
      </div>
      
      <div>
        <label>MAC Address:</label>
        <input
          type="text"
          name="macAddress"
          value={deviceInfo.macAddress}
          onChange={handleChange}
          placeholder="Enter MAC address"
        />
      </div>
      
      <div>
        <label>IP Address:</label>
        <input
          type="text"
          name="ipAddress"
          value={deviceInfo.ipAddress}
          onChange={handleChange}
          placeholder="Enter IP address"
        />
      </div>

      <button onClick={handleConnect}>Connect Device</button>

      <h3>Connected Devices:</h3>
      <ul>
        {connectedDevices.length > 0 ? (
          connectedDevices.map((device, index) => (
            <li key={index}>{device}</li>
          ))
        ) : (
          <li>No devices connected</li>
        )}
      </ul>

      <h3>Messages:</h3>
      <p>{message ? message : 'No new messages'}</p>
    </div>
  );
};

export default Connect;
