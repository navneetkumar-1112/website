const express = require("express");
const sqlite3 = require("sqlite3").verbose();
//1. import the DB tool
const app = express();
const port = 3000;

// 2. Connect to the Database
const db = new sqlite3.Database("./wallpapers.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    //If connection works , log success AND create teh table
    console.log("Server connected to the wallpaper database.");
    db.run(
      "CREATE TABLE IF NOT EXISTS wallpapers (id INTEGER PRIMARY KEY,url TEXT)"
    );
  }
});

//Allow the public to see the images folder
app.use("/images", express.static("images"));

// Allow the public to see the main website (index.html)
app.use(express.static("public"));

//Define the endpoint to get all wallpapers
app.get("/api/wallpapers", (req, res) => {
  //SQL Command: "SELECT * FROM wallpapers"
  db.all("SELECT * FROM wallpapers", [], (err, rows) => {
    if (err) {
      // If the database fails, tell the user "500 Server Error"
      res.status(500).json({ error: err.message });
      return;
    }
    // If it works , send the data (rows) as JSON
    res.json({ wallpapers: rows });
  });
});

// Start the server and wait for customers
app.listen(port, () => {
  console.log(`server is running at http://localhost:${port}`);
});
