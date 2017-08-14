COPY Categories(categoryId,categoryName)
FROM $1 DELIMITER ',' CSV HEADER;

COPY Products(productId,productName,categoryId)
FROM $1 DELIMITER ',' CSV HEADER;

COPY Bundles(bundleId,bundleName,discount)
FROM $1 DELIMITER ',' CSV HEADER;

COPY BundleCategories(bundleId,categoryId)
FROM $1 DELIMITER ',' CSV HEADER;

COPY BundleImages(bundleImageId,bundleId,imageUrl)
FROM $1 DELIMITER ',' CSV HEADER;

COPY BundleProducts(bundleId,productId)
FROM $1 DELIMITER ',' CSV HEADER;

COPY Options(optionId,productId,optionName,optionImageColor,optionImageIcon,optionDimensions,optionWeight,optionMaterials,optionInput,optionOutput,optionPrice)
FROM $1 DELIMITER ',' CSV HEADER;

COPY ProductImages(imageId,optionId,imageUrl)
FROM $1 DELIMITER ',' CSV HEADER;

COPY Users(userId,userEmail,userFirstName,userLastName,userAddress1,userAddress2)
FROM $1 DELIMITER ',' CSV HEADER;

COPY Passwords(userId,passwordHash)
FROM $1 DELIMITER ',' CSV HEADER;
