import { StatusCodes } from "http-status-codes";
import { columnService } from "~/services/columnService";
const createNew = async (req, res, next) => {
  try {
    //dieu huong qua service
    const createdColumn = await columnService.createNew(req.body);
    // co ket qua tra ve client
    res.status(StatusCodes.CREATED).json(createdColumn);
  } catch (error) {
    next(error);
  }
};
const update = async (req, res, next) => {
  try {
    const columnId = req.params.id
    const updatedColumn = await columnService.update(columnId, req.body);
    // co ket qua tra ve client
    res.status(StatusCodes.OK).json(updatedColumn);
  } catch (error) {
    next(error);
  }
};
const deleteItem = async (req, res, next) => {
  try {
    const result = await columnService.deleteItem(req.params.id);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};
export const columnController = {
  createNew,
  update,
  deleteItem
};
