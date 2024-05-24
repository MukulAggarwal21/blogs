import mongoose from "mongoose";

const connecToDB = async () => {
    const connectionUrl ="mongodb+srv://mukul_aggarwal:JAISHREERAM@cluster123.rnmdyrf.mongodb.net/"

    mongoose.connect(connectionUrl).then(() => console.log(" Blog Database connection is  successfull")).catch((error) => console.log(error));
};

export default connecToDB;