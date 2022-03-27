import express from 'express';
import {Endpoints, Top, People, Characters, Companies} from '../controllers/index.js';

const router = express.Router();

router.get('/', Endpoints);
router.get('/top/:category/:type', Top);
router.get('/people', People);
router.get('/characters', Characters);
router.get('/companies', Companies);

router.use((req, res, next) => {
    res.status(404).send("Route is not found!");
});

export default router;