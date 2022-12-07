import Express from "express";

const router = Express.Router();

import * as items from "../controller/mainController";

router.post("/addItem", items.addNewItem);
router.post("/fetchOneOrMany", items.findOneOrManyRecords);
router.delete("/remove", items.removeOneOrMany);
router.post("/filter", items.fetchRecordWithPagination);

export { router };
