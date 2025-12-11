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




app.get("/", (req, res) => {
    res.send('FundMate is running')
})


run().catch(console.dir);
app.listen(port, () => {
    console.log(`FundMate server running on ${port}`);

})