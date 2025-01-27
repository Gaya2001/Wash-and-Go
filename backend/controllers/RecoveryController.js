const Recovery = require("../models/Recovery");
const Form = require("../models/Recovery");
let RecveryCounter;

const getAllrecovery = async (req, res) => {
  try {
    const recovery = await Recovery.find({}); // Return all fields
    if (!recovery || recovery.length === 0) {
      return res.status(404).json({ message: "No Recovery found" });
    }
    return res.status(200).json({ recovery });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server Error" });
  }
};

const getrecoveryId = async (req, res) => {
  const id = req.params.id;

  try {
    const getrecovery = await Recovery.findById(id);
    if (!getrecovery) {
      return res.status(404).json({ message: "Recovery request not found" });
    }
    return res.status(200).json({ getrecovery });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const DeleteRecovery = async (req, res, next) => {
  const id = req.params.id;

  let deleterecovery;

  try {
    deleterecovery = await Recovery.findByIdAndDelete(id); // Assuming the same model
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Error deleting recovery request" });
  }

  if (!deleterecovery) {
    return res
      .status(400)
      .json({ message: "Unable to delete recovery request" });
  }

  return res
    .status(200)
    .json({ message: "Recovery request deleted successfully" });
};

// Utility function to generate unique package IDs
const generateRecoveryId = () => {
  if (RecveryCounter == null){
    RecveryCounter = 0;
  }
  RecveryCounter += 1;
  const uniqueId = `RID-${String(RecveryCounter).padStart(3, '00')}`;
  return uniqueId;
};



const InsertRecoveryDetails = async (req, res, next) => {
  const {
    Name,
    EmailAddress,
    Address,
    ContactNo,
    DestinationLocation,
    VehicleType,
    PickUpLocation,
    NICNumber,
    VehicleRegistrationNumber,
    Description,
    States,
    Date,
    Time,
    DistanceTraveled,
    TimeDuration,
    ServiceCharges,
    TotalAmount,
    DriverAssigned,
  } = req.body;

  let Forms;

  try {
    const RecoveryID = await generateRecoveryId();
    Forms = new Form({
      RecoveryID,
      Name,
      EmailAddress,
      Address,
      ContactNo,
      DestinationLocation,
      VehicleType,
      PickUpLocation,
      NICNumber,
      VehicleRegistrationNumber,
      Description,
      States,
      Date,
      Time,
      DistanceTraveled,
      TimeDuration,
      ServiceCharges,
      TotalAmount,
      DriverAssigned,
    });
    await Forms.save(); // Save the document to the database
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .send({ message: "Server error, could not save form" });
  }

  if (!Forms) {
    return res.status(404).send({ message: "Unable to add users" });
  }

  return res.status(200).json({ Forms });
};

const updateRecovery = async (req, res) => {
  const id = req.params.id;

  const { DriverAssigned } = req.body;

  try {
    // Set current date and time
    const currentDate = new Date();
    const currentTime = currentDate.toTimeString().split(" ")[0]; // Get time in HH:MM:SS format

    const updatedRecovery = await Recovery.findByIdAndUpdate(
      id,
      {
        States: "ongoing", // Set status as 'ongoing'
        Date: currentDate, // Set current date
        Time: currentTime, // Set current time
        DriverAssigned: DriverAssigned,
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecovery) {
      return res.status(404).json({ message: "Recovery request not found" });
    }

    return res.status(200).json({
      message: "Recovery request updated successfully",
      updatedRecovery,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};





const updateRecoveryComplete = async (req, res) => {
  const id = req.params.id;
  const { DistanceTraveled, TimeDuration, ServiceCharges, TotalAmount } =
    req.body;

  try {
    const updatedRecovery = await Recovery.findByIdAndUpdate(
      id,
      {
        States: "complete", // Set status as 'Complete'
        DistanceTraveled: DistanceTraveled, // Update DistanceTraveled
        TimeDuration: TimeDuration, // Update TimeDuration
        ServiceCharges: ServiceCharges, // Update ServiceCharges
        TotalAmount:DistanceTraveled*500+((DistanceTraveled*500)/100*ServiceCharges),// Update TotalAmount
         // Update TotalAmount
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecovery) {
      return res.status(404).json({ message: "Recovery request not found" });
    }

    return res.status(200).json({
      message: "Recovery request updated successfully",
      updatedRecovery, // Return the updated recovery document
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};

const updateRecoveryCompletecheak = async (req, res) => {
  const id = req.params.id;
  const { DistanceTraveled, TimeDuration, ServiceCharges } =
    req.body;

  try {
    const updatedRecovery = await Recovery.findByIdAndUpdate(
      id,
      { // Set status as 'Complete'
        DistanceTraveled: DistanceTraveled, // Update DistanceTraveled
        TimeDuration: TimeDuration, // Update TimeDuration
        ServiceCharges: ServiceCharges, // Update ServiceCharges
        TotalAmount:DistanceTraveled*500+((DistanceTraveled*500)/100*ServiceCharges),// Update TotalAmount
         // Update TotalAmount
      },
      { new: true } // Return the updated document
    );

    if (!updatedRecovery) {
      return res.status(404).json({ message: "Recovery request not found" });
    }

    return res.status(200).json({
      message: "Recovery request updated successfully",
      updatedRecovery, // Return the updated recovery document
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Server error" });
  }
};


exports.updateRecovery = updateRecovery;
exports.InsertRecoveryDetails = InsertRecoveryDetails;
exports.getAllrecovery = getAllrecovery;
exports.getrecoveryId = getrecoveryId;
exports.DeleteRecovery = DeleteRecovery;
exports.updateRecovery = updateRecovery;
exports.updateRecoveryComplete = updateRecoveryComplete;
exports.updateRecoveryCompletecheak = updateRecoveryCompletecheak;
