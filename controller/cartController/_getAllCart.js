const pool = require("../../model/database");

module.exports = async (req, res, next) => {
  const customerId = req.user.id;
  const query = `
  SELECT
  p.id AS product_id,
  p.name AS product_name,
  p.in_stock AS in_stock,
  cart.quantity AS quantity,
  (cart.quantity * p.price) AS total
  FROM cart
  INNER JOIN products AS p ON cart.product_id = p.id
  INNER JOIN customers_details AS c ON cart.customer_id = c.id
  WHERE cart.customer_id = $1`;

  try {
    const result = await pool.query(query, [customerId]);

    if (result.rowCount === 0) return res.sendStatus(204);

    res.status(200).json(result.rows);
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};
