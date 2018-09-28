const express = require('express');

const eventRouter = express.Router();

const mongodbClient = require('mongodb').MongoClient;

// const eventsData = [
//   {
//     name: 'Event 1',
//     description: 'The first event. The first event. The first event. The first event. The first event. The first event.',
//     date: '2016.01.01',
//     time: '1:00 PM',
//     duration: '1 hour',
//     location: {
//       streetAddr: '101 Main St.',
//       city: 'Los Angeles',
//     },
//     capacity: 100,
//   },
//   {
//     name: 'Event 2',
//     description: 'The second event. The second event. The second event. The second event. The second event. ',
//     date: '2017.02.02',
//     time: '2:00 PM',
//     duration: '2 hour',
//     location: {
//       streetAddr: '202 Main St.',
//       city: 'Los Angeles',
//     },
//     capacity: 200,
//   },
// ];

eventRouter.route('/')
  .get(function(req, res) {

    // const url = 'mongodb://127.0.0.1:27017';
    const url = process.env.MONGODB_URL;
    mongodbClient.connect(url, { useNewUrlParser: true }, function(err, dbConnection){
      const db = dbConnection.db('eventsApp');
      const collection = db.collection('events');
      collection.find({}).toArray(function(err, results){

        res.render('events', {
          list: ['first EVENT', 'second EVENT', 'third EVENT'],
          nav: [
            { Link: 'Services', Text: 'Services' },
            { Link: 'Portfolio Foo', Text: 'Portfolio Foo' },
            { Link: 'About', Text: 'About' },
            { Link: 'Team', Text: 'Team' },
            { Link: 'Contact', Text: 'Contact' },
            { Link: 'Events', Text: 'Events' },
          ],
          events: results
        });

      });
    });
  });

eventRouter.route('/:id')
  .get(function(req, res) {
    const id = req.params.id;

    // const url = 'mongodb://127.0.0.1:27017';
    const url = process.env.MONGODB_URL;
    mongodbClient.connect(url, { useNewUrlParser: true }, function(err, dbConnection){
      const db = dbConnection.db('eventsApp');
      const collection = db.collection('events');

      const ObjectId = require('mongodb').ObjectId;
      const o_id = new ObjectId(id);
      collection.findOne(o_id, function(err, results){
        res.render('event', {
          list: ['first EVENT', 'second EVENT', 'third EVENT'],
          nav: [
            { Link: 'Services', Text: 'Services' },
            { Link: 'Portfolio Foo', Text: 'Portfolio Foo' },
            { Link: 'About', Text: 'About' },
            { Link: 'Team', Text: 'Team' },
            { Link: 'Contact', Text: 'Contact' },
            { Link: 'Events', Text: 'Events' },
          ],
          events: results
        });
      });
    });
  });

module.exports = eventRouter;
