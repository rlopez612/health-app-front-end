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
 * @param {string} ssn
 * @return boolean
 */
export const isValidSocial = (ssn) => /^\d{3}-\d{2}-\d{4}$/.test(ssn);

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
 * @description checks if zipcode is digits only in format XXXXX or XXXXX-XXXX
 * @param {string} field
 * @return boolean
 */
export const isValidZipcode = (field) => /^[0-9]{5}(?:-[0-9]{4})?$/.test(field);

/**
 * @name isValidDate
 * @description checks if date is in format YYYY-MM-DD
 * @param {string} date
 * @return boolean
 */
export const isValidDate = (date) => /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/.test(date);

/**
 * @name isValidPrice
 * @description checks if number is valid digit, can include . for decimals
 * @param {string} price
 * @return boolean
 */
export const isValidPrice = (price) => /^[0-9]\d{0,9}(\.\d{1,2})?%?$/.test(price);

/**
 * @name isValidVisitCode
 * @description checks if visitCode follows format (LDL DLD)
 * @param {code} code
 * @return boolean
 */
export const isValidVisitCode = (code) => /[a-zA-Z]\d[a-zA-Z]\s\d[a-zA-Z]\d$/.test(code);

/**
 * @name isValidBillingCode
 * @description checks if billingCode follows format (DDD.DDD.DDD-DD)
 * @param {code} code
 * @return boolean
 */
export const isValidBillingCode = (code) => /^\d\d\d\.\d\d\d\.\d\d\d-\d\d$/.test(code);

/**
 * @name isValidIcd10
 * @description checks if icd10 follows format (LDD)
 * @param {code} code
 * @return boolean
 */
export const isValidIcd10 = (code) => /^[a-zA-Z]\d\d$/.test(code);

/**
 * @name hasOnlyWhiteSpace
 * @description checks if string has only whitespace
 * @param {string} field
 * @return boolean
 */
export const hasOnlyWhiteSpace = (field) => /^[ \t\r\n]*$/.test(field);
