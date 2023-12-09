import Joi from "joi";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";
import { BOARD_TYPES } from "~/utils/constants";
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from "~/utils/validators";
const createNew = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(100).trim().strict(),
    description: Joi.string().required().min(3).max(255).trim().strict(),
    type: Joi.string()
      .valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE)
      .required(),
  });
  try {
    await correctCondition.validateAsync(req.body, { abortEarly: false });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};
const update = async (req, res, next) => {
  const correctCondition = Joi.object({
    title: Joi.string().min(3).max(100).trim().strict(),
    description: Joi.string().min(3).max(255).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE),
    columnOrderIds:Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE))
  });
  try {
    // doi voi update cho phep unknow de k day 1 so field len
    await correctCondition.validateAsync(req.body, {
      abortEarly: false,
      allowUnknown: true,
    });

    next();
  } catch (error) {
    next(
      new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message)
    );
  }
};
export const boardValidation = {
  createNew,
  update,
};
