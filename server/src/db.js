import mongoose from "mongoose";

export const connectDB = async (uri, dbName) => {
  mongoose.set("strictQuery", true);
  const options = {};
  if (dbName) options.dbName = dbName;
  await mongoose.connect(uri, options);
  return mongoose.connection;
};







// import mongoose from "mongoose";

// export const connectDB = async (uri) => {
//   mongoose.set("strictQuery", true);
//   await mongoose.connect(uri, {
//     dbName: process.env.DB_NAME || "test",
//   });
//   console.log("✅ Connected to DB:", mongoose.connection.name);
//   return mongoose.connection;
// };

