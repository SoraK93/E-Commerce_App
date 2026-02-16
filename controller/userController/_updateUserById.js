module.exports =
  ({ pool, genPatchRouteQueryList }) =>
  async (req, res, next) => {
    const userId = req.user.id;

    const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

    const result = await pool.query(
      `UPDATE customers_details SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1} RETURNING name, phone, address, is_seller`,
      [...updateValues, userId],
    );

    res
      .status(200)
      .json({ message: "Update successful", user: result.rows[0] });
  };
