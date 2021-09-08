import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import data from '../data.js';
import Location from '../models/locationModel.js';
import {isAdmin, isAuth} from '../utils.js';

const locationRouter = express.Router();

locationRouter.get(
    '/',
    expressAsyncHandler(async (req, res) => {
        const locations = await Location.find({});
        res.send(locations);
    })
);

locationRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await Location.remove({});
        const createdLocation = await Location.insertMany(data.locations);
        res.send({ createdLocation });
    })
);

locationRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const location = await Location.findById(req.params.id);
        if (location) {
            res.send(location);
        } else {
            res.send(404).send({ message: 'Produit non trouvé' });
        }
    })
);

locationRouter.post('/', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const location = new Location({
        name:'Sample name' + Date.now(),
        image: '/images/cabane-besancon.jpg',
        price: 0,
        category: 'sample category',
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        description: 'sample description',
        nbBedroom: 0,
        capReception: 0,
        disponibility: true,
        superficy: 10,
        address: '11 rue Léon Frot',
        postalCode: 75000,
        city: 'Paris',
        country: 'France',
    });
    const createdLocation = await location.save();
    res.send({ message: 'Location créer', location: createdLocation });
}));

locationRouter.put('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) => {
    const locationId = req.params.id;
    const location = await Location.findById(locationId);
    if(location) {
        location.name = req.body.name;
        location.price = req.body.price;
        location.image = req.body.image;
        location.category = req.body.category;
        location.countInStock = req.body.countInStock;
        location.description = req.body.description;
        location.nbBedroom = req.body.nbBedroom;
        location.capReception = req.body.capReception;
        location.disponibility = req.body.disponibility;
        location.superficy = req.body.superficy;
        location.address = req.body.address;
        location.postalCode = req.body.postalCode;
        location.city = req.body.city;
        location.country = req.body.country;

        const updatedLocation = await location.save();
        res.send({message:'Location modifié', location: updatedLocation});
    } else {
        res.status(404).send({ message:'Location introuvable' });
    }
})
);

locationRouter.delete('/:id', isAuth, isAdmin, expressAsyncHandler(async(req, res) =>{
    const location = await Location.findById(req.params.id);
    if(location) {
        const deleteLocation = await location.remove();
        res.send({ message: 'Location supprimé', location: deleteLocation });
    } else {
        res.status(404).send({ message: 'Location introuvable '});
    }
})
);
export default locationRouter;
