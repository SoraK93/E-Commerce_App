module.exports =
  ({ bcrypt, pool, queryReturnError }) =>
  async (req, res, next) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    try {
      let result = await pool.query(
        "SELECT password FROM customers_details WHERE id = $1",
        [userId],
      );

      if (!result.rowCount)
        return res.status(404).json({ message: "User not found" });

      result = result.rows[0].password;

      const match = await bcrypt.compare(oldPassword, result);

      if (!match)
        return res
          .status(401)
          .json({ message: "Incorrect password provided" });

      const newHash = await bcrypt.hash(newPassword, 10);

      await pool.query(
        "UPDATE customers_details SET password = $1 WHERE id = $2",
        [newHash, userId],
      );

      res.sendStatus(204);
    } catch (err) {
      next(err);
    }
  };
