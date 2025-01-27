const express = require("express");
const router = express.Router();
const PackageController = require("../controllers/PackageController");

// Define route and link to controller method
router.get("/", PackageController.GetPackages);

router.post("/",PackageController.addPackage );

router.get("/:id", PackageController.getPackageById);

router.put("/:id", PackageController.UpdatePackage);

router.delete("/:id", PackageController.DeletePackage);


// Export the router
module.exports = router;
