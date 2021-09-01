import express from "express";
import expressAsyncHandler from "express-async-handler";
import bcrypt from 'bcryptjs';
import data from "../data.js";
import User from "../models/userModel.js";
import { generateToken, isAdmin, isAuth } from "../utils.js";

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res) => {
        // await User.remove({});
        const createdUsers = await User.insertMany(data.users);
        res.send({ createdUsers });
    })
);

userRouter.post(
    '/signin',
    expressAsyncHandler(async (req, res) => {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
        if (bcrypt.compareSync(req.body.password, user.password)) {
            res.send({
                _id: user._id,
                lastname: user.lastname,
                firstname: user.firstname,
                email: user.email,
                isAdmin: user.isAdmin,
                age: user.age,
                phoneNumber: user.phoneNumber,
                gender: user.gender,
                city: user.city,
                address: user.address,
                postalCode: user.postalCode,
                country: user.country,
                token: generateToken(user),
            });
            return;
        }
    }
    res.status(401).send({message: 'Identifiant ou mot de passe invalide' });
    })
);

userRouter.post(
    '/register',
    expressAsyncHandler(async (req, res) => {
        const user = new User({
            lastname: req.body.lastname,
            firstname: req.body.firstname,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8),
            age: req.body.age,
            phoneNumber: req.body.phoneNumber,
            gender: req.body.gender,
            city: req.body.city,
            address: req.body.address,
            postalCode: req.body.postalCode,
            country: req.body.country,
        });
        const createdUser = await user.save();
        res.send({
            _id: user._id,
            lastname: user.lastname,
            firstname: user.firstname,
            email: user.email,
            isAdmin: user.isAdmin,
            age: user.age,
            phoneNumber: user.phoneNumber,
            gender: user.gender,
            city: user.city,
            address: user.address,
            postalCode: user.postalCode,
            country: user.country,
            token: generateToken(createdUser),
        })
    })
);

userRouter.get(
    '/:id',
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
    })
);

userRouter.put(
    '/profile',
    isAuth,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.user._id);
        if (user) {
            user.lastname = req.body.lastname || user.lastname;
            user.firstname = req.body.firstname || user.firstname;
            user.email = req.body.email || user.email;
            user.age = req.body.age || user.age;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.gender = req.body.gender || user.gender;
            user.city = req.body.city || user.city;
            user.address = req.body.address || user.address;
            user.postalCode = req.body.postalCode || user.postalCode;
            user.country = req.body.country || user.country;
            if (req.body.password) {
                user.password = bcrypt.hashSync(req.body.password, 8);
            }
            const updatedUser = await user.save();
            res.send({
                _id: updatedUser._id,
                lastname: updatedUser.lastname,
                firstname: updatedUser.firstname,
                email: updatedUser.email,
                isAdmin: updatedUser.isAdmin,
                age: updatedUser.age,
                phoneNumber: updatedUser.phoneNumber,
                gender: updatedUser.gender,
                city: updatedUser.city,
                address: updatedUser.address,
                postalCode: updatedUser.postalCode,
                country: updatedUser.country,
                token: generateToken(updatedUser),
            });
        }
    })
);

userRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const users = await User.find({});
        res.send(users);
    })
);

userRouter.delete(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            if (user.email === 'admin@example.com') {
                res.status(400).send({ message: 'Impossible de supprimer un utilisateur administrateur' });
                return;
            }
            const deleteUser = await user.remove();
            res.send({ message: 'Utilisateur supprimé', user: deleteUser });
        } else {
            res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
    })
);

userRouter.put(
    '/:id/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const user = await User.findById(req.params.id);
        if (user) {
            user.lastname = req.body.lastname || user.lastname;
            user.firstname = req.body.firstname || user.firstname;
            user.email = req.body.email || user.email;
            user.isAdmin = req.body.isAdmin || user.isAdmin;
            user.age = req.body.age || user.age;
            user.phoneNumber = req.body.phoneNumber || user.phoneNumber;
            user.gender = req.body.gender || user.gender;
            user.city = req.body.city || user.city;
            user.address = req.body.address || user.address;
            user.postalCode = req.body.postalCode || user.postalCode;
            user.country = req.body.country || user.country;
            const updatedUser = await user.save();
            res.send({ message: 'Utilisateur modifier', user: updatedUser });
        } else {
            res.status(404).send({ message: 'Utilisateur non trouvé' });
        }
    })
);

export default userRouter;