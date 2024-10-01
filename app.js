const express = require('express');
const app = express();
const indexRoute = require('./routes/index');

app.set('view engine', 'ejs');
app.use(express.static('public')); 

app.use('/', indexRoute); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
