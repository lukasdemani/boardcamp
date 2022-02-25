import { Router } from "express";

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateGameSchema, postGames);

export default gamesRouter;