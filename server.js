const express = require("express");
const studentRoutes = require('./src/student/routes.js');

const app = express();
const port = 3000;

// Post and get json from endpoints
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.use('/api/v1/students', studentRoutes);

app.listen(port, () => {
    console.log(`app listening on port ${port}`);
})