const User = require('../models/user');
const Car = require('../models/cars');

module.exports = {
    // Esto podría ser por medio de callbacks también
    // pero no es recomendado porque genera el callback hell 
    index: async (req, res, next) => {
        const users = await User.find({});
        res.status(200).json(users);    
    },

    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        await newUser.save();
        res.status(200).json(newUser);
    },

    getUser: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId);
        res.status(200).json(user);
    },

    // método PUT
    replaceUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    // método PATCH
    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const oldUser = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({success: true});
    },

    // método DELETE
    deleteUser: async (req, res, next) => {
        const { userId } = req.params;
        await User.findByIdAndRemove(userId);
        res.status(200).json({success: true});
    },

    getUserCars: async (req, res, next) => {
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user);
    },

    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        const newCar = new Car(req.body);
        const user = await User.findById(userId);
        newCar.seller = user;
        await newCar.save();
        user.cars.push(newCar);
        await user.save();
        res.status(201).json(newCar);
    }
};