import { createServer } from "http";

createServer((req, res) => {
	res.write("Welcome to budgeting app");
	res.end();
});
