import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  // eslint-disable-next-line no-useless-catch
  try {
    const newBoard = { ...reqBody, slug:slugify(reqBody.title) };
    // phai co return trong service neu khong se khong co ket qua tra ve cho controller 
    return newBoard
  } catch (error) {
    throw error;
  }
};
export const boardService = {
  createNew,
};