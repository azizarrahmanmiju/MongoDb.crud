///import files
const express = require('express');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
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
const getcoll = db.col

async function run() {
    try {
        await client.connect();
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

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
    res.send(result,);
});



app.get('/', (req, res) => {
    res.send('Server Is running');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});







