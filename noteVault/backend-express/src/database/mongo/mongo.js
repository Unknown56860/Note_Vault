import mongoose from "mongoose"

const mongoConnect = async (mongo_url) => {
    return await mongoose.connect(mongo_url)
    .then(() => {
        console.log(`[MongoDB]: database ready`);
    })
    .catch(() => {
        console.log(`[MongoDB]: connection with the server failed`);
    })
}

export default mongoConnect;
