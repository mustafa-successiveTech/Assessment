import express from 'express';

const app = express();

app.get('/', (req, res) => {
    res.send("Hello Typescript");
});

app.listen(3000, () => console.log('Server running on PORT 3000'));