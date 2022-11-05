const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());

/*
 dbuser3
 cxeVPkPxEHe1Iwi6
*/


const uri = "mongodb+srv://dbuser3:cxeVPkPxEHe1Iwi6@cluster0.biy4zxs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
     try{
          const userCollectiion = client.db('nodeMongoCrud').collection('user');
          // read 
          app.get('/users', async(req, res) =>{
               const query = {};
               const cursor = userCollectiion.find(query);
               const users = await cursor.toArray();
               res.send(users);
          })         
          
          // create 
          app.post('/users', async (req, res)=>{
               const user = req.body;
               console.log(user);
               const result = await userCollectiion.insertOne(user);
               res.send(result);
          })
           // dynamically get data for update 
           app.get('/users/:id', async(req, res)=>{
               const id = req.params.id;
               const query = {_id: ObjectId(id)};
               const result = await userCollectiion.findOne(query);
               res.send(result);
          })

          // doing update 
          app.put('/users/:id',async(req, res)=>{
               const id = req.params.id;
               const filter = {_id: ObjectId(id)};
               const user = req.body;
               const option = {upsert: true}
               const updatedUser = {
                    $set: {
                         name: user.name,
                         adress: user.adress,
                         email: user.email
                    }
               }
               const result = await userCollectiion.updateOne(filter, updatedUser, option);
               res.send(result);               
          })

          // delete
          app.delete('/users/:id', async(req, res) =>{
               const id = req.params.id;
               const query = {_id: ObjectId(id)}
               const result = await userCollectiion.deleteOne(query);
               console.log(result)
               res.send(result); 
          })
     }
     finally{

     }
}
run().catch(err => console.error(err))



app.get('/', (req, res) =>{
     res.send('node mongo crud server running!!')
})

app.listen(port, ()=>{
     console.log(`server is running at port ${port}`)
})