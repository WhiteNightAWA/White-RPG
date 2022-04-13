const dotenv = require("dotenv");
dotenv.config();

const { MongoClient, ServerApiVersion } = require('mongodb');
const url = `mongodb+srv://BOT:${process.env.PASSWORD}@whiterpg.snm4l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client
    .connect()
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
const ServerData = client.db("ServerData")
const UserData = client.db("UserData")
const Main = UserData.collection("Main")
module.exports = class User {
    constructor(userID) {
        this.id = userID
        this.data = null
    }
    async loadData () {
        this.data = await Main.findOne({ "_id": this.id.toString() })
        return this.data
    }
}