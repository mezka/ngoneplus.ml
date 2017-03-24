SELECT DISTINCT ON (ProductImages.optionId) Products.productName || ' ' || Options.optionName AS productName, ProductImages.imageUrl, CartItems.quantity, Options.optionPrice FROM Carts
INNER JOIN CartItems ON Carts.cartId = CartItems.cartId
INNER JOIN Products ON Products.productId = CartItems.productId
INNER JOIN Options ON CartItems.optionId = Options.optionId
INNER JOIN ProductImages ON ProductImages.optionId = Options.optionId
WHERE CartItems.cartId = 1;
