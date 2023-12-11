/* eslint-disable no-useless-catch */
/* eslint-disable no-console */

import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColumn = { ...reqBody };
    // phai co return trong service neu khong se khong co ket qua tra ve cho controller
    const createdColumn = await columnModel.createNew(newColumn);

    const getNewColumn = await columnModel.findOneById(
      createdColumn.insertedId
    );
    if (getNewColumn) {
      getNewColumn.cards = [];
      //cap nhat columnOderIds
      await boardModel.pushColumnOrderIds(getNewColumn);
    }
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};
const update = async (columnId, reqBody) => {
  try {
    const updateData = { ...reqBody, updatedAt: Date.now() };
    const updatedColumn = await columnModel.update(columnId, updateData);
    return updatedColumn;
  } catch (error) {
    throw error;
  }
};
const deleteItem = async (reqParamsId) => {
  try {
    const targetColumn = await columnModel.findOneById(reqParamsId);
    if (!targetColumn) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Column not found");
    }
    await columnModel.deleteOneById(reqParamsId);
    await cardModel.deleteManyByColumnId(reqParamsId);
    await boardModel.pullColumnOrderIds(targetColumn);
    return { deleteResult: "Column deleted successfully" };
  } catch (error) {
    throw error;
  }
};
export const columnService = {
  createNew,
  update,
  deleteItem,
};
