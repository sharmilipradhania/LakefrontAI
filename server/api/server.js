const mysql = require('mysql2');
const express = require('express');
const session = require('express-session');
const path = require('path');

const connection = mysql.createConnection({
	host     : 'localhost',
    port     : '3306',
	user     : 'root',
	password : '12345678',
	database : 'LakefrontAIDB'
});

const app = express();

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
// http://localhost:3000/auth
app.post('/auth1', (request, response)=> {
	// Capture the input fields
	let username = request.body.username;
	let password = request.body.password;
    console.log(username);
	// Ensure the input fields exists and are not empty
	if (username && password) {
		// Execute SQL query that'll select the account from the database based on the specified username and password
		connection.query('SELECT * FROM users WHERE name = ? AND password = ?', [username, password], function(error, results, fields) {
			// If there is an issue with the query, output the error
			if (error) {
                console.log(error);
                throw error;}
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				request.session.loggedin = true;
				request.session.username = username;
				// Redirect to home page
				//response.redirect('/home');
				response.json({ result: 'sucess',msg: 'Login successfullly' });
			} else {
                response.json({ result: 'error',msg: 'Incorrect Username and/or Password!' });
				
			}			
			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/register', (request, response)=> {
	// Capture the input fields
	//let firstname = request.body.firstname;
//	let lastname = request.body.lastname;
	let email = request.body.email;
	let password = request.body.password;
	// let country = request.body.country;
	// let state = request.body.state;
	// let city = request.body.city;
	// let street = request.body.street;
	// let zip = request.body.zip;
	console.log("---tttt----");
	console.log(password);
	if ( password && password ) {
		connection.query('INSERT INTO `users` ( `first_name`, `last_name`, `email`,`country`, `state`, `city`,`street`, `zip_code`, `password`) VALUES (?, ?, ?,?, ?, ?,?,?,?)', [firstname,lastname,email,country,state,city,street,zip , password], function(error, results, fields) {
			if (error) {
                console.log(error);
                throw error;}
			// If the account exists
			if (results.length > 0) {
				// Authenticate the user
				// request.session.loggedin = true;
				// request.session.username = username;
				// // Redirect to home page
				console.log("surcsss");
				//response.redirect('/home');
				response.json({ result: 'sucess',msg: 'Register successfullly' });
			} else {
                response.json({ result: 'error',msg: 'Some error while register' });
				
			}	


		});
	} else {
		response.send('Please enter All required field');
		response.end();
	}
	//INSERT INTO `users` ( `first_name`, `last_name`, `email`,`country`, `state`, `city`,`street`, `zip_code`, `password`) VALUES ('jitu', 'jitutest', 'test@test.com','IND', 'UK', 'Doon','stree1', '232323', 'test!12@');

    console.log(email);
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

app.listen(3000);