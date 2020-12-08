const bcrypt = require("bcrypt");
const password = '1234';

const getPW = () => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    console.log(hash)
}

getPW()