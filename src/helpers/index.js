export const successResponse = (req, res, data, code = 200) =>
  res.send({
    code,
    data,
    success: true,
  });

export const errorResponse = (
  req,
  res,
  errorMessage = "Something went wrong",
  code = 500,
  error = {}
) =>
  res.status(500).json({
    code,
    errorMessage,
    error,
    data: null,
    success: false,
  });
