import express from 'express';

const PORT = 5000;

const app = express();

app.use(express.json());

/**
 * post
 */
// app.post('/', (req, res) => {
//     console.log(req.body);
//     res.status(200).json('Hello server!!!');
// });

/**
 * get
 */
app.get('/', (req, res) => {
    console.log(req.query.test);
    res.send('Hello');
});

app.listen(PORT, () => console.log('SERVER STARTED ON PORT: ' + PORT));
