/* eslint-disable no-console */

import { cardModel } from "~/models/cardModel";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newCard = { ...reqBody };
    // phai co return trong service neu khong se khong co ket qua tra ve cho controller
    const createdCard = await cardModel.createNew(newCard);

    console.log(createdCard);
    const getNewCard = await cardModel.findOneById(createdCard.insertedId);
    console.log(getNewCard);
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
