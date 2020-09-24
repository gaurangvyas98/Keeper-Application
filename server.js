// Import npm packages
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 8080; // Step 1

const {MONGOURI} = require('./Config/keys');

mongoose.connect(MONGOURI,{
    useNewUrlParser:true,
    useUnifiedTopology: true

})
mongoose.connection.on('connected',()=>{
    console.log("conneted to mongo yeahh")
})
mongoose.connection.on('error',(err)=>{
    console.log("err connecting",err)
})

require('./models/user')
require('./models/notes')


// Data parsing
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
app.use(require('./routes/auth'))
app.use(require('./routes/notes'))



if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
// HTTP request logger
app.use(morgan('tiny'));

app.listen(PORT, console.log(`Server is starting at ${PORT}`));