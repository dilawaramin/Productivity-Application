import express from 'express'
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import taskObject from './task.js';


dotenv.config();

// initialization
const app = express() 
app.use(cors());
app.use(express.json());


// MongoDB initialization
// dotenv.config();
// mongoose.connect(process.env.MONGO_URI);

const uri = process.env.MONGO_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions)
  .then(() => {
    console.log("Connected to MongoDB successfully!");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

console.log('MONGO_URI:', process.env.MONGO_URI);



const Task = mongoose.model('Task', taskObject)


/*-----------------------------------------------------
 MONGODB OPERATIONS
 -----------------------------------------------------*/

 // GET route to retrieve all tasks from DB
 app.get("/api/tasks", async (req, res) => {

    try {
        // query all tasks from DB
        const tasks = await Task.find();
        //console.log(tasks);

        // build and send response as JSON
        res.json(tasks);
        console.log("Data Sent!")

    } catch (error) {
        // catch any errors with retrieving tasks
        console.error(error);
        res.status(500).send("Error retrieving tasks from the database");
    }
    }
 );


 // POST route to receive tasks from client
app.post('/api/tasks', async (req, res) => {
    console.log('Post was called')  // debugging print

    //  extract task object from request
    const newTask = req.body;

    // VALIDATION REMOVED: Task properties will be verified on client side

    // create task and save to database
    const builtTask = new Task(newTask);
    await builtTask.save()
    .then(res.status(201).json({ message: "Task added successfully!" }));
});


//  PATCH route to update completion status
app.patch('/api/tasks/:id', async (req, res) => {

    // get task id parameter from URL
    const {id} = req.params;
    const intId = parseInt(id);

    // find and update task
    let task = await Task.findOne({id: intId});
    task.completed = true;
    await task.save()
    .then(res.status(204).send(), console.log('patch response sent'));

});


// PATCH route to update description
app.patch(`/api/tasks/desc/:id`, async (req, res) => {

    // get task id parameter from URL
    const {id} = req.params;
    const intId = parseInt(id);

    // extract task description
    const newTask = req.body;

    // update database, send response
    let updatedTask = await Task.findOne({id: intId});
    updatedTask.description = newTask.description;
    await updatedTask.save()
    .then(res.status(204).send(), console.log('patch response sent'));

});


//  DELETE route to delete tasks
app.delete('/api/tasks/:id', async (req, res) => {

    // get task id parameter from URL
    const {id} = req.params;
    const intId = parseInt(id);

    await Task.deleteOne( {id: intId} )
    .then(res.status(204).send(), console.log('task deleted'));

})



/*-----------------------------------------------------
 LOCAL JSON FILE DATA STORAGE METHODS
 -----------------------------------------------------*/
/*
// GET route to send tasks
app.get("/api/tasks", (req, res) => {

    // create filepath variable
    const basePath = process.cwd();
    const filePath = path.join(basePath,  'tasks.json')

    // extract data from file to send to server
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.log("Error reading file: ", err);
            return res.status(500).json({ message: "Failed to load tasks."})
        }

        // convert data read from JSON back to JSON and send
        res.json(JSON.parse(data));
        console.log("Data Sent!")
    })

});
*/


/*
// POST route to receive tasks from client
app.post('/api/tasks', (req, res) => {
    console.log('Post was called')
    const basePath = process.cwd();
    const filePath = path.join(basePath, 'tasks.json')

    // extract task from request
    const newTask = req.body;

    // Check if the request body is empty or essential fields are missing
    if (!newTask || Object.keys(newTask).length === 0 || !newTask.title || !newTask.description || !newTask.dueDate) {
        return res.status(400).json({ message: "Invalid request: Task data is incomplete or missing." });
    }

    // convert existing tasks.json into a string for mutation
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file: ", err);
            return res.status(500).json({ message: "Failed to read tasks."});
        }

        // Add new task to string
        const tasks = JSON.parse(data);
        tasks.push(newTask);

        // Write the string back to the tasks file
        fs.writeFile(filePath, JSON.stringify(tasks, null, 2), 'utf8', (err) => {
            // check for errors, and then send success response
            if (err) {
                console.error("Error writing file: ", err);
                return res.status(500).json({ message: "Failed to update tasks."});
            }
            res.status(201).json({ message: "Task added successfully!" });
        })
    })
})
*/


/* 
// PATCH route to update completion status of task
app.patch('/api/tasks/:id', (req, res) => {
    // get task id parameter from URL
    const {id} = req.params;
    const intId = parseInt(id);

    // file path 
    const basePath = process.cwd();
    const filePath = path.join(basePath, 'tasks.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file: ", err);
            return res.status(500).json({message: "Failed to read file."});
        }

        // turn tasks from JSON into a JS array for mutability
        let tasks = JSON.parse(data);

        // map completion of task
        const updatedTasks = tasks.map(task => {
            if (task.id == intId) {
                task.completed = true;
                return {...task, completed: true};
            }
            return {...task}
        })

        // write the array of tasks back to JSON file
        fs.writeFile(filePath, JSON.stringify(updatedTasks, null, 2), 'utf8', (err) => {

            // catch any write errors
            if (err) {
                console.error("Error writing file: ", err);
                return res.status(500).json({ message: "Failed to update tasks."});
            }
            // no content to send back, but operation successful
            res.status(204).send();
        })
    })
});
*/


/* 
// DELETE route to delete tasks in database
app.delete(`/api/tasks/:id`, (req, res) => {
    // get task id parameter from URL
    const {id} = req.params;

    // file path 
    const basePath = process.cwd();
    const filePath = path.join(basePath, 'tasks.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error("Error reading file: ", err);
            return res.status(500).json({message: "Failed to read file."});
        }

        // turn tasks from JSON into a JS array for mutability
        let tasks = JSON.parse(data);
        // filter the requested deletion out of tasks
        const filteredTasks = tasks.filter(task => task.id !== parseInt(id));

        // write the array of tasks back to JSON file
        fs.writeFile(filePath, JSON.stringify(filteredTasks, null, 2), 'utf8', (err) => {

            // catch any write errors
            if (err) {
                console.error("Error writing file: ", err);
                return res.status(500).json({ message: "Failed to update tasks."});
            }
            // no content to send back, but operation successful
            res.status(204).send();
        })
    })

});
*/


// start server
const PORT = process.env.PORT || 5004;
app.listen(PORT, () => {console.log(`Server started on port ${PORT}`)}); 