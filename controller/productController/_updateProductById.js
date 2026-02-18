module.exports =
  ({ pool, genPatchRouteQueryList }) =>
  async (req, res, next) => {
    const productId = req.params.productId;

    const [updateFields, updateValues] = genPatchRouteQueryList(req.body, next);

    const result = await pool.query(
      `UPDATE products SET ${updateFields.join(", ")} WHERE id = $${updateValues.length + 1}`,
      [...updateValues, productId],
    );

    if (!result.rowCount)
      return res.status(400).json({ message: "Product update failed" });

    res.sendStatus(204);
  };
