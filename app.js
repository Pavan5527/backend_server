const express= require("express");
const bodyParser= require("body-parser");
const request= require("request");
const https= require("https");

const app= express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));


app.get("/", function(req,res){
    res.sendFile(__dirname+"/signup.html");
})

app.post("/",function(req,res){
    const v1=req.body.fname
    const v2=req.body.mname
    const v3=req.body.lname
    
    const data={
        members: [{
            email_address: v3,
            status: "subscribed",
            merge_fields: {
                FNAME: v1,
                LNAME: v2 
            }
        }]
    };

    const jsonData=JSON.stringify(data);
    const url= "https://us13.api.mailchimp.com/3.0/lists/db0014f080"; 
    const Options={
        method: "POST",
        auth: "Pavan:29a1710ded0f69ee1634235463cf5d95-us13"
    }

    const request=https.request(url,Options, function(response){

        if(response.statusCode===200){
            res.sendFile(__dirname+"/success.html");
        }
        else{
            res.sendFile(__dirname+"/failure.html");
        }

        response.on("data",function(data){
            console.log(JSON.parse(data));
        })

        
    })

    request.write(jsonData);
    request.end();
})

app.post("/failure",function(req,res){
    res.redirect("/");
})

app.listen(process.env.PORT || 3000, function(){
    console.log("server is running on port 3000");
})