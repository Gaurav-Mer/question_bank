import mongoose from "mongoose"

export async function connectMyDb() {
    try {
        await mongoose.connect(process.env.MONGO_DB_URL || "");
        const myconnection = mongoose.connection;

        myconnection.on("connect", () => {
            console.log("your database is connected ");
        });

        myconnection.on("error", () => {
            console.log("error during connection");
        });

        myconnection.on("disconnect", () => {
            console.log("DISCONNECTED");
        });

    } catch (error) {
        console.log("error while setting connection with db", error)
    }
}