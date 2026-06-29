const express = require('express');
const app = express();

// Use Koyeb's dynamic port, or fallback to 8000 locally
const PORT = process.env.PORT || 8000;

// Temporary memory to hold our data and commands
let latestData = [];
let currentCommand = { command: "STAY_IDLE", timestamp: new Date() };

// Middleware to parse incoming JSON data
app.use(express.json());

// 1. Home route just to check if the server is alive
app.get('/', (req, res) => {
    res.send('🚀 Sample Server is running perfectly on Koyeb!');
});

// 2. Endpoint to RECEIVE data from your devices
app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log("Received Data:", receivedData);
    latestData.push({ ...receivedData, receivedAt: new Date() });
    
    res.status(200).json({ status: "success", message: "Data received" });
});

// 3. Endpoint to FETCH the current command
app.get('/commands', (req, res) => {
    res.json(currentCommand);
});

// 4. Endpoint to SET a new command (you can hit this via browser/Postman)
app.get('/set-command', (req, res) => {
    const newCmd = req.query.cmd || "STAY_IDLE";
    currentCommand = { command: newCmd, timestamp: new Date() };
    res.send(`Command updated to: ${newCmd}`);
});

// Start the server binding to 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is blasting off on port ${PORT}`);
});

