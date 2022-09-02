1- create the root folder
2- create the backend folder
3- in the root folder in terminal enter the command npm init to create the package.json - add all the required fields - change (test to start)
4- in the backend folder create the file server.js
5- create a console log command in the server file to make sure it responds
6- test the server in terminal by the command npm start
7- add the server dependencies npm i express dotenv mongoose colors bcryptjs
8- npm i -D nodemon
9- edit the scripts again to the nodemon "start": "node backend/server.js",
"server": "nodemon backend/server.js"
10- test with npm run server
11- create .gitignore with node_modules .env
12- make a github commit --> git add . ---> git commit -m 'your comment'
13- in the server.js file, import express and import dotenv and listen to the port
14- create .env file and add in it the the PORT = your port number and NODE_ENV = development
15- replace the variables with .env values in the server file

---

Creating Route
const app = express()
app.get('/', (req,res)=>{
res.send('Hello')
})

16- create a folder called routes inside it create a file called userRoutes.js
17- inside this folder import express, create a variable router from express.Router() and export it module.exports = router
18- create a post request
router.post('/', (req,res)=>{res.send('Register Route')})
19- to use this route go to server.js and add
app.use('/api/users', require('./routes/userRoutes')) to connect it to this file

20- in the backend create a folder called controllers inside it create a file named userController.js
21- inside this file create a function called registerUser
const registerUser = (req,res)=>{
res.send('Register Route')
}
const loginUser = (req,res)=>{
res.send('login Route')
}
module.exports = { loginUser, registerUser }

22- in the userRoutes file import these functions and replace it with arguments
to be like this
router.post('/', registerUser)
router.post('/login', loginUser)
23- create errorHandle function under folder called middleware in the file named errorMiddleware.js
24-import the function in the server.js file and use it app.use(errorHandler)
