/* eslint-disable no-console */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = { ...reqBody, slug: slugify(reqBody.title) };
    // phai co return trong service neu khong se khong co ket qua tra ve cho controller
    const createdBoard = await boardModel.createNew(newBoard);

    console.log(createdBoard);
    const getNewBoard = await boardModel.findOneById(createdBoard.insertedId);
    console.log(getNewBoard);
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};
const getDetails = async (reqParamsId) => {
  // eslint-disable-next-line no-useless-catch
  try {
    // console.log(reqParamsId);
    const board = await boardModel.getDetails(reqParamsId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board not found");
    }
    console.log(board);

    return board;
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
};
