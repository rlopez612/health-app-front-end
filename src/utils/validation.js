/* eslint-disable no-useless-escape */
/**
 * @name isValidEmail
 * @description checks if email is a valid format
 * @param {string} email
 * @return boolean
 */
export const isValidEmail = (email) => /^\S+@\S+\.\S+$/.test(email);

/**
 * @name isValidSocial
 * @description checks if ssn is of valid format xxx-xx-xxxx, only digits
 * @param {string} date
 * @return boolean
 */
export const isValidSocial = (ssn) => /^(\d{3}-?\d{2}-?\d{4}|XXX-XX-XXXX)$/.test(ssn);

/**
 * @name isValidNumber
 * @description checks if number contains digits only, and larger than 0
 * @param {number} number
 * @return boolean
 */
export const isValidNumber = (number) => /^[0-9]*$/.test(number);

/**
 * @name isValidName
 * @description checks if string is valid character including hyphens and apostrophe
 * @param {string} field
 * @return boolean
 */
export const isValidName = (field) => /^[a-zA-Z]+(?:[\s-'][a-zA-Z]+)*$/.test(field);

/**
 * @name isValidZipcode
 * @description checks if string is valid character including hyphens and apostrophe
 * @param {string} field
 * @return boolean
 */
export const isValidZipcode = (field) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(field);
