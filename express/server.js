require('dotenv').config(); // Load .env file

const mongoose = require('mongoose');

mongoose.set('bufferCommands', false); // optional safety
mongoose.set('strictQuery', true); // future-proofing

// Force IPv4 if there's DNS issues (like on some Mac networks)
process.env.NODE_OPTIONS = '--dns-result-order=ipv4first';


const connectWithRetry = () => {
    mongoose.connect(process.env.MONGO_URI)
        .then(() => {
            console.log('✅ MongoDB Connected');

            // ✅ TEST CODE – create and save a dummy document
            const TestSchema = new mongoose.Schema({ message: String });
            const TestModel = mongoose.model('Test', TestSchema);

            return TestModel.create({ message: 'Hello MongoDB!' });
        })
        .catch(err => {
            console.error('❌ Initial connection error. Retrying in 5s:', err.message);
            setTimeout(connectWithRetry, 5000);
        });
};

connectWithRetry();

const express = require('express');
const app = express();
const PORT = 5000;

// Middleware to parse JSON from requests
app.use(express.json());

// Fake "database"
let projects = [
    { id: 1, title: 'React Portfolio', description: 'My personal site built with React' },
    { id: 2, title: 'Express API', description: 'A small API built with Express.js' }
];

// GET all projects
app.get('/api/projects', (req, res) => {
    res.json(projects);
});

// POST a new project
app.post('/api/projects', (req, res) => {
    const { title, description } = req.body;
    const newProject = {
        id: projects.length + 1,
        title,
        description
    };
    projects.push(newProject);
    res.status(201).json(newProject);
});

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Express server running at http://localhost:${PORT}`);
});
