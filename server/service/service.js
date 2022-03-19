import mongoose from "mongoose";

const options = {
  autoIndex: false,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectMongoDb = () => {
  mongoose
    .connect(
      "mongodb+srv://mcboz:Mehmet1997@cluster0.gl215.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      options
    )
    .then(() => {
      console.log("MongoDb connected");
    })
    .catch((err) => {
      console.log("MongoDb connection unseccussfull");
    });
};

export default connectMongoDb;
