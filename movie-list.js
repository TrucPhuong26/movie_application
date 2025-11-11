const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path"); // Import the path module

const uri = "mongodb+srv://movieuser:Vy123456@cluster0.y4v65fr.mongodb.net/?appName=Cluster0";
// MongoDB connection URI
const client = new MongoClient(uri);
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "template")));

async function main() {
try {
await client.connect();
console.log("Connected to MongoDB");

const database = client.db("MovieDB"); // tên DB trùng với tên trong URI
const collection = database.collection("MovieCollection"); // tên collection của bạn

app.set("views", path.join(__dirname, "views"));
// Trang chủ
  app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "template", "movie-list.html"));
});

// Serve Add_movie-form.html
app.get("/add-movie-form.html", (req, res) => {

console.log("Received request for /add-movie-form.html");

// Serve the HTML form

res.sendFile(__dirname + "/template/add-movie-form.html");

});
// Serve book-seats-form.html
app.get("/book-seats-form.html", (req, res) => {

res.sendFile(__dirname + "/template/book-seats-form.html");

});
app.get("/get-movies", async (req, res) => {
const category = req.query.category;
// Get the selected category from query parameters
try {
// Fetch movies of the selected category
// from the database
const movies = await collection.find({ Category:

category }).toArray();

res.status(200).json(movies);
} catch (error) {
console.error("Error fetching movies:", error);
res.status(500).json({ error: "Failed to fetch movies" });
}
});
app.get("/get-all-movies", async (req, res) => {

try {
// Fetch movies of the selected category from the

database

const movies = await collection.find().toArray();
res.status(200).json(movies);
} catch (error) {
console.error("Error fetching movies:", error);
res.status(500).json({ error: "Failed to fetch movies" });
}
});
app.get("/get-movie-details", async (req, res) => {
const movieName = req.query.name; // Get the selected
// movie name from query parameters
try {
// Fetch movie details based on the selected

// movie name from the database

const movie = await collection.findOne({ "Movie name": movieName });
if (movie) {
res.status(200).json({
Description: movie["Description"],
Actors: movie["Actors"],
});
} else {
res.status(404).json({ error: "Movie not found" });
}
} catch (error) {
console.error("Error fetching movie details:",

error);

res.status(500).json({ error: "Failed to fetch movie details" });
}
});
// Handle the form submission and add a movie
app.post("/add-movie", async (req, res) => {
  try {
    // Insert a new movie document into the MongoDB
    await collection.insertOne(req.body);
    console.log("Added movie to the database");

    // Show alert then redirect to home page
    res.send(`
      <script>
        alert("Movie added successfully!");
        window.location.href = "/";
      </script>
    `);
  } catch (error) {
    console.error("Error adding movie:", error);

    // Render an error message on the same page
    res.status(500).send(`
      <script>
        alert("Failed to add the movie. Please try again!");
        window.location.href = "/";
      </script>
    `);
  }
});

// Handle booking seats
app.post("/book-seats", async (req, res) => {
try {
// Retrieve movie information from the request
const movieNameToBook = req.body["Movie name"];

const seatsToBook = parseInt(req.body["seats-to-book"]);

// Check if the movie exists
const existingMovie = await collection.findOne({
"Movie name": movieNameToBook,
});
if (!existingMovie) {
console.log("Movie not found in the database.");
return res.send("Movie not found in the database.");
}
// Retrieve the available seats from the existing movie document

const availableSeats = existingMovie["Available Seats"]; //Here field name should be same with databse field name

if (seatsToBook <= availableSeats) {
// Calculate the updated available seats
const updatedAvailableSeats = availableSeats -

seatsToBook;

// Update the document with new available seats
const result = await collection.updateOne(
{ "Movie name": movieNameToBook },
{ $set: { "Available Seats":

updatedAvailableSeats } } 
//Here field name should be same with databse field name

);
if (result.modifiedCount === 1) {
// Display an alert message on the same page
const alertMessage = `Booking successful for

${seatsToBook} seat(s) in ${movieNameToBook}`;

return res.send(`
<script>
alert("${alertMessage}");
window.location.href = "${"/"}";
</script>
`);
} else {
console.log("Failed to update available seats");
const errorMessage = "Failed to update available seats";

// Display an alert on the same page
return res.send(`
<script>
alert("${errorMessage}");
window.location.href = "${"/"}";
</script>
`);
}
} else {
console.log(
`Not enough seats available for ${seatsToBook}

seat(s) in ${movieNameToBook}`

);
return res.send(
`Not enough seats available for ${seatsToBook}
seat(s) in ${movieNameToBook}` // This will display message

);
}
} catch (error) {
console.error("Error booking seats:", error);
return res.status(500).send("Failed to book seats");
}
});
} catch (error) {
console.error("Error connecting to MongoDB:", error);
}
}
main().catch(console.error);
app.listen(process.env.PORT || 3000, process.env.IP ||
"0.0.0.0", () => {
console.log("Server is running");
});