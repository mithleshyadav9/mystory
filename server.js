var port = process.env.PORT || 3001;
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');
require('./db/mongoose.js');
var path = require('path');

var app = express();


// morgan middleware
app.use(morgan('dev'));

//cors
app.use(cors({origin: true}));

//body parser
app.use(bodyParser.json());

var userRoutes = require('./routes/user');
var storyRoutes = require('./routes/story');

app.use('/api/v1/',userRoutes);
app.use('/api/v1/story',storyRoutes);

// app.use(express.static(path.join(__dirname,'build')));
// app.get('*',function(req,res) {
//   res.sendFile(path.join(__dirname,'/build','index.html'));
// })


app.listen(port,() => {
  console.log(`Server listening to port ${port}. `);
});
