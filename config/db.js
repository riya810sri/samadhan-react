const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/samadhaan", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Local MongoDB connected to samadhaan_db");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
