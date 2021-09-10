import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import Option from '../models/optionModel.js';
import { isAdmin, isAuth } from '../utils.js';

const optionRouter = express.Router();

optionRouter.get(
    '/',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const options = await Option.find({});
        res.send(options);
    })
);

optionRouter.get(
    '/:id',
    isAuth,
    isAdmin,
    expressAsyncHandler(async (req, res) => {
        const option = await Option.findById(req.params.id);
        if (option) {
            res.send(option);
        } else {
            res.status(404).send({ message: "Option introuvable" });
        }
    })
);

export default optionRouter;