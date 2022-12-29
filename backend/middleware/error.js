const ErrorHandler = require('../utils/errorHandler');

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.message = err.message || "Internal Server Error";

   //wrong MongoDB Id Error
   if(err.name === "BSONTypeError" || err.name === "CastError"){
      const message = `Recurso no encontrado. ${err.path} invalido`;
      err = new ErrorHandler(400, message);
   }
   
   res.status(err.statusCode).json({
      success: false,
      message: err.message,
   });
}  