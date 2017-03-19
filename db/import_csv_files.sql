COPY Categories(categoryId,categoryName)
FROM '/home/mezka/ng-oneplus/db/csv/Categories.csv' DELIMITER ',' CSV HEADER;

COPY Products(productId,productName,categoryId)
FROM '/home/mezka/ng-oneplus/db/csv/Products.csv' DELIMITER ',' CSV HEADER;

COPY Bundles(bundleId,bundleName,discount)
FROM '/home/mezka/ng-oneplus/db/csv/Bundles.csv' DELIMITER ',' CSV HEADER;

COPY BundleCategories(bundleId,categoryId)
FROM '/home/mezka/ng-oneplus/db/csv/BundleCategories.csv' DELIMITER ',' CSV HEADER;

COPY BundleImages(bundleImageId,bundleId,imageUrl)
FROM '/home/mezka/ng-oneplus/db/csv/BundleImages.csv' DELIMITER ',' CSV HEADER;

COPY BundleProducts(bundleId,productId)
FROM '/home/mezka/ng-oneplus/db/csv/BundleProducts.csv' DELIMITER ',' CSV HEADER;

COPY Options(optionId,productId,optionName,optionImageColor,optionImageIcon,optionDimensions,optionWeight,optionMaterials,optionInput,optionOutput,optionPrice)
FROM '/home/mezka/ng-oneplus/db/csv/Options.csv' DELIMITER ',' CSV HEADER;

COPY ProductImages(imageId,optionId,imageUrl)
FROM '/home/mezka/ng-oneplus/db/csv/ProductImages.csv' DELIMITER ',' CSV HEADER;
