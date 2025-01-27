// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const ItemController = require("../controllers/ItemController");
const multer = require("multer");


// Define routes and link to controller methods
router.get("/",ItemController.GetAllItems );
router.post("/", ItemController.addItem );
router.get("/:id", ItemController.getByItemId);
router.put("/:id",ItemController.UpdateItem );
router.delete("/:id",ItemController.DeleteItem );


module.exports = router;
