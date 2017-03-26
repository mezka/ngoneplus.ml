DROP SCHEMA IF EXISTS Public CASCADE;
CREATE SCHEMA Public;

CREATE TABLE Public.Categories(
  categoryId SERIAL PRIMARY KEY,
  categoryName VARCHAR(100) NOT NULL
);

CREATE TABLE  Public.Products(
  productId SERIAL PRIMARY KEY,
  productName VARCHAR(100) NOT NULL,
  categoryId INTEGER REFERENCES Public.Categories(categoryId)
);

CREATE TABLE Public.Bundles(
  bundleId SERIAL PRIMARY KEY,
  bundleName VARCHAR(100) NOT NULL,
  discount FLOAT NOT NULL
);

CREATE TABLE Public.BundleImages(
  bundleImageId SERIAL PRIMARY KEY,
  bundleId INTEGER REFERENCES Public.Bundles(bundleId),
  imageUrl VARCHAR(100)
);

CREATE TABLE Public.BundleProducts(
  bundleId INTEGER REFERENCES Public.Bundles(bundleId),
  productId INTEGER REFERENCES Public.Products(productId)
);

CREATE TABLE Public.BundleCategories(
  bundleId INTEGER REFERENCES Public.Bundles(bundleId),
  categoryId INTEGER REFERENCES Public.Categories(categoryId)
);

CREATE TABLE Public.Options(
  optionId SERIAL PRIMARY KEY,
  productId INTEGER REFERENCES Public.Products(productId),
  optionName VARCHAR(50),
  optionImageColor VARCHAR(7) DEFAULT NULL,
  optionImageIcon VARCHAR(100) DEFAULT NULL,
  optionDimensions VARCHAR(100),
  optionWeight VARCHAR(50),
  optionMaterials VARCHAR(60),
  optionInput VARCHAR(60),
  optionOutput VARCHAR(60),
  optionPrice FLOAT
);

CREATE TABLE Public.ProductImages(
  imageId SERIAL PRIMARY KEY,
  optionId INTEGER REFERENCES Public.Options(optionId),
  imageUrl VARCHAR(100)
);

CREATE TABLE Public.Users(
  userId SERIAL PRIMARY KEY,
  userEmail VARCHAR(60) NOT NULL,
  userFirstName VARCHAR(50) NOT NULL,
  userLastName VARCHAR(50) NOT NULL,
  userAddress1 VARCHAR(80) NOT NULL,
  userAddress2 VARCHAR(80)
);

CREATE TABLE Public.Carts(
  cartId SERIAL PRIMARY KEY,
  userId INTEGER REFERENCES Public.Users(userId),
  createdDate timestamptz NOT NULL DEFAULT now(),
  checkedOut BOOLEAN DEFAULT FALSE
);

CREATE TABLE Public.CartItems(
  cartElementId SERIAL PRIMARY KEY,
  cartId INTEGER REFERENCES Public.Carts(cartId) NOT NULL,
  productId INTEGER REFERENCES Public.Products(productId) NOT NULL,
  optionId INTEGER REFERENCES Public.Options(optionId) NOT NULL,
  quantity INTEGER NOT NULL,
  discount INTEGER DEFAULT 0
);

CREATE TABLE Public.Passwords(
    passwordId SERIAL PRIMARY KEY,
    userId INTEGER REFERENCES Public.Users(userId),
    passwordHash VARCHAR(60) UNIQUE
)
