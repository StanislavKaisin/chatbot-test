import { Request } from "express";

export const queryBuilder = (
  req: Request
): { queryString: string; queryArr: string[] } => {
  let queryArr = [];
  queryArr = Object.values(req.query);
  let queryString = "";
  if (queryArr.length === 1) {
    queryString = `SELECT * from teachers WHERE ${
      Object.keys(req.query)[0]
    } = ?`;
  }
  if (queryArr.length > 1) {
    queryArr.forEach((value: string, index: number) => {
      console.log(`value= ${value}`);
      if (index === 0)
        queryString = `SELECT * from teachers WHERE ${
          Object.keys(req.query)[0]
        } = ?`;
      if (index > 0)
        queryString = queryString + ` AND ${Object.keys(req.query)[index]} = ?`;
    });
  }

  return { queryString, queryArr };
};
