COPY Categories(categoryId,categoryName)
FROM '/home/mezka/ng-oneplus/db/categories.csv' DELIMITER ',' CSV HEADER;

COPY Options(optionId,optionName,optionImageColor,optionImageIcon,optionImage1,optionImage2,optionImage3,optionImage4,optionImage5,optionDimensions,optionWeight,optionMaterials,optionInput,optionOutput,optionPrice)
FROM '/home/mezka/ng-oneplus/db/options.csv' DELIMITER ',' CSV HEADER;

COPY Products(productId,productName,categoryId,optionId1,optionId2,optionId3,optionId4,optionId5,optionId6,optionId7,optionId8)
FROM '/home/mezka/ng-oneplus/db/products.csv' DELIMITER ',' CSV HEADER;

COPY Bundles(bundleId,bundleName,category1,category2,category3,productId1,productId2,productId3,productId4,productId5,image1,image2,image3,image4,image5,discount)
FROM '/home/mezka/ng-oneplus/db/bundles.csv' DELIMITER ',' CSV HEADER;
