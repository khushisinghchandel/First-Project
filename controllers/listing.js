const Listing = require("../models/listing");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

// Display all listings
module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("./listings/index.ejs", { allListings });
};

// Render the form to create a new listing
module.exports.renderNewForm = async (req, res) => {
    res.render("listings/new.ejs");
};

// Show details for a specific listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id).populate({
        path: "reviews",
        populate: {
            path: "author",
        }
    }).populate("owner");
    
    if (!listing) {
        req.flash("error", "Such listing doesn't exist!");
        res.redirect("/listings");
    }
    
    res.render("./listings/show.ejs", { listing });
};

// Create a new listing (with multiple images)
module.exports.createListing = async (req, res, next) => {
    try {
        // Geocode the location
        let response = await geocodingClient
            .forwardGeocode({
                query: req.body.listing.location,
                limit: 1,
            })
            .send();
        
        // Process multiple images with multer
        let images = [];
        if (req.files) {
            req.files.forEach(file => {
                images.push({ url: file.path, filename: file.filename });
            });
        }

        // Create a new listing
        const newListing = new Listing({
            ...req.body.listing,
            images: images,  // Store multiple images
            owner: req.user._id,
        });

        newListing.geometry = response.body.features[0].geometry;

        // Save the new listing to the database
        let savedListing = await newListing.save();
        console.log(savedListing);

        req.flash("success", "New Listing Created!");
        res.redirect("/listings");
    } catch (error) {
        console.error("Detailed Error:", error);
        next(error);
    }
};

// Render the edit form for a specific listing
module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    
    // Set original image URLs (if any)
    let originalImages = listing.images.map(img => img.url.replace("/upload", "/upload/h_300,w_250"));
    
    res.render("listings/edit.ejs", { listing, originalImages });
};

module.exports.updateListing = async (req, res) => {
    console.log("Request Body:", req.body);

    const { id } = req.params;
    const listing = await Listing.findById(id);

    if (!listing) {
        console.log("Listing not found");
        req.flash("error", "Listing not found!");
        return res.redirect("/listings");
    }

    listing.propertyType = req.body.listing?.propertyType || listing.propertyType;
    listing.numBHK = req.body.listing?.numBHK || listing.numBHK;
    listing.description = req.body.listing?.description || listing.description;
    listing.price = req.body.listing?.price || listing.price;
    listing.country = req.body.listing?.country || listing.country;
    listing.location = req.body.listing?.location || listing.location;

    
    await listing.save();



    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
};





// Delete a specific listing
module.exports.deleteListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndDelete(id);

    // Optional: Delete associated images from Cloudinary if necessary

    req.flash("success", "Listing Deleted!");
    res.redirect("/listings");
};
