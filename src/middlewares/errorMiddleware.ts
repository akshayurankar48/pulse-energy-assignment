import express from 'express';

// Define an error middleware function to handle errors in the application
export const errorMiddleware = (
  err: Error,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  console.log('Here is an error middleware');

  // Determine the HTTP status code to be sent in the response
  const statusCode = res.statusCode ? res.statusCode : 500;

  // Set the HTTP status code in the response
  res.status(statusCode);

  // Send a JSON response with error details
  res.json({
    message: err.message, // Error message
    stack: process.env.NODE_ENV === 'development' ? err.stack : null, // Error stack trace (in development mode)
  });
};
