const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Beau Reescano",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Beau Reescano",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMsg: "Welcome to the blank help page!",
    name: "Beau Reescano",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }

  const addressInput = req.query.address;

  geocode(addressInput, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({
        error,
      });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error,
        });
      }
      res.send({
        forecast: forecastData,
        address: req.query.address,
        location,
        latitude,
        longitude,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    msg: "Help article not found",
    title: "Help 404",
    name: "Beau Reescano",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    msg: "Page not found",
    title: "404",
    name: "Beau Reescano",
  });
});

// app.com
// app.com/help
// app.com/about

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
