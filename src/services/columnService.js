/* eslint-disable no-console */

import { columnModel } from "~/models/columnModel";
import { boardModel } from "~/models/boardModel";
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
      await boardModel.pushColumnOrderIds(getNewColumn)
    }
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
};
