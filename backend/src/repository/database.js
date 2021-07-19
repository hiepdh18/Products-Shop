const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/Shop', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to Database!!!");
    })
    .catch((err) => {
        console.log("Not Connected to Database ERROR!!!", err);
    });
mongoose.set('useFindAndModify', false);