const express = require('express');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3001;

const app = express()

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// routes here


mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialapi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
const db = mongoose.connection

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});