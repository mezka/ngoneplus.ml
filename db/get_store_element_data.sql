SELECT Products.productId, Products.productName, Options.optionImage1, Options.optionPrice AS productPrice FROM Products
INNER JOIN Options ON Products.optionId1 = Options.optionId;
