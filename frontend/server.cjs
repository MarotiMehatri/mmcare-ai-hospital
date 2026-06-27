const jsonServer = require("json-server");

const app = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

app.use(middlewares);

//Request Logger
app.use((req, res, next) => {
  console.log(`${req.method}${req.url}`);
  next();
});

//Routes
app.use(router);

//Global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err);
  res.status(500).json({
    message: "Internal Server Error",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`JSON Server running at http://localhost:${PORT}`);
});
