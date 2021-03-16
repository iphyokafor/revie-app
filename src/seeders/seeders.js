import mongoose from "mongoose";
import faker from "faker";
import dotenv from "dotenv";
import userModel from "../Models/user";
import apartmentModel from "../Models/apartment";
import jwtHelper from "../helpers/utils/jwt";
import bcryptHelper from "../helpers/utils/bcrypt";

const { generateToken, refreshToken, verifyRefreshToken } = jwtHelper;
const { hashPassword } = bcryptHelper;

dotenv.config();

// connection to mongodb
const connect = () => {
    /** connection mongodb */
    mongoose
        .connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        })
        .then(() => {
            console.log("mongodb connected...");
        })
        .catch((err) => console.log(err.message));

    mongoose.connection.on("connected", () => {
        console.log("Mongoose connected to db");
    });
};

// Drop existing users if any
const userModelSeed = () => userModel.deleteMany({});

// Drop existing apartment if any
const apartmentModelSeed = () => apartmentModel.deleteMany({});

const Seeders = {
    async seedUserModel() {
        try {
            // make a bunch of users
            const users = [];
            for (let i = 0; i < 5; i += 1) {
                const firstName = faker.name.firstName();
                const lastName = faker.name.lastName();
                const pass = "password";
                const password = hashPassword(pass);
                const newUser = {
                    email: faker.internet.email(firstName, lastName),
                    firstName,
                    lastName,
                    password,
                };
                users.push(newUser);
            }
            const token = await generateToken({ users });
            const refreshedToken = await refreshToken({ users });
            await userModel.insertMany(users);
        } catch (error) {
            console.log("error", error);
        }
    },

    async seedApartmentModel() {
        try {
            // make a bunch of apartment
            const apartment = [];
            for (let i = 0; i < 5; i += 1) {
                const address = faker.address.streetAddress();
                const amenities = "Water supply";
                const photo = faker.image.city();
                const video = faker.image.city();
                const apartmentType = "Residential";
                const apartmentCategory = "Self-contain";

                const newApartment = {
                    address,
                    amenities,
                    photo,
                    video,
                    apartmentType,
                    apartmentCategory,
                };
                apartment.push(newApartment);
            }

            await apartmentModel.insertMany(apartment);
        } catch (error) {
            console.log("error", error);
        }
    },
};

const migration = async() => {
    try {
        await connect();
        await userModelSeed();
        await apartmentModelSeed();
        await Seeders.seedApartmentModel();
        await Seeders.seedUserModel();
        console.log("db migration successful");
    } catch (error) {
        console.log("error", error);
    }
};

migration();