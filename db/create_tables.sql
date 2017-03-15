DROP SCHEMA IF EXISTS Public CASCADE;
CREATE SCHEMA Public;


CREATE TABLE Public.Categories(
  categoryId SERIAL PRIMARY KEY,
  categoryName VARCHAR(100) NOT NULL
);

CREATE TABLE Public.Options(
  optionId SERIAL PRIMARY KEY,
  optionName VARCHAR(50),
  optionImageColor VARCHAR(7) DEFAULT NULL,
  optionImageIcon VARCHAR(100) DEFAULT NULL,
  optionImage1 VARCHAR(100) NOT NULL,
  optionImage2 VARCHAR(100) DEFAULT NULL,
  optionImage3 VARCHAR(100) DEFAULT NULL,
  optionImage4 VARCHAR(100) DEFAULT NULL,
  optionImage5 VARCHAR(100) DEFAULT NULL,
  optionDimensions VARCHAR(100),
  optionWeight VARCHAR(50),
  optionMaterials VARCHAR(60),
  optionInput VARCHAR(60),
  optionOutput VARCHAR(60),
  optionPrice FLOAT
);


CREATE TABLE  Public.Products(
  productId SERIAL PRIMARY KEY,
  productName VARCHAR(100) NOT NULL,
  categoryId INTEGER REFERENCES Public.Categories(categoryId),
  optionId1 INTEGER REFERENCES Public.Options(optionId),
  optionId2 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL,
  optionId3 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL,
  optionId4 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL,
  optionId5 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL,
  optionId6 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL,
  optionId7 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL,
  optionId8 INTEGER REFERENCES Public.Options(optionId) DEFAULT NULL
);


CREATE TABLE Public.Bundles(
  bundleId SERIAL PRIMARY KEY,
  bundleName VARCHAR(100) NOT NULL,
  category1 INTEGER REFERENCES Public.Categories(categoryId),
  category2 INTEGER REFERENCES Public.Categories(categoryId) DEFAULT NULL,
  category3 INTEGER REFERENCES Public.Categories(categoryId) DEFAULT NULL,
  productId1 INTEGER REFERENCES Public.Products(productId),
  productId2 INTEGER REFERENCES Public.Products(productId),
  productId3 INTEGER REFERENCES Public.Products(productId) DEFAULT NULL,
  productId4 INTEGER REFERENCES Public.Products(productId) DEFAULT NULL,
  productId5 INTEGER REFERENCES Public.Products(productId) DEFAULT NULL,
  image1 VARCHAR(100),
  image2 VARCHAR(100) DEFAULT NULL,
  image3 VARCHAR(100) DEFAULT NULL,
  image4 VARCHAR(100) DEFAULT NULL,
  image5 VARCHAR(100) DEFAULT NULL,
  discount FLOAT NOT NULL
);

CREATE TABLE Public.Users(
  userEmail VARCHAR(60) PRIMARY KEY,
  userName VARCHAR(50) NOT NULL,
  userLastName VARCHAR(50) NOT NULL,
  userAddress1 VARCHAR(80) NOT NULL,
  userAddress2 VARCHAR(50)
);

CREATE TABLE Public.Sessions(
  sessionId SERIAL PRIMARY KEY,
  userEmail VARCHAR(60) REFERENCES Public.Users(userEmail)
);

CREATE TABLE Public.Orders(
  orderId SERIAL PRIMARY KEY,
  sessionId INTEGER REFERENCES Public.Sessions(sessionId),
  checkedOut BOOLEAN DEFAULT FALSE
);

CREATE TABLE Public.Carts(
  cartElementId SERIAL PRIMARY KEY,
  orderId INTEGER REFERENCES Public.Orders(orderId) NOT NULL,
  productId INTEGER REFERENCES Public.Products(productId) NOT NULL,
  optionId INTEGER REFERENCES Public.Options(optionId) NOT NULL,
  quantity INTEGER NOT NULL,
  discount INTEGER DEFAULT 0
);
