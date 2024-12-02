///import files
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const port = process.env.PORT || 5000;

//middleware ============
app.use(cors());
app.use(express.json());  //

///mongodb database

const uri = "mongodb+srv://azizarrahman01032003:MKAr9ci87DBiIaRK@cluster0.yzj1q.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

const db = client.db("Users_Database");
const dbcol = db.collection("Users");
let result;

async function run() {
    try {
        await client.connect();
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        result = await dbcol.find().toArray();


    } finally {
        // await client.close();
    }
}
run().catch(console.dir);

//===mongo db end
app.post('/users', async (req, res) => {
    const user = req.body;
    console.log(user)
    const result = await dbcol.insertOne(user);
    console.log(result, result.insertedIds)
    res.send(result);
});




app.get('/', (req, res) => {
    res.send(result);
})
app.post('/user', async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.send("Please Provide Username")
        }
        const user = await dbcol.findOne({ name: name });
        console.log(user);
        res.send(user);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: "Internal Server Error" });
    }
});
app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;

    const query = { _id: new ObjectId(id) };
    try {

        const result = await dbcol.deleteOne(query);

        if (result.deletedCount === 1) {
            res.send("User deleted");
        } else {
            res.send("User not found");
        }
    } catch (err) {
        res.status(500).send('Internal Server Error');
    }
});

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const { name } = req.body;
    const query = { _id: new ObjectId(id) };
    const updateDoc = { $set: { name: name } };
    const result = await dbcol.updateOne(query, updateDoc);
    if (result.modifiedCount > 0) {
        res.send("User updated" + name);
    } else {
        res.send("User not found");
    }

})



app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});







