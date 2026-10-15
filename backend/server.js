const http = require("http");
const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error:", err);
  });

const userSchema = new mongoose.Schema({
  name: String,
  role: String
});

const User = mongoose.model("User", userSchema);

const server = http.createServer(async (req, res) => {
  const users = await User.find();

  res.setHeader("Content-Type", "application/json");

  res.end(
    JSON.stringify({
      version: "v2",
      users: users
    })
  );
});

server.listen(3000, () => {
  console.log("Backend running on port 3000");
});
