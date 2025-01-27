const multer = require('multer');
const Image = require('../models/Images');
const fs = require('fs');
const path = require('path');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

exports.createImage = async (req, res) => {
    upload.fields([{ name: 'image', maxCount: 1 }, { name: 'customerId', maxCount: 1 }])(req, res, async (err) => {
        if (err instanceof multer.MulterError) {
            return res.status(400).json({ error: err.message });
        } else if (err) {
            return res.status(500).json({ error: err.message });
        }

        const customerIdKey = Object.keys(req.body).find(key => key.trim() === 'customerId');
        const customerIdValue = customerIdKey ? req.body[customerIdKey].trim() : null;

        if (!customerIdValue) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        const imageFile = req.files.image && req.files.image.length > 0 ? req.files.image[0] : null;
        if (!imageFile) {
            return res.status(400).json({ error: 'Image file is required' });
        }

        const imageUrl = `uploads/${imageFile.filename}`;

        try {
            // Check if an image already exists for the customer
            const existingImage = await Image.findOne({ customerId: customerIdValue });

            if (existingImage) {
                const fullPath = path.join(__dirname, existingImage.imageUrl);

                // Delete the previous image file
                fs.unlink(fullPath, (unlinkErr) => {
                    if (unlinkErr) {
                        console.error('Error deleting previous image:', unlinkErr);
                    }
                });

                // Remove the previous image document from the database
                await Image.deleteOne({ _id: existingImage._id });
            }

            // Save the new image
            const image = new Image({
                customerId: customerIdValue,
                imageUrl: imageUrl,
            });

            const savedImage = await image.save();
            res.status(201).json({ message: 'Image uploaded successfully', savedImage });
        } catch (err) {
            return res.status(500).json({ error: 'Error saving image to the database' });
        }
    });
};

exports.getImages = async (req, res) => {
    try {
        // Retrieve customerId from query parameters and trim it
        const customerId = req.query.customerId ? req.query.customerId.trim() : null;

        // Check if customerId is provided
        if (!customerId) {
            return res.status(400).json({ error: 'Customer ID is required' });
        }

        // Fetch images associated with the customerId from the database
        const images = await Image.find({ customerId });

        // Check if any images were found
        if (images.length === 0) {
            return res.status(404).json({ message: 'No images found for this customer' });
        }



        // Respond with the images array
        res.status(200).json({ images: images });
    } catch (err) {
        // Handle any errors that occur during retrieval
        res.status(500).json({ error: 'Error retrieving images from the database' });
    }
}

