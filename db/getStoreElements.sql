SELECT DISTINCT ON(Products.productId) Products.productId, Products.categoryId, Products.productName, OptionImages.imageUrl AS productImage, Options.optionPrice AS productPrice FROM Products
JOIN Options ON Products.productId = Options.productId
JOIN OptionImages On Options.optionId = OptionImages.OptionId;
