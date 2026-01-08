const sqlite3 = require("sqlite3").verbose();

//connected to the DB. If the "wallpaper.db" if it doesn't exist , it i screated.
const db = new sqlite3.Database("./wallpapers.db", (err) => {
  if (err) {
    console.error("Error opening database: " + err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

db.serialize(() => {
  //Create the "Wallpapers" table with 4 columns
  db.run(`CREATE TABLE IF NOT EXISTS wallpapers(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        image_url TEXT,
        tags TEXT
        )`);

  // Prepare the insertion command (The "Insert Machine")
  const stmt = db.prepare(
    "INSERT INTO wallpapers (title, image_url, tags) VALUES (?, ?, ?)"
  );

  //Run the machine for each wallpaper
  // IMPORTANT: Make sure these filenames match your real files exactly !
  stmt.run(
    "Forest Guardian",
    "images/wallpaper1_result.webp",
    "Fantasy, Nature"
  );
  stmt.run("Sky Island", "images/wallpaper2_result.webp", "Adventure, Sky");
  stmt.run("Desert Warrier", "images/wallpaper3_result.webp", "Game, Sand");

  //Turn off the machine
  stmt.finalize();
  console.log("Database initialized with 3 wallpapers.");
  // Close the db.serialize block here
});
// Close the connection
db.close();
