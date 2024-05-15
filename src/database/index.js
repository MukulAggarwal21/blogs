import mongoose from "mongoose";

const connecToDB = async ()=>{
    const connectionUrl = "mongodb://localhost:27017/"

    mongoose.connect(connectionUrl).then(()=> console.log(" Blog Database connection is  successfull")).catch((error)=> console.log(error));
}
export default connecToDB;