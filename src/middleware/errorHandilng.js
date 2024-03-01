export const globalError = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "Error";
  if (process.env.NODE_ENV == "development") errorForDev(err, res);
  else errorForProd(err, res);
};

const errorForDev = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.statusCode,
    Error: err,
    message: err.message,
    stack: err.stack,
  });
};
const errorForProd = (err, res) => {
  return res.status(err.statusCode).json({
    status: err.statusCode,
    message: err.message,
  });
};
