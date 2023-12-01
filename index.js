import { createServer } from "http";
import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
	res.send("Welcome to budgeting app");
});
app.listen(port, () => {
	console.log(`Listening on ${port}`);
});
