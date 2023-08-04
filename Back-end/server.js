//load expres Library :
const express=require('express');
// load cors Library :
const cors=require('cors');
// Load mysql library :
const mysql=require('mysql');

//Define port :
const port=3000;

//  Create Instance of express server
const app=express();

// let  server cors free:
app.use(cors());

//Let express to accepts incoming form data 
//i)x-url-encoded[post]
//ii)JSON 
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// Seeting up MYSQL connection string :
const con=mysql.createConnection({
    'host':'127.0.0.1',
    'user':'root',
    'password':'',
    'database':'my_db'
});
// Testing the connections :
con.connect((err)=>{
    if(err) throw err;
    else
    console.log('Successfully connecteed to MYSQL DataBase');
})


// Create a basic get request :

app.get('/',(req,res)=>{
    res.send("<h1>Welcome To Express ....!</h1>");
});

// Create a post request :
app.post('/submit',(req,res)=>{
    // res.status(200).json({
    //     'submitedData':req.body
    // });
    let name=req.body.name;
    let phone=req.body.phone;
    let email=req.body.email;
    let pass1=req.body.pass1
    // pasing SQL comamnd 
    let SQL=`INSERT INTO users(name,phone,email,pass1) 
    VALUES('${name}','${phone}','${email}','${pass1}')`;
    con.query(SQL,(error,result)=>{
        if(error) throw error;
        else
        res.status(200).json({
            'message':'SignUp seccessfull .....'
        });
    });
});


// Binding port number or starting the server :

app.listen(port,()=>{
  console.log(`Sever has started at ${port}`);
});

