require('./models/User');
require('./models/Track');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');

const requireAuth = require('./middleware/requireAuth');


const app = express();

app.use(bodyParser.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
    'mongodb+srv://admin:passwordpassword@cluster0-odrdr.mongodb.net/test?retryWrites=true&w=majority';


mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useCreateIndex: true
});

mongoose.connection.on('connected', () => {
    console.log('connected mongo');
});
mongoose.connection.on('error', (err) => {
    console.error('Error connected', err);
});

app.get("/", requireAuth, (req, res) => {
    res.send(`Your email ${req.user.email}`);

});


app.listen(3000, () => {
    console.log('connected express')
})