// const bcrypt = require("bcrypt");
// const password = '1234';

// const getPW = () => {
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(password, salt)

//     console.log(hash)
// }
// getPW()

const sc = require('./security');
console.log(sc.decrypt("b8e082176fd5f5bb2a734640ad369f184e128250d05b415166908ed51e75abb4b7375f2f3bb8d6ce"))

// const db = require("./models");

// db.post.create({
//     title: "Hello",
//     context: "헬로",
//     writer: "5b99102e-01e9-4ce2-a4eb-eb291938eea4"
// })
// .then(post => {
//     const postId = 
// })