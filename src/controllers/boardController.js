import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
const createNew = async (req, res, next) => {
  try {
    //dieu huong qua service
    const createBoard = await boardService.createNew(req.body);
    // co ket qua tra ve client
    res.status(StatusCodes.CREATED).json(createBoard);
  } catch (error) {
    next(error);
  }
};
export const boardController = {
  createNew,
};
