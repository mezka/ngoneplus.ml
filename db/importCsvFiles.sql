COPY Categories(categoryId,categoryName)
FROM '/home/mezka/ngoneplus.ml/db/csv/Categories.csv' DELIMITER ',' CSV HEADER;

COPY Products(productId,productName,categoryId)
FROM '/home/mezka/ngoneplus.ml/db/csv/Products.csv' DELIMITER ',' CSV HEADER;

COPY Bundles(bundleId,bundleName,discount)
FROM '/home/mezka/ngoneplus.ml/db/csv/Bundles.csv' DELIMITER ',' CSV HEADER;

COPY BundleCategories(bundleId,categoryId)
FROM '/home/mezka/ngoneplus.ml/db/csv/BundleCategories.csv' DELIMITER ',' CSV HEADER;

COPY BundleImages(bundleImageId,bundleId,imageUrl)
FROM '/home/mezka/ngoneplus.ml/db/csv/BundleImages.csv' DELIMITER ',' CSV HEADER;

COPY BundleProducts(bundleId,productId)
FROM '/home/mezka/ngoneplus.ml/db/csv/BundleProducts.csv' DELIMITER ',' CSV HEADER;

COPY Options(optionId,productId,optionName,optionImageColor,optionImageIcon,optionDimensions,optionWeight,optionMaterials,optionInput,optionOutput,optionPrice)
FROM '/home/mezka/ngoneplus.ml/db/csv/Options.csv' DELIMITER ',' CSV HEADER;

COPY ProductImages(imageId,optionId,imageUrl)
FROM '/home/mezka/ngoneplus.ml/db/csv/ProductImages.csv' DELIMITER ',' CSV HEADER;

COPY Users(userId,userEmail,userFirstName,userLastName,userAddress1,userAddress2)
FROM '/home/mezka/ngoneplus.ml/db/csv/Users.csv' DELIMITER ',' CSV HEADER;

COPY Passwords(userId,passwordHash)
FROM '/home/mezka/ngoneplus.ml/db/csv/Passwords.csv' DELIMITER ',' CSV HEADER;
