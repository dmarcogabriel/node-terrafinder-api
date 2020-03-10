const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.port || 3000;
const router = express.Router();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());


router.use(function(req,res,next){
    console.log("Intercepted by Middlware!");
    next();
});

router.get('/', (req,res) => {
    res.json({"message": "Test route ok!"});
});

app.use('/api', router);
app.listen(PORT, () => {
    console.log("server is up and running");
});