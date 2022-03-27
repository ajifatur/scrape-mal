import express from 'express';
import router from './routes/index.js';

const app = express();
const port = process.env.PORT || 8080;

app.use(router);

app.listen(port, () => {
    console.log(`App listening on port ${port}...`);
});