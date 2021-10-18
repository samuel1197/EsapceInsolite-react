import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            "isAdmin": true,
            "lastname": "Mazaud",
            "firstname": "Nicolas",
            "email": "admin@example.com",
            "password": bcrypt.hashSync('1234', 8),
            "age": 23,
            "phoneNumber": "06 08 97 09 77",
            "gender": "Homme",
            "city": "Bonneuil sur Marne",
            "address": "1 rue Alexandre Guillou",
            "postalCode": 94380,
            "country": "France",
        }
    ],
    locations:[
        {
            "disponibility": true,
            "name": "sample name1630",
            "image": "/images/cabane-besancon.jpg",
            "price": 120,
            "category": "sample category",
            "countInStock": 2,
            "rating": 0,
            "numReviews": 0,
            "description": "sample description",
            "nbBedroom": 2,
            "capReception": 4,
            "superficy": 10,
            "address": "11 rue Léon Frot",
            "postalCode": 75000,
            "city": "Paris",
            "country": "France",
        }
    ],
};

export default data;