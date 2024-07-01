import mongoose from "mongoose"

const URI = process.env.DB_URI
const ConnectToDB = async () => {
    try {

        await mongoose.connect(URI, {
            dbName: "MERN-Blog-app"
        })
        console.log("Connection is successful to DB.")

    } catch (e) {
        console.log("Fail to Connect to Database.", e.message)
        process.exit(0)
    }
}

export default ConnectToDB