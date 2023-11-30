import { StatusCodes } from "http-status-codes";
import { cardService } from "~/services/cardService";
const createNew = async (req, res, next) => {
  try {
    //dieu huong qua service
    const createCard = await cardService.createNew(req.body);
    // co ket qua tra ve client
    res.status(StatusCodes.CREATED).json(createCard);
  } catch (error) {
    next(error);
  }
};

export const cardController = {
  createNew,

};
