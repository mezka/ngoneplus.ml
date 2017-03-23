INSERT INTO Carts
(userId)
VALUES ($1)
RETURNING cartId AS cartid;
