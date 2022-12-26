import mongoose from 'mongoose';
import dotenv from "dotenv-defaults";
dotenv.config();

export default {
    connect: async () => {
        try {
            await mongoose.connect(process.env.MONGO_URL, {
                useUnifiedTopology: true,
                useNewUrlParser: true
            }).then((res) => { console.log("mongo db connection created") });
        } catch (err) {
            console.error(err);
        }
    }
};