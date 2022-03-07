import { Router } from "express";
import { getGames, getGame, postGame } from '../controllers/gameController.js';
import { validateGameSchema } from "../middleware/validateGameSchema.js";

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.get('/games/:id', getGame);
gamesRouter.post('/games', validateGameSchema, postGame);

export default gamesRouter;