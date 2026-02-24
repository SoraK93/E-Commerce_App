const pool = require("../../model/database");

module.exports = async (req, res, next) => {
  const customerId = req.user.id;
  const cartList = req.body;

  const productId = cartList.map((item) => item.product_id);
  const quantity = cartList.map((item) => item.quantity);

  const query = `
  WITH batch_data AS (
    SELECT UNNEST($1::uuid[]) AS pid, UNNEST($2::int[]) as q
  ), deleted_rows AS (
    DELETE FROM cart c
    USING batch_data b
    WHERE c.product_id = b.pid
      AND c.customer_id = $3
      AND b.q <= 0
    RETURNING c.product_id
  ), updated_rows AS (
    UPDATE cart c
    SET quantity = b.q
    FROM batch_data b
    WHERE c.product_id = b.pid
      AND c.customer_id = $3
      AND b.q > 0
    RETURNING c.*
  ) 
  SELECT
    p.id AS product_id,
    p.name AS product_name,
    p.in_stock AS in_stock,
    c.quantity AS quantity,
    (c.quantity * p.price) AS total
  FROM cart AS c
  INNER JOIN products AS p ON c.product_id = p.id
  WHERE c.customer_id = $3`;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    
    const result = await client.query(query, [productId, quantity, customerId]);

    await client.query("COMMIT");
    return res.status(200).json(result.rows);
  } catch (err) {
    console.log(err)
    await client.query("ROLLBACK");
    next(err);
  } finally {
    client.release();
  }
};
