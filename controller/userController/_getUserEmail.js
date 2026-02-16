module.exports =
  ({ pool, queryReturnError }) =>
  async (req, res, next) => {
    const userId = req.user.id;

    const result = await pool.query(
      "SELECT email FROM customers_details WHERE id = $1",
      [userId],
    );

    if (result.rowCount === 0) {
      return next(queryReturnError("Invalid request.", 400));
    }

    res.status(200).json({ email: result.rows[0].email });
  };
