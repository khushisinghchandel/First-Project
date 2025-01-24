const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");

const listingSchema = new Schema({
    propertyType: {
        type: String,
        enum: ["Room", "Flat", "Apartment"], // restrict to specific values
        required: true
    },
    numBHK: {
        type: Number,
        required: true,
        min: 1 // Minimum value of 1
    },
    description: {
        type: String,
        required: true,
    },
    images: [
    {
        filename: String, 
        url: String,
    },
],
    price: Number,
    location: String,
    country: String,
    
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review",
        },
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
});

listingSchema.post("findOneAndDelete", async(listing) => {
    if (listing) {
        await Review.deleteMany({ _id: { $in: listing.reviews } });
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
