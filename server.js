const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const path = require("path");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const complaintRoutes = require("./routes/submitComplaint");
const statusCheckerRoutes = require("./routes/statusChecker");
const adminRoutes = require("./routes/adminpanel");
const issueRoute = require("./routes/issue");
const careerRoutes = require("./routes/careerRoutes");







const cors = require("cors");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Correct session usage
app.use(
  session({
    secret: "samadhanSecret",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: "mongodb://localhost:27017/samadhaan",
    }),
  })
);

// ✅ Serve static frontend files
app.use(express.static(path.join(__dirname, "public")));

// ✅ Route for root
app.get("/", (req, res) => {
  res.redirect("/login.html");
});

// ✅ Auth routes
app.use("/auth", authRoutes); 
app.use("/cmp", statusCheckerRoutes);
app.use("/issue",issueRoute);
app.use("/courses", careerRoutes);

app.use("/admin", adminRoutes);

app.use("/complaints", complaintRoutes);


function isAuthenticated(req, res, next) {
  if (req.session.user) return next();
  res.redirect("/login.html");
}

app.get("/home.html", isAuthenticated, (req, res, next) => {
  next();
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
