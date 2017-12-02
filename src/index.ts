import { Application } from 'express';
import express = require('express');
import * as graphqlHTTP from 'express-graphql';

const mongoose = require('mongoose');

import schema from './graphql';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<dbuser>:<dbPassword>@ds023603.mlab.com:23603/graphql-api', {
  useMongoClient: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log('Successfully connected to DB');
});

const app: Application = express();
app.get('/', (req, res) => {
  res.send('Hello World, this is from graphQl APIs');
});

// Graph QL API endpoint

app.use(
  '/graphql',
  graphqlHTTP(() => ({
    schema,
    graphiql: true,
    pretty: true
  }))
);

app.listen(3000, () => {
  console.log('GraphQl API running on port 3000');
});
