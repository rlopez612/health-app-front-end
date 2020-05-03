export const isValidEmail = email => /^\S+@\S+\.\S+$/.test(email);

export const isValidDate = date => /(0[1-9]|1[012])[- /.](0[1-9]|[12][0-9]|3[01])[- /.](19|20)\d\d/.test(date);

export const isValidNumber = number => number > 0 && number % Math.floor(number) === 0;