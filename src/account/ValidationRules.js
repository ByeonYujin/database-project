import validator from "validator";

export const VALID = ""
export const ERROR = {
    EMPTY: "empty",
    NOT_EMAIL: "not email",
    NOT_EQUAL: "not equal",
    NOT_NUM: "not number"
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

export const NOT_EMPTY_RULE = (data) => {
    return validator.isEmpty(data) ? ERROR.EMPTY : VALID
}

export const EQUAL_RULE = (comparison) => (data) => {
    return validator.equals(data, comparison) ? VALID : ERROR.NOT_EQUAL
}

export const NUMBER_RULE = (data) => {
    return validator.isNumeric(data) ? VALID : ERROR.NOT_NUM
}