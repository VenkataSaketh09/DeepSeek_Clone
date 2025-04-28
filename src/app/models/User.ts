import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/deepseek_db/Data")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const userSchema = new mongoose.Schema(
    {
    _id:{type:String,required:true},
    name:{type:String,required:true},
    email:{type:String,required:true},
    image:{type:String,required:true}
    },
    {timestamps:true}
)

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;