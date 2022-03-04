import { Router } from "express";
import { getGames, postGame } from '../controllers/gameController.js';
import { validateGameSchema } from "../middleware/validateGameSchema.js";

const gamesRouter = Router();

gamesRouter.get('/games', getGames);
gamesRouter.post('/games', validateGameSchema, postGame);

export default gamesRouter;