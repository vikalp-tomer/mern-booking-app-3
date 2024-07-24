import mongoose from "mongoose";
import { HotelType } from "../shared/types";

const hotelSchema = new mongoose.Schema<HotelType>({
  userId: String,
  name: String,
  city: String,
  country: String,
  description: String,
  type: String,
  adultCount: Number,
  childCount: Number,
  facilities: [String],
  pricePerNight: Number,
  starRating: Number,
  imageUrls: [String],
  lastUpdated: Date,
});

const Hotel = mongoose.model<HotelType>("Hotel", hotelSchema);

export default Hotel;
