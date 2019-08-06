const express = require("express");
const path = require("path");

const members = require("./routes/api/members");
// const bodyParser = require("body-parser");

const app = express();

const PORT = process.env.PORT || 5000;

// middleware
// app.use((req, res, next) => {
//   console.log("hellooooooooooooooooooooo");
//   next();
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Pug
app.set("view engine", "pug");

app.use("/contacts", function(request, response) {
  response.render("contacts", {
    title: "Мои контакты",
    emailsVisible: true,
    emails: ["gavgav@mycorp.com", "mioaw@mycorp.com"],
    phone: "+1234567890"
  });
});

// REST
app.use("/api/members", members);

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Send 1 static file
// app.get("/", (req, res) => {
//   res.sendFile(path.join(__dirname, "public", "index.html"));
// });

app.listen(PORT, console.log(`Server started on port ${PORT}`));
