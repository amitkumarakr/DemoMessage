const mongoose = require("mongoose");
const Chat = require("./models/chat.js");

main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/snapchat");
}
  let allchats = [
    {
      to: "philip",
      from: "omkashyap",
      msg: "mark you calender",
      createdAt: new Date(),
    }
]

  Chat.insertMany(allchats)
    .then(() => {
      console.log("Chats inserted successfully!");
    })
    .catch((err) => {
      console.log("Error inserting chats:", err);
    });
