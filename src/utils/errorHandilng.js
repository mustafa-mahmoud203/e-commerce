export const errorHandilng = (err, req, res, next) => {
  if (err) {
    return res
      .status(err.state || 500)
      .json({ message: err.message, err, stack: err.stack });
  }
};
