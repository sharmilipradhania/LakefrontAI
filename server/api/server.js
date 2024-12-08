const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');
const cors = require('cors');

const connection = mysql.createConnection({
	host     : 'localhost',
    port     : '3306',
	user     : 'root',
	password : 'A#kash1987',
	database : 'LakefrontAIDB'
});
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to MySQL:', err.message);
    } else {
        console.log('Connected to MySQL successfully!');
    }
});

const app = express();
app.use(cors());
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/


app.get('/', function (request, res) {
    let username = request.query.username;
	//let password = request.body.password;
    res.send('Hello World! '+username);
  });


  app.post('/userslist', (req, res) => {
    var json = req.body;
    // const obj = JSON.parse(json);
    console.log(json.username);
    // Save the data of user that was sent by the client
  
    // Send a response to client that will show that the request was successfull.
    res.send({
      message: 'New user was added to the list ',
    });
  });

app.post('/auth', (request, response)=> {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
    console.log(username);
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE email = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) {
                console.log(error);
                throw error;}
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				console.log("Authetication successful");
				request.session.loggedin = true;
				request.session.username = username;
				return response.status(200).json({ result: 'success', msg: 'Login successfully' });
			} else {
                return response.status(500).json({ result: 'error',msg: 'Incorrect Username and/or Password!' });
				
			}			
			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/register', (request, response)=> {

	let email = request.body.email;
	let password = request.body.password;

    console.log("Register request received with:", email, password);

    // Validate input fields
    if (!email || !password) {
        return response.status(400).json({ result: 'error', msg: 'Please provide email and password' });
    }

    // Insert into database
    const query = 'INSERT INTO `users` (`email`, `password`) VALUES (?, ?)';
    connection.query(query, [email, password], (error, results) => {
        if (error) {
            console.error("Database error:", error.message);
            return response.status(500).json({ result: 'error', msg: 'Error while registering user' });
        }
        // Registration successful
        console.log("User registered successfully");
        return response.status(200).json({ result: 'success', msg: 'Registered successfully' });
    });
});

// http://localhost:3000/home
app.get('/home', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.username + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(4000, () => {
	console.log('Server is running on http://localhost:4000');
  });