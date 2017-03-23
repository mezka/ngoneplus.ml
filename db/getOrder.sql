SELECT * FROM Carts
INNER JOIN CartItems ON CartItems.cartId = Carts.cartId
WHERE Carts.cartId = $1;
