//jshint esversion:6

const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req,res){
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    const data = {
     members : [
       {
         email_address : email,
         status : "Subscribed",
         merge_fields : {
           FNAME : firstName,
           LNAME : lastName
         }
       }
     ]
   };

    const jsonData = JSON.stringify(data);
    const url = "https://us12.api.mailchimp.com/3.0/lists/56540c709e";

    const options = {
      method : "POST",
      auth : "Ouhassi1:9b8c01704e54d179c32e66149634b420-us12"
    }

    const request=  https.request (url, options, function(response){
     if  (response.statusCode=== 200) {
       res.send ("Successfully subscribed!");
     } else {
       res.send ("There was an error signing up, please try again!");
     }
      response.on("data", function(data){
        console.log(JSON.parse(data));
      })
    })
    request.write(jsonData);
    request.end();
});

app.listen (process.env.PORT || 3000, function(){
  console.log ("Server is running on port 3000.");
});




// API Key
// 25764cd4d99332c32abc330d91be36ee-us12

// List Id
// 56540c709e
