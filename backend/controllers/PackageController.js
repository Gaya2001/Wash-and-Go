const Package = require("../models/Package");
const mongoose = require('mongoose');
const User = require('../models/Register');
const transporter = require('../library/emailConfig'); // Import the Nodemailer transporter
let packageCounter;

//----------------------------------- Get All Packages --------------------------------------------------------

const GetPackages = async (req, res) => {
    try {
        // Attempting to fetch packages
        const Packages = await Package.find().populate('services');

        if (!Packages || Packages.length === 0) {
            return res.status(404).json({ message: "No Packages found" });
        }
        return res.status(200).json({ Packages });
    } catch (err) {
        console.error("Error fetching packages: ", err); // Log any errors
        return res.status(500).json({ message: "Server Error" });
    }
};



//----------------------------------- Add New Package ----------------------------------------------------------

// Utility function to generate unique package IDs
const generatePackageId = () => {
    if (packageCounter == null){
        packageCounter = 0;
    }
    packageCounter += 1;
    const uniqueId = `PKG-${String(packageCounter).padStart(3, '00')}`;
    return uniqueId;
  };

const addPackage = async (req, res, next) => {
    const { PackageName, Description1, Description2, Price, EstimatedTime, Statues, services, images } = req.body;

    // Ensure services are an array of ObjectIds
    const serviceIds = services.map(service => new mongoose.Types.ObjectId(service)); // Use 'new' here

    let package;

    try {
        // Generate a unique PackageID
        const PackageID = await generatePackageId();

        package = new Package({
            PackageID,
            PackageName,
            Description1,
            Description2,
            Price,
            EstimatedTime,
            Statues,
            services: serviceIds, // Pass the array of ObjectIds
            images
        });

        await package.save();

        // Fetch all registered user emails
        const users = await User.find({}, 'Email');
        const userEmails = users.map(user => user.Email);

        // Prepare the email options
        const mailOptions = {
        from: 'hiranthathsara.official@gmail.com',
        to: userEmails, // Send to all registered user emails
        subject: `New Package Added: ${PackageName}`,
        text: `A new package has been added to Wash & Go:\n\nPackage Name: ${PackageName}\nDescription: ${Description1}\nPrice: ${Price}\nEstimated Time: ${EstimatedTime}`
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent: ' + info.response);
        }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send({ message: "Internal Server Error" });
    }

    if (!package) {
        return res.status(404).send({ message: "Unable to add Package" });
    }

    return res.status(200).json({ package });
};


//----------------------------------- Get Package By ID --------------------------------------------------------

const getPackageById = async (req, res) => {
  
    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid package ID' });
    }
  
    try {
      const package = await Package.findById(req.params.id);
      if (!package) {
        return res.status(404).json({ error: 'Package not found' });
      }
      res.status(200).json(package);
    } catch (error) {
      console.error('Error fetching package:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };

//----------------------------------- Update Package ------------------------------------------------------------

const UpdatePackage = async (req, res) => {
    const id = req.params.id;
    const { PackageName, Description1, Description2, Price, EstimatedTime, Statues, services, images } = req.body;

    let updatedPackage;

    try {
        updatedPackage = await Package.findByIdAndUpdate(
            id,
            {
                PackageName,
                Description1,
                Description2,
                Price,
                EstimatedTime,
                Statues,
                services,  // Referencing service IDs
                images // Updating the images array
            },
            { new: true }
        );
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!updatedPackage) {
        return res.status(404).json({ message: "Unable to update package" });
    }

    return res.status(200).json({ updatedPackage });
};

//----------------------------------- Delete Package ------------------------------------------------------------

const DeletePackage = async (req, res) => {
    const id = req.params.id;

    let deletedPackage;

    try {
        // Delete the package by ID
        deletedPackage = await Package.findByIdAndDelete(id);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Internal Server Error" });
    }

    if (!deletedPackage) {
        return res.status(404).json({ message: "Unable to delete package" });
    }

    return res.status(200).json({ deletedPackage });
};

// Exporting controller methods
exports.GetPackages = GetPackages;
exports.addPackage = addPackage;
exports.getPackageById = getPackageById;
exports.UpdatePackage = UpdatePackage;
exports.DeletePackage = DeletePackage;
