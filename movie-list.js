// const express = require("express");
// const { MongoClient } = require("mongodb");
// const bodyParser = require("body-parser");
// const session = require("express-session");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const path = require("path"); // Import the path module

// const uri =
//   process.env.MONGO_URI ||
//   "mongodb+srv://movieuser:Vy123456@cluster0.y4v65fr.mongodb.net/MovieDB?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   serverSelectionTimeoutMS: 10000,
// });

// // MongoDB connection URI
// //const client = new MongoClient(uri);
// const app = express();
// app.set("view engine", "ejs");
// // Use session middleware
// app.use(
// session({
// secret: "abc",
// resave: false,
// saveUninitialized: true,
// })
// );
// app.use(bodyParser.urlencoded({ extended: false }));

// app.use(express.static(path.join(__dirname, "template")));

// // Initialize passport middleware
// app.use(passport.initialize());
// app.use(passport.session());
// // Middleware to check if the user is authenticated
// function isAuthenticated(req, res, next) {
// if (req.session && req.session.authenticated) {
// return next();
// } else {
// res.redirect("/login");
// }
// }
// // Add the admin local strategy
// passport.use(
// "admin-local",
// new LocalStrategy(function (username, password, done) {
// if (username === "Admin" && password === "12345") {
// return done(null, { username: "Aptech" });
// }
// return done(null, false, {
// message: "Incorrect admin username or password",
// });
// })
// );
// passport.serializeUser(function (user, done) {
// done(null, user);
// });
// passport.deserializeUser(function (user, done) {
// done(null, user);
// });

// const users = [
// { id: 1, username: "abc", password: "123" },
// { id: 2, username: "user1", password: "user" },
// ];
// passport.use("user-local",new LocalStrategy(function (username, password, done) {
// const user = users.find((u) => u.username === username);
// if (!user) {
// return done(null, false, { message: "Incorrect username." });
// }
// if (user.password !== password) {
// return done(null, false, { message: "Incorrect password." });
// }
// return done(null, user);
// })
// );
// passport.serializeUser(function (user, done) {
// done(null, user.id);
// });
// passport.deserializeUser(function (id, done) {
// const user = users.find((u) => u.id === id);
// done(null, user);
// });

// async function main() {
// try {
// await client.connect();
// console.log("Connected to MongoDB");

// const database = client.db("MovieDB"); // tên DB trùng với tên trong URI
// const collection = database.collection("MovieCollection"); // tên collection của bạn

// //app.set("views", path.join(__dirname, "views"));
// // Trang chủ
//     app.get("/", (req, res) => {
//       res.sendFile(path.join(__dirname, "template", "wonderland.html"));
//     });

//     // Admin get and post


// // Admin login route
// app.get("/views/admin-login.ejs", function (req, res) {
// console.log("entered into admin-login page");
// res.render("admin-login");
// });
// // Admin login form
// app.post(
// "/admin-login",
// passport.authenticate("admin-local", {
// // successRedirect: path.join(__dirname, 'Templates','add-movie-form.html'),

// successRedirect: "/admin-dashboard",
// failureRedirect: "/admin-error",
// })
// );
// // Admin error route
// app.get("/admin-error", function (req, res) {
// console.log("getting an admin-error page");
// res.send(
// '<script>alert("Incorrect Admin username or password"); window.location.href = "/";</script>'
// );
// });
// // Admin dashboard route
// app.get("/admin-dashboard", function (req, res) {
// console.log("Entered into admin dashboard page");
// res.sendFile(__dirname + "/Templates/movie-list.html");
// });
// // User login route
// app.get("/views/login.ejs", function (req, res) {
// console.log("Entered into user-login page.");
// res.render("login");
// });
// // User login form
// app.post(
// "/user-local",
// passport.authenticate("user-local", {
// // successRedirect: path.join(__dirname, 'Templates','add-movie-form.html'),

// successRedirect: "/user-dashboard",
// failureRedirect: "/user-error",
// })
// );
// // User error route
// app.get("/user-error", function (req, res) {

// console.log("Entered into user login error.");
// // res.render("admin-error", { errorMessage: "Incorrect admin username or password" });
// // Display an alert on the same page
// res.send('<script>alert("Incorrect username or password");
//   window.location.href = "/";</script>');
// });
// // user dashboard route
// app.get("/user-dashboard", function (req, res) {
// console.log("Entered into user dashboard page");

// res.sendFile(__dirname + "/Templates/book-seats-form.html");

// });




//  app.get("/add-movie-form.html", (req, res) => {
//       res.sendFile(path.join(__dirname, "template", "add-movie-form.html"));
//     });

//   app.get("/book-seats-form.html", (req, res) => {
//       res.sendFile(path.join(__dirname, "template", "book-seats-form.html"));
//     });


// app.get("/get-movies", async (req, res) => {
//       const category = req.query.category;
//       try {
//         const movies = await collection.find({ Category: category }).toArray();
//         res.status(200).json(movies);
//       } catch (error) {
//         console.error("Error fetching movies:", error);
//         res.status(500).json({ error: "Failed to fetch movies" });
//       }
//     });


//  app.get("/get-all-movies", async (req, res) => {
//       try {
//         const movies = await collection.find().toArray();
//         res.status(200).json(movies);
//       } catch (error) {
//         console.error("Error fetching all movies:", error);
//         res.status(500).json({ error: "Failed to fetch all movies" });
//       }
//     });


// app.get("/get-movie-details", async (req, res) => {
//       const movieName = req.query.name;
//       try {
//         const movie = await collection.findOne({ "Movie name": movieName });
//         if (movie) {
//           res.status(200).json({
//             Description: movie["Description"],
//             Actors: movie["Actors"],
//           });
//         } else {
//           res.status(404).json({ error: "Movie not found" });
//         }
//       } catch (error) {
//         console.error("Error fetching movie details:", error);
//         res.status(500).json({ error: "Failed to fetch movie details" });
//       }
//     });

// app.post("/add-movie", async (req, res) => {
//       try {
//         await collection.insertOne(req.body);
//         console.log("Added movie to database");
//         res.send(`
//           <script>
//             alert("Movie added successfully!");
//             window.location.href = "/";
//           </script>
//         `);
//       } catch (error) {
//         console.error("Error adding movie:", error);
//         res.status(500).send(`
//           <script>
//             alert("Failed to add movie. Please try again!");
//             window.location.href = "/";
//           </script>
//         `);
//       }
//     });


//  app.post("/book-seats", async (req, res) => {
//       try {
//         const isAdmin = req.isAuthenticated() &&
// req.user.username === "Aptech";
//         const movieNameToBook = req.body["Movie name"];
//         const seatsToBook = parseInt(req.body["seats-to-book"]);

//         const existingMovie = await collection.findOne({
//           "Movie name": movieNameToBook,
//         });

//         if (!existingMovie) {
//           return res.send("Movie not found in the database.");
//         }

//         const availableSeats = existingMovie["Available Seats"];
//         if (seatsToBook <= availableSeats) {
//           const updatedAvailableSeats = availableSeats - seatsToBook;
//           const result = await collection.updateOne(
//             { "Movie name": movieNameToBook },
//             { $set: { "Available Seats": updatedAvailableSeats } }
//           );
// const redirectRoute = isAdmin ? '/admin-dashboard' :
// '/user-dashboard';
//         if (result.modifiedCount === 1) {
// // Display an alert and redirect to the appropriate

// route

// const alertMessage = `Booking successful for

// ${seatsToBook} seat(s) in ${movieNameToBook}`;

// return res.send(`
// <script>
// alert("${alertMessage}");
// window.location.href = "${redirectRoute}";
// </script>
// `);
// } else {
// console.log("Failed to update available seats");
// const errorMessage = "Failed to update available seats";

// // Display an alert on the same page
// return res.send(`
// <script>
// alert("${errorMessage}");
// window.location.href = "${redirectRoute}";
// </script>
// `);
// }
// }else {
// console.log(`Not enough seats available for
// ${seatsToBook} seat(s) in ${movieNameToBook}`);
// return res.send(`Not enough seats available for
// ${seatsToBook} seat(s) in ${movieNameToBook}`);
// }
// } catch (error) {
// console.error("Error booking seats:", error);
// return res.status(500).send("Failed to book seats");
// }
// });
// // Handle delete movie
// app.post("/delete-movie", async (req, res) => {
// const movieNameToDelete = req.body["Movie name"];
// try {
// // Check if the movie exists
// const existingMovie = await collection.findOne({
// "Movie name": movieNameToDelete,
// });
// if (!existingMovie) {
// console.log("Movie not found in the database");
// res.send("Movie not found in the database");
// } else {
// // Delete the movie from the collection
// const result = await collection.deleteOne({
// "Movie name": movieNameToDelete,
// });
// if (result.deletedCount === 1) {
// console.log("Movie deleted successfully");

// res.send(
// '<script>alert("Movie deleted successfully");
// window.location.href = "/admin-dashboard";</script>');

// } else {
// console.log("Failed to delete the movie");
// // Display an alert on the same page
// res.send('<script>alert("Failed to delete the movie");
// window.location.href = "/";</script>'

// );
// }
// }
// } catch (error) {
// console.error("Error deleting the movie:", error);
// res.status(500).send("Failed to delete the movie");
// }
// });
// // Handle updating available seats
// app.post("/update-seats", async (req, res) => {
// const movieNameToUpdate = req.body["Movie name"];
// const newAvailableSeats = parseInt(req.body["Available Seats"]); // Make sure the field name matches your MongoDB
// collection
// try {
// // Check if the movie exists
// const existingMovie = await collection.findOne({
// "Movie name": movieNameToUpdate,
// });
// if (!existingMovie) {
// console.log("Movie not found in the database");
// // Display an alert on the same page

// res.send(
// '<script>alert("Movie not found in the database"); window.location.href = "/";</script>'

// );
// } else {
// // Update the available seats for the movie
// console.log("Existing movie:", existingMovie);
// const result = await collection.updateOne(
// { _id: existingMovie._id }, 

// { $set: { "Available Seats": newAvailableSeats }
// } // Make sure the field name matches your MongoDB collection

// );
// console.log("Update operation result:", result);
// if (result.modifiedCount === 1) {
// const alertMessage = `Updated available seats for

// ${movieNameToUpdate} successfully`;
// console.log(alertMessage);

// res.send('<script>alert("${alertMessage}");
//   window.location.href = "/admin-dashboard";</script>');

// } else {
// console.log("Failed to update available seats");
// res.status(500).send("Failed to update available seats");
// }
// }
// } catch (error) {
// console.error("Error updating available seats:",

// error);

// res.status(500).send("Failed to update available seats");
// }
// });
// //logout
// app.get("/logout", function (req, res) {
// console.log("Logout page activated.");
// res.sendFile(__dirname + "/Templates/wonderland.html");
// });
// } catch (error) {
// console.error("Error connecting to MongoDB:", error);
// }
// }


// main().catch(console.error);
// app.listen(process.env.PORT || 3000, process.env.IP ||
// "0.0.0.0", () => {
// console.log("Server is running");
// });

const express = require("express");
const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const path = require("path");

const uri =
  process.env.MONGO_URI ||
  "mongodb+srv://movieuser:Vy123456@cluster0.y4v65fr.mongodb.net/MovieDB?retryWrites=true&w=majority";

const client = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
});

const app = express();
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // ✅ Thêm dòng này

app.use(
  session({
    secret: "abc",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "template")));

app.use(passport.initialize());
app.use(passport.session());

// ===== Passport cấu hình =====
passport.use(
  "admin-local",
  new LocalStrategy(function (username, password, done) {
    if (username === "Admin" && password === "12345") {
      return done(null, { username: "Aptech" });
    }
    return done(null, false, {
      message: "Incorrect admin username or password",
    });
  })
);

const users = [
  { id: 1, username: "abc", password: "123" },
  { id: 2, username: "user1", password: "user" },
];

passport.use(
  "user-local",
  new LocalStrategy(function (username, password, done) {
    const user = users.find((u) => u.username === username);
    if (!user) {
      return done(null, false, { message: "Incorrect username." });
    }
    if (user.password !== password) {
      return done(null, false, { message: "Incorrect password." });
    }
    return done(null, user);
  })
);

passport.serializeUser(function (user, done) {
  done(null, user.id || user.username);
});

passport.deserializeUser(function (id, done) {
  const user = users.find((u) => u.id === id);
  done(null, user || { username: "Aptech" });
});

// ===== ROUTES =====

async function main() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB");

    const database = client.db("MovieDB");
    const collection = database.collection("MovieCollection");

    // Trang chủ
    app.get("/", (req, res) => {
      res.sendFile(path.join(__dirname, "template", "wonderland.html"));
    });

    // Admin Login page
    app.get("/admin-login", (req, res) => {
      res.render("admin-login");
    });

    // Admin Login form
    app.post(
      "/admin-login",
      passport.authenticate("admin-local", {
        successRedirect: "/admin-dashboard",
        failureRedirect: "/admin-error",
      })
    );

    app.get("/admin-error", (req, res) => {
      res.send(
        '<script>alert("Incorrect admin username or password"); window.location.href = "/admin-login";</script>'
      );
    });

    // Admin dashboard
    app.get("/admin-dashboard", (req, res) => {
      res.sendFile(path.join(__dirname, "template", "movie-list.html"));
    });

    // User Login page
    app.get("/user-login", (req, res) => {
      res.render("login");
    });

    app.post(
      "/user-login",
      passport.authenticate("user-local", {
        successRedirect: "/user-dashboard",
        failureRedirect: "/user-error",
      })
    );

    app.get("/user-error", (req, res) => {
      res.send(
        '<script>alert("Incorrect username or password"); window.location.href = "/user-login";</script>'
      );
    });

    app.get("/user-dashboard", (req, res) => {
      res.sendFile(path.join(__dirname, "template", "book-seats-form.html"));
    });

    // Guest login route (không cần xác thực)
    app.get("/guest-login", (req, res) => {
      res.sendFile(path.join(__dirname, "template", "wonderland.html"));
    });

    // ==== Movie APIs ====
    app.get("/get-movies", async (req, res) => {
      const category = req.query.category;
      const movies = await collection.find({ Category: category }).toArray();
      res.status(200).json(movies);
    });

    app.get("/get-all-movies", async (req, res) => {
      const movies = await collection.find().toArray();
      res.status(200).json(movies);
    });

    app.get("/get-movie-details", async (req, res) => {
      const movieName = req.query.name;
      const movie = await collection.findOne({ "Movie name": movieName });
      if (movie) {
        res.status(200).json({
          Description: movie["Description"],
          Actors: movie["Actors"],
        });
      } else {
        res.status(404).json({ error: "Movie not found" });
      }
    });

    // Add movie
    app.post("/add-movie", async (req, res) => {
      await collection.insertOne(req.body);
      res.send(
        '<script>alert("Movie added successfully!"); window.location.href="/admin-dashboard";</script>'
      );
    });

    // Delete movie
    app.post("/delete-movie", async (req, res) => {
      const movieNameToDelete = req.body["Movie name"];
      const result = await collection.deleteOne({
        "Movie name": movieNameToDelete,
      });
      if (result.deletedCount === 1) {
        res.send(
          '<script>alert("Movie deleted successfully"); window.location.href="/admin-dashboard";</script>'
        );
      } else {
        res.send(
          '<script>alert("Failed to delete movie"); window.location.href="/admin-dashboard";</script>'
        );
      }
    });

    // Book seats
    app.post("/book-seats", async (req, res) => {
      const movieNameToBook = req.body["Movie name"];
      const seatsToBook = parseInt(req.body["seats-to-book"]);

      const existingMovie = await collection.findOne({
        "Movie name": movieNameToBook,
      });

      if (!existingMovie)
        return res.send("Movie not found in the database.");

      const availableSeats = existingMovie["Available Seats"];
      if (seatsToBook <= availableSeats) {
        const updatedAvailableSeats = availableSeats - seatsToBook;
        await collection.updateOne(
          { "Movie name": movieNameToBook },
          { $set: { "Available Seats": updatedAvailableSeats } }
        );
        res.send(
          `<script>alert("Booking successful for ${seatsToBook} seat(s) in ${movieNameToBook}"); window.location.href="/user-dashboard";</script>`
        );
      } else {
        res.send(
          `<script>alert("Not enough seats available!"); window.location.href="/user-dashboard";</script>`
        );
      }
    });

    app.get("/logout", (req, res) => {
      req.logout(() => {
        res.redirect("/");
      });
    });

    // Start server
    app.listen(process.env.PORT || 3000, () => {
      console.log("🚀 Server is running on Render or localhost");
    });
  } catch (error) {
    console.error("❌ Error connecting to MongoDB:", error);
  }
}

main().catch(console.error);
