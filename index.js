const express = require('express');
const PORT = process.env.PORT || 3001;

const app = express();

app.get('/', (req, res) => {
    res.send({ message: "the server is listening" });
})

app.listen(PORT, () => console.log(`The server is listening on port ${PORT}`));