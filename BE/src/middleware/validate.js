export function validate(schema, source = 'body') {
  return (req, res, next) => {
    const result = schema.safeParse(req[source]);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        message: 'Dữ liệu không hợp lệ',
        errors: result.error.flatten().fieldErrors,
      });
    }
    req.validated = result.data;
    next();
  };
}
