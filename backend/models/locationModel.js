import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        image: { type: String, required: true },
        category: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        countInStock: { type: Number, required: true },
        rating: { type: Number, required: true },
        numReviews: { type: Number, required: true },
        nbBedroom: { type: Number, required: true },
        capReception: { type: Number, required: true },
        disponibility: { type: Boolean, default: true, required: true },
        superficy: { type: Number, required: true },
        address: { type: String, required: true },
        postalCode: { type: Number, required: true },
        city: { type: String, required: true },
        country: { type: String, required: true },
    }, {
        timestamps: true,
    }
);

const Location = mongoose.model('Location', locationSchema);

export default Location;