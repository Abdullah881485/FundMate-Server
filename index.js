const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const cors = require('cors');
// const admin = require("firebase-admin");
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.awdvvgg.mongodb.net/?appName=Cluster0`;


// Initialize Firebase Admin SDK

// index.js
// const decoded = Buffer.from(process.env.FIREBASE_SERVICE_KEY, "base64").toString("utf8");
// const serviceAccount = JSON.parse(decoded);

// admin.initializeApp({
//     credential: admin.credential.cert(serviceAccount)
// });


// middleware
app.use(cors())
app.use(express.json())

// const verifyFirebaseToken = async (req, res, next) => {
//     const authorization = req.headers.authorization
//     if (!authorization) {
//         return res.status(401).send({ message: 'Unauthorized access' })
//     }
//     const token = authorization.split(' ')[1]

//     if (!token) {
//         return res.status(401).send({ message: 'Unauthorized access' })
//     }


//     try {
//         const decoded = await admin.auth().verifyIdToken(token)
//         req.token_email = decoded.email;
//         next()
//     } catch {
//         return res.status(401).send({ message: 'Unauthorized access' })
//     }

// }


const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

app.get("/", (req, res) => {
    res.send('FundMate is running')
})

async function run() {
    try {
        // await client.connect();

        const db = client.db("FundMate_db")
        const loanCollection = db.collection('allLoan')
        const applicationCollection = db.collection('allApplication')
        const userCollection = db.collection('allUsers')

        app.post("/allLoan", async (req, res) => {
            const newLoan = req.body;
            const result = await loanCollection.insertOne(newLoan)
            res.send(result)
        })
        app.patch("/allLoan/:id", async (req, res) => {
            try {
                const loanId = req.params.id;
                const updatedLoan = req.body;

                const query = { _id: new ObjectId(loanId) };

                const updatedDoc = {
                    $set: updatedLoan,
                };

                const result = await loanCollection.updateOne(query, updatedDoc);
                res.send(result);

            } catch (error) {
                console.log(error);
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
        app.delete("/allLoan/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await loanCollection.deleteOne(query)
            res.send(result)
        })
        app.get("/availableLoan", async (req, res) => {
            const cursor = loanCollection.find({ showOnHome: true }).limit(6);
            const result = await cursor.toArray();
            res.send(result);
        });
        app.patch("/availableLoan/:id", async (req, res) => {
            const loanId = req.params.id;
            const { showOnHome } = req.body;
            // console.log(value);

            const query = {
                _id: new ObjectId(loanId)
            }
            const updatedDoc = {
                $set: {
                    showOnHome: showOnHome
                }
            }

            const result = await loanCollection.updateOne(query, updatedDoc)

            res.send(result);
        });
        app.get("/allLoan", async (req, res) => {
            const cursor = loanCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        });

        app.get("/loanDetails/:id", async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await loanCollection.findOne(query)
            res.send(result)
        })
        app.get("/users", async (req, res) => {
            try {
                const page = parseInt(req.query.page) || 1;
                const limit = parseInt(req.query.limit) || 10;
                const skip = (page - 1) * limit;

                const users = await userCollection
                    .find()
                    .skip(skip)
                    .limit(limit)
                    .toArray();

                const totalUsers = await userCollection.countDocuments();

                res.send({
                    users,
                    totalUsers,
                    page,
                    totalPages: Math.ceil(totalUsers / limit),
                });

            } catch (error) {
                console.error(error);
                res.status(500).send({ message: "Internal Server Error" });
            }
        });
        app.post("/users", async (req, res) => {
            const newUser = req.body;
            newUser.createdAt = new Date()
            const email = newUser.email
            const existUser = await userCollection.findOne({ email })
            if (existUser) {
                return res.send({ message: 'user exist' })
            }
            const result = await userCollection.insertOne(newUser)
            res.send(result)
        })
        app.patch("/users/:id", async (req, res) => {
            const userId = req.params.id
            const query = { _id: new ObjectId(userId) }
            const updatedRole = req.body
            const update = {
                $set: updatedRole
            }
            const result = await userCollection.updateOne(query, update)
            res.send(result)
        })
        app.get('/users/:email/role', async (req, res) => {
            const email = req.params.email;
            const query = { email }
            const user = await userCollection.findOne(query);
            res.send({ role: user?.role || 'Borrower' })
        })
        app.get("/allApplication", async (req, res) => {
            const cursor = applicationCollection.find()
            const result = await cursor.toArray();
            res.send(result);
        })
        

        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // await client.close();
    }
}
run().catch(console.dir);
app.listen(port, () => {
    console.log(`FundMate server running on ${port}`);

})