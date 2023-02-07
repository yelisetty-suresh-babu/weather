const exp = require("express");
const bdy = require("body-parser");
const https = require("https");

const { response } = require("express");
const app = exp();
app.use(exp.static("public"));
app.set("view engine", "ejs");
app.use(bdy.urlencoded({ extended: true }));

app.listen(process.env.PORT||3000, () => console.log("server started"));

let a = [];
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
let d;

app.post("/", (req, res) => {
  val = req.body.city;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${val}&appid=43a49f00dd12393eea4c23be9ec10b7d&units=metric`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      d = data;

      if (req.body.city != "") {
        res.redirect("/infor");
      }
    });
});

app.get("/infor", (req, res) => {
  let ur = `https://openweathermap.org/img/wn/${d.weather[0].icon}@2x.png`;

  res.render("ans", {
    tempa: d.main.temp + "˚c",
    city_name: d.name,
    desc: d.weather[0].description.toUpperCase(),
    max_t: d.main.temp_max,
    min_t: d.main.feels_like,
    hum: d.main.humidity,
    ws: d.wind.speed,
    icon: ur,
  });
});
app.post("/infor", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
{
  /*
 
<h3 class="feels"><%=desc%></h3>

<div class="remain">
    <p>Max-Temp : <%=max_t%></p>
    <p>Min-Temp : <%=min_t%></p>
    <p>Humidity : <%=hum%></p>
    <p>Wind-Speed:<%=ws%></p>
</div>
 */
}
