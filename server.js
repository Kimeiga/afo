require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { StreamChat } = require("stream-chat");

const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// initialize Stream Chat SDK
const serverSideClient = new StreamChat(
  process.env.STREAM_API_KEY,
  process.env.STREAM_APP_SECRET
);

// define the first route
app.get("/", function (req, res) {
  res.send("<h1>Hello World!</h1>");
});

// define the first route
app.get("/join", function (req, res) {
  res.send("<h1>Hello Join!</h1>");
});

app.post("/join", async (req, res) => {
  if (req.body == null) {
    res.status(500);
  }
  const { username } = req.body;
  const token = serverSideClient.createToken(username);
  try {
    await serverSideClient.updateUser(
      {
        id: username,
        name: username,
      },
      token
    );

    const admin = { id: "admin" };
    const channel = serverSideClient.channel("team", "general", {
      name: "General",
      created_by: admin,
    });

    await channel.create();
    await channel.addMembers([username, "admin"]);

    res
      .status(200)
      .json({ user: { username }, token, api_key: process.env.STREAM_API_KEY });
  } catch (err) {
    res.status(500);
  }
});

const server = app.listen(process.env.PORT || 5500, () => {
  const { port } = server.address();
  console.log(`Server running on PORT ${port}`);
});
