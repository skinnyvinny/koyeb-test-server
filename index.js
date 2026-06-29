const express = require('express');
const app = express();

// Set the production port dynamically
const PORT = process.env.PORT || 8000;

// Volatile memory arrays to store data and commands
let latestData = [];
let currentCommand = { command: "STAY_IDLE", timestamp: new Date() };

// Middleware to parse standard JSON body payloads
app.use(express.json());

// 1. Root Diagnostic Endpoint
app.get('/', (req, res) => {
    res.send('🚀 Sample Server is running perfectly!');
});

// 2. HTTP GET Parameter Parsing Endpoint (Simulated DNS Payload Ingestion)
app.get('/dns', (req, res) => {  
    // Default to a placeholder Base64 string if no query parameter is supplied
    const query = req.query.q || "ZXhhbXBsZS5jb20=";  
    
    try {
        // Decode the incoming string from Base64 back to a standard UTF-8 string
        const decodedData = Buffer.from(query, 'base64').toString('utf-8');  
        console.log("Decoded String Received:", decodedData);  
        
        // Save the decoded text string into the system data array
        latestData.push({ data: decodedData, receivedAt: new Date() });  
        
        res.status(200).json({ status: "success", message: "Data processed successfully" });  
    } catch (error) {
        // Handle malformed Base64 strings gracefully
        res.status(400).json({ status: "error", message: "Invalid data format" });
    }
});  

// 3. HTTP POST Standard Body Ingestion Endpoint
app.post('/data', (req, res) => {
    const receivedData = req.body;
    console.log("Standard Data Ingested:", receivedData);
    latestData.push({ ...receivedData, receivedAt: new Date() });
    
    res.status(200).json({ status: "success", message: "Data received" });
});

// 4. Command Retrieval Endpoint (For client check-ins)
app.get('/commands', (req, res) => { 
    res.json(currentCommand); 
});

// 5. Remote Administrative Command State Modifier
app.get('/set-command', (req, res) => {
    const newCmd = req.query.cmd || "STAY_IDLE";
    currentCommand = { command: newCmd, timestamp: new Date() };
    res.send(`Command successfully updated to: ${newCmd}`);
});

// Start network service
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is blasting off on port ${PORT}`);
});

