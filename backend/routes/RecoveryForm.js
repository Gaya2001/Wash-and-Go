// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const RecoveryForm = require("../controllers/RecoveryController");

// Define routes and link to controller methods
router.get("/", RecoveryForm.getAllrecovery);
router.post("/", RecoveryForm.InsertRecoveryDetails);
router.get("/:id", RecoveryForm.getrecoveryId);
router.put("/:id",RecoveryForm.updateRecovery );
router.put("/complete/:id",RecoveryForm.updateRecoveryComplete );
router.put("/completecheak/:id",RecoveryForm.updateRecoveryCompletecheak );
router.delete("/:id", RecoveryForm.DeleteRecovery);


module.exports = router;


