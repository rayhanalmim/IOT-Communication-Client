import React from 'react';

interface ConnectedDevProps {
    connectedDevices: any; // Replace 'any' with the appropriate type if known
}

const ConnectedDev: React.FC<ConnectedDevProps> = ({ connectedDevices }) => {
    return (
        <div>
            <h2>helo</h2>
        </div>
    );
};

export default ConnectedDev;