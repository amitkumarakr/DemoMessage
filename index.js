const express = require("express");
const app = express();
const mongoose = require("mongoose");

const path = require("path");
const Chat = require("./models/chat");
const methodOverride = require("method-override")
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs");
app.use(methodOverride("_method"));
main().catch(err => console.log(err))

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/snapchat');
  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.get('/',(req,res) =>{
    res.send("Hello MongoDB!"); 
})
app.get('/chats', async (req, res) => {
    let chats = await Chat.find({});
    // console.log(chats);
    res.render('index.ejs',{chats});
  });
app.get("/chat/new",(req,res) =>{
    res.render('new.ejs');
})
app.post("/chats",(req,res) =>{
    let {from,to,msg} = req.body;
    let newChat =   new Chat({
        from: from,
        to: to,
        msg: msg,
        createdAt: new Date()  // current date and time as the creation date for the chat message.  This can be adjusted as needed.  For example, you might want to store the creation date in a separate field.  The 'createdAt' field is of type Date in Mongoose.  For more information, see https://mongoosejs.com/docs/guide.html#timestamps.
    })
    newChat.save()
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
    res.redirect("/chats")
})

app.get("/chats/:id/edit",async (req,res) =>{
   let { id } = req.params;
   let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
})
app.put("/chats/:id", async (req,res) =>{
    let { id } = req.params;
    let { newmsg } = req.body;
    console.log(newmsg);
    let updatechat = await Chat.findByIdAndUpdate(id, {msg : newmsg},{new: true})
    // console.log(updatechat);
    res.redirect("/chats")
})
//destroy
app.delete("/chats/:id", async (req,res) =>{
let { id } = req.params;
let DeletedChat = await Chat.findByIdAndDelete(id);
console.log(DeletedChat);
 res.redirect("/chats")
})
app.listen(3000,() => {
    console.log(`App is listening on the port 3000`);
});


