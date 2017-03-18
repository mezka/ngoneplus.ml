SELECT Options.optionId, Products.productName, Options.optionName, Options.optionImageColor, Options.optionImageIcon, Options.optionDimensions, Options.optionWeight, Options.optionMaterials, Options.optionInput, Options.optionOutput, Options.optionPrice FROM Products
INNER JOIN Options ON Options.productId = Products.productid
WHERE Products.productId = $1;
