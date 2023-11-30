/* eslint-disable no-console */

import { columnModel } from "~/models/columnModel";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newColumn = { ...reqBody };
    // phai co return trong service neu khong se khong co ket qua tra ve cho controller
    const createdColumn = await columnModel.createNew(newColumn);

    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId);

    return getNewColumn;
  } catch (error) {
    throw error;
  }
};

export const columnService = {
  createNew,
};
