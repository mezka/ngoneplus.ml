COPY Categories(categoryId,categoryName)
FROM '/home/mezka/ng-oneplus/db/csv/categories.csv' DELIMITER ',' CSV HEADER;

COPY Products(productId,productName,categoryId)
FROM '/home/mezka/ng-oneplus/db/csv/products.csv' DELIMITER ',' CSV HEADER;

COPY Options(optionId,productId,optionName,optionImageColor,optionImageIcon,optionDimensions,optionWeight,optionMaterials,optionInput,optionOutput,optionPrice)
FROM '/home/mezka/ng-oneplus/db/csv/options.csv' DELIMITER ',' CSV HEADER;

COPY Bundles(bundleId,bundleName,category1,category2,category3,productId1,productId2,productId3,productId4,productId5,image1,image2,image3,image4,image5,discount)
FROM '/home/mezka/ng-oneplus/db/csv/bundles.csv' DELIMITER ',' CSV HEADER;

COPY Images(imageId, optionId, imageurl)
FROM '/home/mezka/ng-oneplus/db/csv/images.csv' DELIMITER ',' CSV HEADER;
