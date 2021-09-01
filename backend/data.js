import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'Nicolas',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'John',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        }
    ],
    locations:[
        {
            name:'Cabane-besancon',
            category:'Cabane',
            image:'/images/cabane-besancon.jpg',
            price:120,
            countInStock: 5,
            rating:5,
            numReviews:57,
            description: 'Jolie cabane situé dans la campagne de Besancon',
        },
        {
            name:'Cabane-limoges',
            category:'Cabane',
            image:'/images/cabane-besancon.jpg',
            price:90,
            countInStock: 6,
            rating:3.5,
            numReviews:13,
            description: 'Jolie cabane situé dans la campagne de Besancon',
        },
    ],
};

export default data;