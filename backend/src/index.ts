import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const port = process.env.PORT || 8080;

// Connections and Listeners

// Connecting to database
connectToDatabase()
  .then(() => {
    // Start the server and listen on port 8080
    // Log "Server Started" to the console once the server is running
    app.listen(port, () =>
      console.log("Server Started & Connceted to Database")
    );
  })
  .catch((error) => console.log(error));
