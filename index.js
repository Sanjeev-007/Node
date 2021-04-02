
const express=require('express');
const jwt= require('jsonwebtoken');
const app=express();
const bodyParser = require("body-parser");
const { check, validationResult } = require('express-validator');

app.get('/api', (req, res)=> {
    res.json({
        message: 'Welcome to API'
    });
});
app.use(bodyParser.json());


// Profile 
app.post('/api/profile', verifyToken, (req, res)=> {
    jwt.verify(req.token, 'secretkey', (err, data) => {
        if(err){
            res.sendStatus(403);
        }else{
            res.json({
                message: 'Porfile is Here',
                data
            });
        }
    })
    
});

// Signin API
app.post('/api/login',[
    check('email').isEmail(),
    check('password').isLength({ min: 5 })
  ], (req,res)=> {
    const user={
        email: 'brad@gmail.com',
        password: 'brad321'
    }
    if(user.email === req.body.email && user.password === req.body.password ){
    jwt.sign({user: user}, 'secretkey'/*,{expiresIn: '300s' }*/, (err, token)=> {
        if(err){
            return err;
        }
        res.json({
            token,
            message: 'succesfully signed IN'
        });
    
    });
    }else{
        res.sendStatus(403);
    }
});

// Verifying Tokens

function verifyToken(req,res, next){
    const bearerHeader = req.headers['authorization'];
    if(typeof bearerHeader !== 'undefined'){
        const bearer = bearerHeader.split(' ');
        const bearerToken=bearer[1];
        req.token= bearerToken;
        next();
    }else{
        res.sendStatus(403);
    }
}

app.listen(5000, ()=>console.log('Server started at 5000'));

