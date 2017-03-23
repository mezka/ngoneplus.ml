WITH insertCarts AS (
  INSERT INTO Carts
  (userId)
  VALUES ($1)
  RETURNING cartId AS cart_id
)

INSERT INTO CartItems (cartId, productId, optionId, quantity, discount)
  SELECT cart_id, $2, $3, $4, $5 FROM insertCarts;
