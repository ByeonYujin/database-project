// const bcrypt = require("bcrypt");
// const password = '1234';

// const getPW = () => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt)

//     console.log(hash)
// }
// getPW()

const sc = require('./security');
const baseurl = require('url-safe-base64');

const toSafeUrl = baseurl.encode("d9pgXY0pSb0ZJ24OIOucC28L/945+jTcTcFbezKWRym3N18vO7jWzg")
console.log(toSafeUrl)
console.log(sc.decrypt(toSafeUrl))

// const db = require("./models");

// db.post.create({
//     title: "Hello",
//     context: "헬로",
//     writer: "5b99102e-01e9-4ce2-a4eb-eb291938eea4"
// })
// .then(post => {
//     const postId = 
// })