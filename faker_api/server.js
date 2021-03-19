const express = require("express");
const faker = require("faker");
const port = 8000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

class Address {
	constructor(st, city, state, zip, ctry) {
		this.street = st;
		this.city = city;
		this.state = state;
		this.zipCode = zip;
		this.country = ctry;
	}
}

class User {
	constructor(id, fN, lN, pN, eA, pW, q) {
		this._id = id;
		this.firstName = fN;
		this.lastName = lN;
		this.phoneNumber = pN;
		this.email = eA;
		this.password = pW;
		this.quote = q;
	}
}

class Company {
	// constructor(id, name, st, city, state, zip, ctry) {
	constructor(id, name, addr, s) {
		this._id = id;
		this.name = name;
		this.address = addr;
		this.slogan = s;
	}
}

var users = [];
var companies = [];

app.get("/api/users/new", (req, res) => {
	res.json(
		new User(
			Math.floor(Math.random() * 1000000),
			faker.name.firstName(),
			faker.name.lastName(),
			faker.phone.phoneNumber(),
			faker.internet.email(),
			faker.internet.password(),
			faker.hacker.phrase()
		)
	);
});

app.get("/api/companies/new", (req, res) => {
	res.json(
		new Company(
			Math.floor(Math.random() * 1000000),
			faker.company.companyName(),
			new Address(
				faker.address.streetAddress(),
				faker.address.city(),
				faker.address.state(),
				faker.address.zipCode(),
				faker.address.country()
			),
			faker.company.catchPhrase()
		)
	);
});

app.get("/api/user/company", (req, res) => {
	const temp = {
		user: new User(
			Math.floor(Math.random() * 1000000),
			faker.name.firstName(),
			faker.name.lastName(),
			faker.phone.phoneNumber(),
			faker.internet.email(),
			faker.internet.password(),
			faker.hacker.phrase()
		),
		company: new Company(
			Math.floor(Math.random() * 1000000),
			faker.company.companyName(),
			new Address(
				faker.address.streetAddress(),
				faker.address.city(),
				faker.address.state(),
				faker.address.zipCode(),
				faker.address.country()
			),
			faker.company.catchPhrase()
		),
	};
	res.json(temp);
});

// if we want to get a user with a specific id, we can make the id a part of the url
// be sure to preface the id variable with a `:` colon
app.get("/api/users/:id", (req, res) => {
	// we can get this `id` variable from req.params
	const idx = req.params.id - 1;
	console.log(idx);
	// assuming this id is the index of the users array we could return one user this way
	res.json(users[idx]);
});

app.get("/api/users", (req, res) => {
	res.json(users);
});

app.post("/api/users", (req, res) => {
	// req.body will contain the form data from Postman or from React
	console.log(req.body);
	// we can push it into the users array for now...
	// later on this will be inserted into a database
	// users.push(req.body);
	users.push(
		new User(
			users.length + 1,
			faker.name.firstName(),
			faker.name.lastName(),
			faker.phone.phoneNumber(),
			faker.internet.email(),
			faker.internet.password(),
			faker.hacker.phrase()
		)
	);
	// we always need to respond with something
	res.json({ status: "ok" });
});

app.put("/api/users/:id", (req, res) => {
	// we can get this `id` variable from req.params
	const idx = req.params.id - 1;
	// assuming this id is the index of the users array we can replace the user like so
	// users[idx] = req.body;
	users[idx] = new User(
		idx + 1,
		faker.name.firstName(),
		faker.name.lastName(),
		faker.phone.phoneNumber(),
		faker.internet.email(),
		faker.internet.password(),
		faker.hacker.phrase()
	);
	// we always need to respond with something
	res.json({ status: "ok" });
});

app.delete("/api/users/:id", (req, res) => {
	// we can get this `id` variable from req.params
	const idx = req.params.id - 1;
	// assuming this id is the index of the users array we can remove the user like so
	users.splice(idx, 1);
	// we always need to respond with something
	res.json({ status: "ok" });
});

app.get("/api/companies/:id", (req, res) => {
	const idx = req.params.id - 1;
	console.log(idx);
	res.json(companies[idx]);
});

app.get("/api/companies", (req, res) => {
	res.json(companies);
});

app.post("/api/companies", (req, res) => {
	console.log(req.body);
	companies.push(
		new Company(
			companies.length + 1,
			faker.company.companyName(),
			new Address(
				faker.address.streetAddress(),
				faker.address.city(),
				faker.address.state(),
				faker.address.zipCode(),
				faker.address.country()
			),
			faker.company.catchPhrase()
		)
	);
	res.json({ status: "ok" });
});

app.put("/api/companies/:id", (req, res) => {
	const idx = req.params.id - 1;
	companies[idx] = new Company(
		idx + 1,
		faker.company.companyName(),
		new Address(
			faker.address.streetAddress(),
			faker.address.city(),
			faker.address.state(),
			faker.address.zipCode(),
			faker.address.country()
		),
		faker.company.catchPhrase()
	);
	res.json({ status: "ok" });
});

app.delete("/api/companies/:id", (req, res) => {
	const idx = req.params.id - 1;
	companies.splice(idx, 1);
	res.json({ status: "ok" });
});

// req is short for request
// res is short for response
app.get("/api", (req, res) => {
	res.send("This message is from our express api server");
});

const server = app.listen(port, () =>
	console.log(`Server is locked and loaded on port ${server.address().port}!`)
);
