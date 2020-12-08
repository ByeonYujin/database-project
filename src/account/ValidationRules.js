import validator from "validator";
import JoiPW from "joi-password-complexity"

const PasswordValidator = JoiPW({
    min: 6,
    max: 50,
    numeric: 1,
    symbol: 1,
    requirementCout: 2
})

export const VALID = ""
export const ERROR = {
    EMPTY: "empty",

    NOT_EMAIL: "not email",
    NOT_EQUAL: "not equal",
    NOT_NUM: "not number",

    WEAK_PW: "weak password",
    DIGIT: "digit not equal"
}

export const NO_RULE = () => VALID

export const EMAIL_RULE = (data) => {
    if (validator.isEmpty(data)) {
        return ERROR.EMPTY
    }
    if (validator.isEmail(data)) {
        return VALID
    }
    else {
        return ERROR.NOT_EMAIL
    }
}

export const PASSWORD_RULE = (data) => {
    const {error} = PasswordValidator.validate(data)
    return error ? ERROR.WEAK_PW : VALID
}

export const NOT_EMPTY_RULE = (data) => {
    return validator.isEmpty(data) ? ERROR.EMPTY : VALID
}

export const EQUAL_RULE = (data, comparison) => {
    return validator.equals(data, comparison) ? VALID : ERROR.NOT_EQUAL
}

export const NUMBER_RULE = (data) => {
    return validator.isNumeric(data) ? VALID : ERROR.NOT_NUM
}

export const DIGIT_RULE = (digit) => (data) => {
    return data.toString().length === digit ? VALID : ERROR.DIGIT
}