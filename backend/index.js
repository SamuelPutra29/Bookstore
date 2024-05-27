import express, { response } from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from "mongoose";
import {Book} from './models/bookModels.js';


const app = express();

app.get('/', (req, res) => {
    console.log(req);
    return res.send('Hello World!');
});

//Route for save a new book
app.post('/books', async (request, response) => {
    try {
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'Title, author and publish year are required',
            });
        }
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});    
};
});

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('App connected to database');
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });