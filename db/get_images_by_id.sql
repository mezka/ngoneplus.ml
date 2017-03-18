SELECT Images.imageUrl FROM Images
WHERE Images.optionId IN (SELECT Options.productId FROM Options WHERE Options.productId = 4);
