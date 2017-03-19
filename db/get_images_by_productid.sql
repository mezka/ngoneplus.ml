SELECT Options.optionId, Products.productName, Options.optionName, Options.optionImageColor, Options.optionImageIcon, json_agg(Images.imageUrl) AS imageUrls, Options.optionDimensions, Options.optionWeight, Options.optionMaterials, Options.optionInput, Options.optionOutput, Options.optionPrice FROM Products
INNER JOIN Options ON Options.productId = Products.productid
RIGHT JOIN Images ON Images.optionId = Options.optionId
WHERE Products.productId = $1
GROUP BY Options.optionId, Products.productName, Options.optionName, Options.optionImageColor, Options.optionImageIcon, Options.optionDimensions, Options.optionWeight, Options.optionMaterials, Options.optionInput, Options.optionOutput, Options.optionPrice;
