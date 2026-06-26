import { ApiError } from "../utils/ApiError.js";

const errorHandler = (err, req, res, next) => {
  let error = err;

  // Check if it's an instance of our ApiError
  if (!(error instanceof ApiError)) {
    // If not, we convert it into an ApiError
    const statusCode = error.statusCode || error.code || 500;
    const message = error.message || "Internal Server Error";
    error = new ApiError(statusCode, message, error?.errors || [], err.stack);
  }

  // Send the error response
  const response = {
    ...error,
    message: error.message,
    ...(process.env.NODE_ENV === "development" ? { stack: error.stack } : {}), // Include stack trace only in development
  };

  return res.status(error.statusCode).json(response);
};

export { errorHandler };
