/**
 * @name isValidEmail
 * @description checks if email is a valid format
 * @param {string} email
 * @return boolean
 */
export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

/**
 * @name isValidDate
 * @description checks if date is a valid format of xx-xx-xxxx
 * @param {string} date
 * @return boolean
 */
export const isValidDate = (date) => /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/.test(date);

/**
 * @name isValidNumber
 * @description checks if number is greater than zero
 * @param {number} number
 * @return boolean
 */
export const isValidNumber = (number) => number > 0;
