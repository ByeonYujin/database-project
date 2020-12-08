const bcrypt = require("bcrypt");
const password = '1234';

const getPW = () => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt)

    console.log(hash)
}

// getPW()


const passwordComplexity = require("joi-password-complexity").default;
const pwOpts = {
    min: 2,
    max: 30,
    numeric: 1,
    symbol: 1,
    requirementCount: 3,
}

console.log(passwordComplexity(pwOpts).validate("a1").error.details);