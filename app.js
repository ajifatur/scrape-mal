import express from 'express';
import cors from 'cors';
import router from './routes/index.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(cors({
    origin: '*'
}));

app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});