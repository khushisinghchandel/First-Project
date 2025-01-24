const express = require("express");
const router = express.Router();
const ExpressError = require("../utils/ExpressError.js");
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listing.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");  // Destructure storage from cloudConfig
const upload = multer({ storage });

// Routes for listing operations

// Index Route - Display all listings
router.route("/")
    .get(wrapAsync(listingController.index))
    .post(
        isLoggedIn,
        upload.array("listing[images]", 3), // Use upload.array() for multiple files (3 images)
        wrapAsync(listingController.createListing)
    );

// Render new listing form
router.get("/new", isLoggedIn, wrapAsync(listingController.renderNewForm));

// Show route - Show details of a specific listing
router.route("/:id")
    .get(wrapAsync(listingController.showListing))
    .put(
        isLoggedIn,
        isOwner,
        upload.none(),
        wrapAsync(listingController.updateListing)
    )
    .delete(isLoggedIn, isOwner, wrapAsync(listingController.deleteListing));

// Render edit form for a specific listing
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

module.exports = router;
