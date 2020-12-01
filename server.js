const path = require("path");
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const db = require("./db/db"); // 데이터베이스 연동

app.use(express.static(path.join(__dirname, "public")));

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));