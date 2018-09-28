const express = require('express');
const mongodb = require('mongodb').MongoClient;
const dbRouter = express.Router();


const eventsData = [
  {
    name: 'Event 1',
    description: 'The first event. The first event. The first event. The first event. The first event. The first event.',
    date: '2016.01.01',
    time: '1:00 PM',
    duration: '1 hour',
    location: {
      streetAddr: '101 Main St.',
      city: 'Los Angeles',
    },
    capacity: 100,
  },
  {
    name: 'Event 2',
    description: 'The second event. The second event. The second event. The second event. The second event. ',
    date: '2017.02.02',
    time: '2:00 PM',
    duration: '2 hour',
    location: {
      streetAddr: '202 Main St.',
      city: 'Los Angeles',
    },
    capacity: 200,
  },
];



dbRouter.route('/AddEventData')
  .get(function(req, res) {

    // const url = 'mongodb://127.0.0.1:27017';
    const url = process.env.MONGODB_URL;
    mongodb.connect(url, function(err, dbConnection){

      // Reference a different database sharing the same connections for the data transfer
      var secondDb = dbConnection.db("eventsApp");

      const db = dbConnection.db('eventsApp');
      const collection = db.collection('events');
      collection.insertMany(eventsData, function(err, results){
        res.send(results);
        dbConnection.close();
      });

    });
    // res.send('asd1');
  });

module.exports = dbRouter;
