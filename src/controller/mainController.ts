import mobile from "../model/mobile";

import cloths from "../model/cloth";
import cotegories from "../model/cotegories";

import { Request, Response } from "express";

import sequelize from "../../db";
import { Model } from "sequelize";
import { Mobiles } from "../..";

import { Op } from "sequelize";

/***
 * -----------------------
 * ADD NEW ITEMS TO CART
 *
 * @param      incomigrequest
 * @returns   returns the response in json
 *
 * --------------------------
 */

const addNewItem = async (req: Request, res: Response) => {
  try {
    const resp = await cotegories.bulkCreate(req.body, {
      include: [
        {
          model: mobile,
        },
        {
          model: cloths,
        },
      ],
    });
    res.send(resp);
    //print on console
    console.log(resp);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

/***
 *
 * FIND RECORDS
 * --------------------------------------------------
 * SUPPOSE IF REQUEST BODY CONTAINIG FILTER PARAMETER
 * THEN ON BASIS OF THIS IT FETCH
 *
 * EXAMPLE  IF ID THEN PASS ID IN REQ.BODY
 * THEN IT FETCH ID BASED PARTICULAR RECORDS
 * ELSE
 * THIS METHOD WILL FETCH WHOLE RECORDS
 *
 * ---------------------------------------------------
 *
 * */

const findOneOrManyRecords = async (req: Request, res: Response) => {
  try {
    let resp;
    req.body = req.body ? req.body : "";
    console.log(req.body.id);

    //on basis of condition fetching records or else it's find whole records
    if (req.body.id) {
      resp = await cotegories.findAll({
        where: {
          id: req.body.id,
        }, // fetch mapped details associated with category  id

        include: [
          {
            model: cloths,
          },
          {
            model: Mobiles,
          },
        ],
      });
    } else {
      resp = await cotegories.findAll({
        include: [{ model: mobile }, { model: cloths }],
      });
    }

    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);

    res.send(error);
  }
};

/***
 *
 * DELETE RECORDS
 * --------------------------------------------------
 * SUPPOSE IF REQUEST BODY CONTAINIG FILTER PARAMETER
 * THEN ON BASIS OF THIS IT DELETE RECORD
 *
 * EXAMPLE  IF  ID THEN PASS ID IN REQ.BODY
 * THEN IT DELETE ID BASED PARTICULAR RECORDS
 * ELSE
 * THIS METHOD WILL DELETE WHOLE RECORDS
 *
 * ---------------------------------------------------
 *
 * */
const removeOneOrMany = async (req: Request, res: Response) => {
  try {
    let resp;
    req.body = req.body ? req.body : {};
    if (req.body.id) {
      resp = await cotegories.destroy({
        where: {
          id: req.body.id,
        },
      });
    } else {
      resp = await cotegories.destroy({});
    }

    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

//pagination

/***
 *
 * FIND RECORDS
 * --------------------------------------------------
 * SUPPOSE IF REQUEST BODY CONTAINIG FILTER PARAMETER
 * THEN ON BASIS OF THIS IT FETCH
 *
 * EXAMPLE  IF ID THEN PASS ID IN REQ.BODY
 * THEN IT FETCH ID BASED PARTICULAR RECORDS
 *
 *
 * WE CAN FETCH WITH KEYS 
 * ---------------------------------------------------
 *
 * */

const fetchRecordWithPagination = async (req: Request, res: Response) => {
  try {
    let resp;

    //read page size and limit
    const { limit, size } = req.body;

    resp = await cotegories.findAll({
      where: {
        id: req.body.id,
      },
      include: [
        {
          model: cloths,
          where: {
            //partial searching
            [Op.or]: [
              {
                type: {
                  [Op.like]: `%req.body.type%`,
                },
              },
            ],
          },
        },
        {
          model: mobile,
          where: {
            //partial searching
            [Op.or]: [
              {
                type: {
                  [Op.like]: `%req.body.type%`,
                },
              },
            ],
          },
        },
      ],
    });
    res.status(200).json({
      response: resp,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      response: error,
    });
  }
};

export {
  addNewItem,
  findOneOrManyRecords,
  removeOneOrMany,
  fetchRecordWithPagination,
};
