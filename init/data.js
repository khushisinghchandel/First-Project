const data = [
  {
    propertyType: "Flat",
    numBHK: 2,
    description: "A beautiful 2BHK flat with ample natural light and ventilation.",
    images: [
      { filename: "flat1-1.jpg", url: "https://via.placeholder.com/500" },
      { filename: "flat1-2.jpg", url: "https://via.placeholder.com/500" },
      { filename: "flat1-3.jpg", url: "https://via.placeholder.com/500" },
    ],
    price: 25000,
    location: "Mumbai, Maharashtra",
    country: "India",
    reviews: [],
    owner: "6792a101ae0551c4c0075e6a", // Replace with actual ObjectId of an owner
    geometry: {
      type: "Point",
      coordinates: [72.8777, 19.0760], // Longitude, Latitude of Mumbai
    },
  },
  {
    propertyType: "Apartment",
    numBHK: 3,
    description: "Spacious 3BHK apartment in a gated community with modern amenities.",
    images: [
      { filename: "flat1-1.jpg", url: "https://via.placeholder.com/500" },
      { filename: "flat1-2.jpg", url: "https://via.placeholder.com/500" },
      { filename: "flat1-3.jpg", url: "https://via.placeholder.com/500" },
    ],
    price: 45000,
    location: "Bangalore, Karnataka",
    country: "India",
    reviews: [],
    owner: "6792a101ae0551c4c0075e6a", // Replace with actual ObjectId of an owner
    geometry: {
      type: "Point",
      coordinates: [77.5946, 12.9716], // Longitude, Latitude of Bangalore
    },
  },
  {
    propertyType: "Room",
    numBHK: 1,
    description: "Single room ideal for students or bachelors, located near a metro station.",
    images: [
      { filename: "flat1-1.jpg", url: "https://via.placeholder.com/500" },
      { filename: "flat1-2.jpg", url: "https://via.placeholder.com/500" },
      { filename: "flat1-3.jpg", url: "https://via.placeholder.com/500" },
    ],
    price: 8000,
    location: "Delhi",
    country: "India",
    reviews: [],
    owner: "6792a101ae0551c4c0075e6a", // Replace with actual ObjectId of an owner
    geometry: {
      type: "Point",
      coordinates: [77.1025, 28.7041], // Longitude, Latitude of Delhi
    },
  },
];

module.exports = { data };
