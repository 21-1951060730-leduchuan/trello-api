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
const getDetails = async (req, res, next) => {
  try {
    const board = await boardService.getDetails(req.params.id);
    // co ket qua tra ve client
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const updatedBoard = await boardService.update(req.params.id, req.body);
    // co ket qua tra ve client
    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    next(error);
  }
};
export const boardController = {
  createNew,
  getDetails,
  update,
};
