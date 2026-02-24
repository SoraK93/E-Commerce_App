const pool = require("../../model/database");

module.exports = async (req, res, next) => {
  const customerId = req.user.id;
  const { productId, quantity } = req.body;

  const query = `
  WITH user_cart AS 
  (INSERT INTO cart VALUES ($1, $2, $3) RETURNING *)
  SELECT
  p.id AS product_id,
  p.name AS product_name,
  p.in_stock AS in_stock,
  uc.quantity AS quantity,
  (uc.quantity * p.price) AS total
  FROM user_cart AS uc
  INNER JOIN products AS p ON uc.product_id = p.id
  INNER JOIN customers_details AS c ON uc.customer_id = c.id`;

  const result = await pool.query(query, [productId, customerId, quantity]);

  const cart = result.rows;
  if (cart.length === 0)
    res
      .status(400)
      .json({ message: "Internal server issue: Cannot add to cart." });

  res.status(201).json({ cart, message: "Create successfuly" });
};
