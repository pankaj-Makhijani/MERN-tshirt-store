const express = require("express");

const  app = express();
const port = 7000;

app.get("/",(req,res) => {
    return res.send("Hello there");
    
});

const admin=(req,res) => {
    return res.send("this is admin's dashboard");    
};

const isadmin=(req,res,next) => {
    return res.send("This is isadmin's block");    
    next();
};

app.get("/admin",isadmin,admin);

app.get("/login",(req,res) => {
    return res.send("User Logged in Successfully");
    
});

app.get("/signup",(req,res) => {
    return res.send("User signed up Successfully");
    
});

app.listen(port,()=>{
    console.log("Server is up and running...")
});
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })