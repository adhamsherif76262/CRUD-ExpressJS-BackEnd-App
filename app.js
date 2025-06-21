const Express = require("express");

const App = Express();
const Port = process.env.PORT || 5000;
const users = [];

const cors = require("cors");

// App.use(cors()); // ✅ Enable CORS for all routes

// OR more securely:
App.use(cors({ origin: "https://crud-next-app.netlify.app" }));

App.use(Express.json());

App.get("/users", (req,res)=>{
    if(users.length == 0){
        res.status(404).send("No Users Found !!")
    }else{
        res.status(200).send(users);
    }
})
App.get("/users/:id", (req,res)=>{
    if(req.params.id !== "" && req.params.id !== undefined && req.params.id !== null && req.params.id !== " "){
        const id = req.params.id;
        const user_index = users.findIndex((u)=> String(u.id) === id);
    
        if(users.length == 0){
            res.status(404).send("No Users Found !!")
            return
        }
        else if(user_index == -1){
            res.status(404).send("User Not Found !!");
            return
        }
        else{
            res.status(200).send(users[user_index]);
        }
    }
    else{
        res.status(404).send("User Not Found !!");
            return
    }
})
App.post("/users", (req,res)=>{
    console.log(req.body);
    const user = req.body;
    if (!user.id || !user.Name || !user.Age) {
        return res.status(400).send("Missing required user fields");
    }
    const user_exists = users.find((u)=> u.id === user.id);
    if(user_exists){
        res.status(400).send("This User Already Exists !!");
        return
    }
    users.push(user);
    res.status(201).send("Users Data Created Successfully ...");
})
App.put("/users/:id",(req,res)=>{
    const id = req.params.id;
    const user_index = users.findIndex((u)=> u.id === id);
    if(user_index == -1){
        res.status(404).send("User Not Found !!");
        return
    }
    const user = users[user_index];
    const {Name,Age,Gender,Height,Weight} = req.body;
    // user.ID = ID;
    user.Name = Name;
    user.Age = Age;
    user.Gender = Gender;
    user.Height = Height;
    user.Weight = Weight;
    res.status(200).send("User Data Updated Successfully !!");
})
App.delete("/users/:id", (req,res)=>{
    const id = req.params.id;
    const user_index = users.findIndex((u)=> u.id === id);
    if(user_index == -1){
        res.status(404).send("User Not Found !!");
        return
    }
    const new_users = users.splice(user_index,1)
    console.log(new_users)
    res.status(200).send("User Deleted Successfully ...")
})
App.delete("/users", (req,res)=>{

        users.length = 0;
        console.log(users)
        res.status(200).send("All Users Deleted Successfully ...")
    })



App.get("/hello", (req,res)=>{
    res.status(200).send("Hello World");
})


App.listen(Port, () =>{
    console.log("Server is running on port 5000");
})
