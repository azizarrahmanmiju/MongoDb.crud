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

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        await client.close();
    }
}
run().catch(console.dir);

//===mongo db end

app.get('/', (req, res) => {
    res.send('GET request to the homepage');
})

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});







