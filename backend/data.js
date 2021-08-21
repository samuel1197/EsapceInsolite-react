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
    products:[
        {
            _id:'1',
            name:'Cabane-besancon',
            category:'Cabane',
            image:'/images/cabane-besancon.jpg',
            price:120,
            rating:5,
            description: 'Jolie cabane situé dans la campagne de Besancon',
        },
        {
            _id:'2',
            name:'Cabane-besancon',
            category:'Cabane',
            image:'/images/cabane-besancon.jpg',
            price:90,
            rating:3.5,
            description: 'Jolie cabane situé dans la campagne de Besancon',
        },
    ],
};

export default data;