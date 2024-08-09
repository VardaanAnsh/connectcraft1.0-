const express=require("express");
const app=express();
const mysql2=require("mysql2");
const fileuploader=require("express-fileupload");
app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(fileuploader());

const congObj={
    host:"127.0.0.1",
    user:"root",
    password:"vardaan@123456789",
    database:"projectone",
    dateStrings:true,
}
const mysql=mysql2.createConnection(congObj);
mysql.connect(function(err)
{
    if(err==null)
        console.log("Connected to database");
    else
        console.log(err.message);
})


app.listen(3005,function(){
    console.log("Bale Bale : Server Started at port :3005");
});


app.get("/dologin", function (req, resp) {
    //resp.send(req.query);
    //console.log(req.query);
    const txtemail21 = req.query.emailgg;
    const loginpassw = req.query.passwordgg;
    console.log(txtemail21);
    
    mysql.query("select * from userss where emailid = ? and password1 = ? ", [txtemail21, loginpassw], function (err, resultJsonAry) {
        if (err) {
            console.log("Error in SQL query:", err.message);
            resp.send(err.message);
            return;
        }

        // console.log("Result from SQL query:", resultJsonAry);

        if (resultJsonAry.length == 1) 
        {
            if (resultJsonAry[0].status == 1)
            {
                const utype = resultJsonAry[0].utype;
                resp.send(utype);
            } 
             else 
            {
                resp.send("Your Account Is blocked !! Contact Admin");
            }
        } else {
            resp.send("Invalid email or password");
        }
    });
});




app.get("/",function(req,resp){
   
    let filePath=process.cwd()+"/public/index.html";
    resp.sendFile(filePath);
})

app.get("/loggs",function(req,resp){
    resp.send("Hello");
})
app.get("/spp",function(req,resp){//service provider profile

    let filepath=process.cwd()+"/public/service-providerprofile.html"
    resp.sendFile(filepath);
})

app.get("/signUP",function(req,resp)
{
    //create table users( emailid varchar(50) primary key,password1 varchar(30), utype varchar(20), dos date , status int  );
    const email=req.query.kuchEmail;
    const password1=req.query.passKuch;
    const utype=req.query.utypeKuch;
    const status=1;
       
       mysql.query("insert into userss values(?,?,?,current_date(),?)",[email,password1,utype,status],function(err)
       {
            if(err==null)
                resp.send("Record Saved Successfullyyy");

            else
                resp.send(err.message);
       })

})


app.get("/check-email",function(req,resp)
{
    mysql.query("select * from customerprof1 where emailidd=?",[req.query.searchemail],function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
}),

app.get("/search-service-providers",function(req,resp){//search service providers 

    let filepath=process.cwd()+"/public/searchproviders.html"
    resp.sendFile(filepath);
})



app.get("/cp",function(req,resp){//customer profile

    let filepath=process.cwd()+"/public/profile-customer.html"
    resp.sendFile(filepath);
})
app.get("/cd",function(req,resp){//customer dashboard

    let filepath=process.cwd()+"/public/customer-dashboard.html"
    resp.sendFile(filepath);

})
app.get("/usermanager",function(req,resp){//customer dashboard

    let filepath=process.cwd()+"/public/users-manager.html"
    resp.sendFile(filepath);

})
app.get("/admindash",function(req,resp){//customer dashboard

    let filepath=process.cwd()+"/public/admin-dash.html"
    resp.sendFile(filepath);

})

app.get("/all-providers",function(req,resp){//customer dashboard

    let filepath=process.cwd()+"/public/all-providers.html"
    resp.sendFile(filepath);

})

app.get("/all-customers",function(req,resp){//customer dashboard

    let filepath=process.cwd()+"/public/all-customers.html"
    resp.sendFile(filepath);

})
app.get("/spd",function(req,resp){//customer dashboard

    let filepath=process.cwd()+"/public/service-providerdashboard.html"
    resp.sendFile(filepath);



app.get("/saveeee",function(req,resp)
{
    // create table customerprof1( emailidd varchar(50) primary key,firstname varchar(30), lastname varchar(20), contnum  varchar(20) , address   varchar(70), city  varchar(20),state  varchar(20) );
     console.log("vedbhfbdhvhf");
    let filenamee;
    if (req.files == null) filenamee = "nopic.jpg";
    else {
      filenamee = req.files.ppic.name;
      let path = process.cwd() + "/public/uploads/" + filenamee;
      req.files.ppic.mv(path);
    }

    req.body.ppic = filenamee;
    const emailidd=req.body.emaill;
    const firstname=req.body.firstnamee;
    const lastname=req.body.lastnamee;
    const contnum=req.body.contactnumber11;
    const address=req.body.streetaddresss;
    const city=req.body.cityy;
    const state=req.body.regionn;
    
    
       
       mysql.query("insert into customerprof1 values(?,?,?,?,?,?,?,?)",[emailidd,firstname,lastname,contnum,address,city,state,filenamee],function(err)
       {
            if(err==null)
                resp.send("Record Saved Successfullyyy");

            else
                resp.send(err.message);
       })

})
app.post("/profileserviceprovider",function(req,resp)
{
    let filename;
    if (req.files == null) filename = "nopic.jpg";
    else {
      filename = req.files.ppic.name;
      let path = process.cwd() + "/public/uploads/" + filename;
      req.files.ppic.mv(path);
    }

    req.body.ppic = filename;

   // create table serviceproviderprof1(emailidddd varchar(50) primary key,name varchar(90),contactnum varchar(30),gender varchar(20),category varchar(30),firm varchar(70),website varchar(60),location varchar(200),estsince varchar(20),picname varchar(200),otherinfo varchar(500));
    const emailidddd=req.body.skuchemail;
    const name=req.body.sname;
    const contactnumber =req.body.sconnum;
    const gender=req.body.sgender;
    const category=req.body.scategory;
    const firm=req.body.sfirm;
    const website=req.body.swebsite;
    const location=req.body.slocation;
    const estsince=req.body.sestsince;
   
    const otherinfoo=req.body.sotherinfo;
    
       
       mysql.query("insert into serviceproviderprof1 values(?,?,?,?,?,?,?,?,?,?,?)",[emailidddd,name,contactnumber,gender,category,firm,website,location,estsince,filename,otherinfoo],function(err)
       {
            if(err==null)
                resp.send("Record Saved Successfullyyy");

            else
                resp.send(err.message);
       })

})
app.get("/post-tasks",function(req,resp)
{
   // create table tasks( emailiddd varchar(50) primary key, taskcategory varchar(30),addresss varchar(150),city varchar(40), uptodate date ,wtbd varchar(200) ) ;
    const rid=0;
    const emailiddd9=req.query.kuchemail;
    const  taskcat9=req.query.towname;
    const address9=req.query.addressname;
    const city9 =req.query.cityyname;
    const upto99=req.query.Uptodatekuch7;
    const wtbd9=req.query.worktobedonename;
    
    
       
       mysql.query("insert into tasks values(?,?,?,?,?,?,?)",[rid,emailiddd9,taskcat9,address9,city9,upto99, wtbd9],function(err)
       {
            if(err==null)
                resp.send("Jobs Posted Successfullyyy");

            else
                resp.send(err.message);
})

})

// app.get("/fetch-this",function(req,resp){
//             mysql.query("select * from customerprof1 where emailidd=?",[req.query. kuchemailfetch],function(err,resultJsonAry){
//                     resp.send(resultJsonAry);
                    
//                 })
//               })






app.post("/change-pass",function(req,resp)
{
    
    const emailsame=req.body. requiredemail;
    const passwordold=req.body. requiredpass;
    const passwordnew=req.body.requiredpass1;

    //create table userss( emailid varchar(50) primary key,password1 varchar(30), utype varchar(20), dos date , status int  );

       
       mysql.query("update  userss set password1=? where emailid=? and password1=?",[passwordnew,emailsame,passwordold],function(err)
       {
            if(err==null)
                resp.send("Record Updated Successfullyyy");
            else
                resp.send(err.message);
       })
    })
});
app.post("/change-passwordd",function(req,resp)
{
    
    const emails=req.body. requiredemaill;
    const passwordoldd=req.body. requiredpasss;
    const passwordneww=req.body.requiredpass11;

    //create table userss( emailid varchar(50) primary key,password1 varchar(30), utype varchar(20), dos date , status int  );

       
       mysql.query("update  userss set password1=? where emailid=? and password1=?",[passwordneww,emails,passwordoldd],function(err)
       {
            if(err==null)
                resp.send("Record Updated Successfullyyy");
            else
                resp.send(err.message);
       })
    })


app.get("/angular-fetch-all",function(req,resp){
    mysql.query("select * from userss",function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
});
app.get("/angular-fetch-distinct-locations",function(req,resp){
    mysql.query("select distinct location from serviceproviderprof1",function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
});
app.get("/angular-fetch-distinct-categories",function(req,resp){
    // console.log(req.query.selectedLocation);
    mysql.query("select distinct category from serviceproviderprof1 where location=?",[req.query.location],function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
});


app.get("/angular-fetch-all-providers",function(req,resp){
    mysql.query("select * from serviceproviderprof1",function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
});
app.get("/angular-search-all-providers",function(req,resp){
    mysql.query("select * from serviceproviderprof1",function(err,resultJsonArray){
            resp.send(resultJsonArray);
    })
});
app.get("/angular-fetch-all-customers",function(req,resp){
    mysql.query("select * from customerprof1",function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
});
app.get("/angular-fetch-one-card",function(req,resp){
    console.log(req.query.Locationn);
    mysql.query("select * from serviceproviderprof1 where location=? and category=?",[req.query.Locationn,req.query.categoryy],function(err,resultJsonAry){
            resp.send(resultJsonAry);
    })
});
app.get("/angular-delete",function(req,resp)
{
    const email=req.query.emailkuch;
    mysql.query("delete from userss where emailid=?",[email],function(err,result)
    {
         if(err==null)
         {
            if(result.affectedRows==1)
                      resp.send("Record Deleted Successfullyyy");
                    else
                    resp.send("Inavlid ID");
         }
         else
             resp.send(err.message);
    })

})
app.get("/angular-block",function(req,resp)
{
    const email4=req.query.emailkuch1;
    mysql.query("update userss set status=0 where emailid=?",[email4],function(err,result)
    {
         if(err==null)
         {
            if(result.affectedRows==1)
                      resp.send("User is blocked");
                    else
                    resp.send("Inavlid ID");
         }
         else
             resp.send(err.message);
    })

})
app.get("/angular-resume",function(req,resp)
{
    const email14=req.query.emailkuch123;
    mysql.query("update userss set status=1 where emailid=?",[email14],function(err,result)
    {
         if(err==null)
         {
            if(result.affectedRows==1)
                      resp.send("User is Resumed");
                    else
                    resp.send("Inavlid ID");
         }
         else
             resp.send(err.message);
    })

})