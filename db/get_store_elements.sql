SELECT DISTINCT ON(Products.productId) Products.productId, Products.categoryId, Products.productName, Images.imageUrl AS productImage, Options.optionPrice AS productPrice FROM Products
JOIN Options ON   Products.productId = Options.productId
JOIN Images ON Options.optionId = Images.OptionId
ORDER BY Products.productId ASC;
