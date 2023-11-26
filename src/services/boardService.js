/* eslint-disable no-console */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
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
export const boardService = {
  createNew,
};
