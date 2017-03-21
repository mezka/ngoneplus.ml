SELECT Options.optionId, Products.productName, Options.optionName, Options.optionImageColor, Options.optionImageIcon, json_agg(ProductImages.imageUrl) AS imageUrls, Options.optionDimensions, Options.optionWeight, Options.optionMaterials, Options.optionInput, Options.optionOutput, Options.optionPrice FROM Products
INNER JOIN Options ON Options.productId = Products.productid
RIGHT JOIN ProductImages ON ProductImages.optionId = Options.optionId
WHERE Products.productId = $1
GROUP BY Options.optionId, Products.productName, Options.optionName, Options.optionImageColor, Options.optionImageIcon, Options.optionDimensions, Options.optionWeight, Options.optionMaterials, Options.optionInput, Options.optionOutput, Options.optionPrice;
