const express = require("express");
const axios = require("axios");
const app = express();
app.use(express.json());
async function checkAccess(user) {
  const response = await axios.post(
    "http://localhost:8181/v1/policies/auth/allow",
    {
      input: { user },
    },
  );
  return response.data.result;
}
//Public Route
app.get("/", (req, res) => {
  res.send("API is Running");
});
//Protected Route
app.post("/secure", async (req, res) => {
  try {
    const user = req.body.user;
    const allowed = await checkAccess(user);
    if (allowed) {
      return res.send(`Access granted for ${user}`);
    } else {
      return res.status(403).json({ message: "Access Denied" });
    }
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});
//start server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});