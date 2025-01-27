const Driver = require("../models/Drivers");
let DriverCounter;

// Get all drivers
const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.find(
      {},
      "id name PhoneNo RecoveryVehicleNo Address States"
    ); // Updated field names
    if (!drivers || drivers.length === 0) {
      return res.status(404).json({ message: "No Drivers found" });
    }
    return res.status(200).json({ drivers });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

// Get a driver by ID
const getDriverById = async (req, res) => {
  const id = req.params.id;

  try {
    const driver = await Driver.findById(id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    return res.status(200).json({ driver });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

// Delete a driver by ID
const deleteDriver = async (req, res, next) => {
  const id = req.params.id;

  let deletedDriver;

  try {
    deletedDriver = await Driver.findByIdAndDelete(id);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting driver" });
  }

  if (!deletedDriver) {
    return res.status(400).json({ message: "Unable to delete driver" });
  }

  return res.status(200).json({ message: "Driver deleted successfully" });
};

// Utility function to generate unique package IDs
const generateDriverId = () => {
  if (DriverCounter == null){
    DriverCounter = 0;
  }
  DriverCounter += 1;
  const uniqueId = `DRID-${String(DriverCounter).padStart(3, '00')}`;
  return uniqueId;
};


// Insert driver details
const insertDriverDetails = async (req, res, next) => {
  const { name, States, RecoveryVehicleNo, Address, PhoneNo } = req.body;
  
  let newDriver;
  

  try {
    const id = await generateDriverId();
    newDriver = new Driver({
      id,
      name,
      States,
      RecoveryVehicleNo,
      Address,
      PhoneNo,
    });
    await newDriver.save(); // Save the document to the database
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Server error, could not save driver details" });
  }

  if (!newDriver) {
    return res.status(404).send({ message: "Unable to add driver details" });
  }

  return res.status(200).json({ newDriver });
};

const updateRecoveryComplete = async (req, res) => {
  const id = req.params.id;

  try {
    // Fetch the current driver data to check the current state
    const driver = await Driver.findById(id);

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }

    // Explicit if condition to toggle the state
    let newState;
    if (driver.States === "Available") {
      newState = "Unavailable";
    } else {
      newState = "Available";
    }

    // Update the driver's state
    const updatedDriver = await Driver.findByIdAndUpdate(
      id,
      {
        States: newState, // Set the new state
      },
      { new: true } // Return the updated document
    );

    return res.status(200).json({
      message: "Driver updated successfully",
      updatedDriver, // Return the updated driver document
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.getAllDrivers = getAllDrivers;
exports.insertDriverDetails = insertDriverDetails;
exports.getDriverById = getDriverById;
exports.deleteDriver = deleteDriver;
exports.updateRecoveryComplete = updateRecoveryComplete;
