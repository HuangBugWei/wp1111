import path from "path";
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import db from './db';
import routes from './routes';

const app = express();
if (process.env.NODE_ENV === "development") {
  app.use(cors());
}
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/', routes);

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, "../frontend", "build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"));
  });
}

const port = process.env.PORT || 4000;
app.listen(port, () =>
console.log(`Example app listening on port ${port}!`),
);
// app.get('/', (req, res) => {
//     res.send('Received a GET HTTP method');
//     });
//     app.post('/', (req, res) => {
//     console.log(req.body.text);
//     res.send('Received a POST HTTP method');
//     });
//     app.put('/', (req, res) => {
//     res.send('Received a PUT HTTP method');
//     });
//     app.delete('/', (req, res) => {
//     res.send('Received a DELETE HTTP method\n');
//     });

console.log("trying connect db")
db.connect();
console.log("db finally connected!")