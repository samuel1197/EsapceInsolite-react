import mongoose from "mongoose";
import validate from "mongoose-validator";

const lastnameValidator = [
    validate({
        validator: "matches",
        arguments: /^(([A-Z])([a-z]{3,20})+[ ]*)+$/,
        message: "Votre nom doit faire entre 4 et 21 caractères.",
    })
];

const firstnameValidator = [
    validate({
        validator: "matches",
        arguments: /^(([A-Z])([a-zA-Z]{3,20})+[ ]*)+$/,
        message: "Votre prénom doit faire entre 4 et 21 caractères.",
    })
];

const emailValidator = [
    validate({
        validator: "matches",
        arguments: /^([\w\-\.]+)@((?:[\w]+\.)+)([a-zA-Z]+)$/,
        message: "Votre adresse mail n'est pas au bon format."
    }),
    validate({
        validator: "isLength",
        arguments: [11, 100],
        message: "Votre adresse mail doit contenir entrer 11 et 100 caractères."
    })
];

/*const passwordValidator = [
    validate({
        validator: "matches",
        arguments: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@\.,!%&*?])[A-Za-z\d#,$\.,@!%&*?]{8,30}$/,
        message: "Votre mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre, un caractère spécial et doit faire au moins 8 caractères."
    })
];*/

const phoneValidator = [
    validate({
        validator: "matches",
        arguments: /^(0|\+33)[1-9]( +[0-9]{2}){4}$/,
        message: "Votre numéro de téléphone n'est pas au bon format. (ex: 00 00 00 00 00 ou +330 00 00 00 00)"
    })
];

const genderValidator = [
    validate({
        validator: "matches",
        arguments: /^(Homme)|(Femme)$/,
        message: "Etes-vous un homme ou une femme."
    })
];

const cityValidator = [
    validate({
        validator: "matches",
        arguments: /^(\w+[À-ý-]*[ ]*)+$/,
        message: "Attention à bien écrire votre ville."
    })
];

const addressValidator = [
    validate({
        validator: "matches",
        arguments: /^(\w+[À-ý-]*[ ]*)+$/,
        message: "Attention à bien écrire votre adresse."
    })
];

const countryValidator = [
    validate({
        validator: "matches",
        arguments: /^(\w+[À-ý-]*[ ]*)+$/,
        message: "Attention à bien écrire votre pays."
    })
];

const userSchema = new mongoose.Schema(
    {
        lastname: { type: String, required: true, validate: lastnameValidator },
        firstname: { type: String, required: true, validate: firstnameValidator },
        email: { type: String, required: true, unique: true, validate: emailValidator },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, default: false, required: true },
        age: { type: Number, required: true },
        phoneNumber: { type: String, required: true, validate: phoneValidator },
        gender: { type: String, required: true, validate: genderValidator },
        city: { type: String, required: true, validate: cityValidator },
        address: { type: String, required: true, validate: addressValidator },
        postalCode: { type: Number, required: true },
        country: { type: String, required: true, validate: countryValidator },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model('User', userSchema);
export default User;