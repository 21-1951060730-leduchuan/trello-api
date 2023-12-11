/* eslint-disable no-useless-catch */
/* eslint-disable no-console */
import { slugify } from "~/utils/formatters";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { columnModel } from "~/models/columnModel";
import { cardModel } from "~/models/cardModel";
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
    //tao ra 1 cai board moi de xu li  khong anh huong den board ban dau
    const resBoard = cloneDeep(board);
    //dua card ve dung column cua no
    resBoard.columns.forEach((column) => {
      // CACH 1 ham equals duoc mongodb support de hieu duoc objectId nen k can toString
      column.cards = resBoard.cards.filter((card) =>
        card.columnId.equals(column._id)
      );
      //CACH 2 vi _ID la kieu objectId cua mongo nen phai toString() de so sanh
      // column.cards = resBoard.cards.filter(
      //   (card) => card.columnId.toString() === column._id.toString()
      // );
    });
    delete resBoard.cards;
    return resBoard;
  } catch (error) {
    throw error;
  }
};
const update = async (reqParamsId, reqBody) => {
  try {
    const updateData = { ...reqBody, updatedAt: Date.now() };
    const updatedBoard = await boardModel.update(reqParamsId, updateData);
    return updatedBoard;
  } catch (error) {
    throw error;
  }
};

const moveCardToDifferentColumn = async (reqBody) => {
  try {
    //b1
    await columnModel.update(reqBody.prevColumnId, {
      cardOrderIds: reqBody.prevCardOrderIds,
      updatedAt: Date.now(),
    });
    //b2
    await columnModel.update(reqBody.nextColumnId, {
      cardOrderIds: reqBody.nextCardOrderIds,
      updatedAt: Date.now(),
    });
    //b3
    await cardModel.update(reqBody.currentCardId, {
      columnId: reqBody.nextColumnId,
      updatedAt: Date.now(),
    });
    return { updateResult: "Successfully" };
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
  getDetails,
  update,
  moveCardToDifferentColumn,
};
