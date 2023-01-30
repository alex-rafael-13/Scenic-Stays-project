const { validationResult } = require('express-validator');

// middleware for formatting errors from express-validator middleware
// (to customize, see express-validator's documentation)
const handleValidationErrors = (req, _res, next) => {
    const validationErrors = validationResult(req);
  
    // console.log(validationErrors)
    if (!validationErrors.isEmpty()) {
      const errors = validationErrors
        .array()
        .map((error) => [error.param, error.msg]);
      
        let errObj = {} 
        errors.forEach(error => {
          errObj[error[0]] = error[1]
        })
  
      const err = Error('Validation Error.');
      err.errors = errObj;
      err.status = 400;
      err.title = 'Bad request.';
      next(err);
    }
    next();
};
  
module.exports = {
    handleValidationErrors
};
