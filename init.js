const dotenv = require('dotenv');
const massive = require('massive');

async function init(){

    try{
        dotenv.config();
    } catch(error) {
        throw error;
    }
    
    try{
        var db = await massive({ host: process.env.DB_HOST, port: process.env.DB_PORT, database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
    } catch (err){
        console.log(`Could not establish connection to database:\n${err}`);
        throw err;
    }


    try{
        await db.createTables();
    } catch (err){
        console.log(`Error while attempting to create tables:\n${err}`);
        throw err;
    }

    console.log('Created tables ...');

    try{
        var result = await db.query(
            `
            COPY Categories(categoryId,categoryName)
            FROM '${__dirname}/db/csv/Categories.csv' DELIMITER ',' CSV HEADER;
            
            COPY Products(productId,productName,categoryId)
            FROM '${__dirname}/db/csv/Products.csv' DELIMITER ',' CSV HEADER;
            
            COPY Bundles(bundleId,bundleName,discount)
            FROM '${__dirname}/db/csv/Bundles.csv' DELIMITER ',' CSV HEADER;
            
            COPY BundleCategories(bundleId,categoryId)
            FROM '${__dirname}/db/csv/BundleCategories.csv' DELIMITER ',' CSV HEADER;
            
            COPY BundleImages(bundleImageId,bundleId,imageUrl)
            FROM '${__dirname}/db/csv/BundleImages.csv' DELIMITER ',' CSV HEADER;
            
            COPY BundleProducts(bundleId,productId)
            FROM '${__dirname}/db/csv/BundleProducts.csv' DELIMITER ',' CSV HEADER;
            
            COPY Options(optionId,productId,optionName,optionImageColor,optionImageIcon,optionDimensions,optionWeight,optionMaterials,optionPrice)
            FROM '${__dirname}/db/csv/Options.csv' DELIMITER ',' CSV HEADER;
            
            COPY OptionImages(imageId,optionId,imageUrl)
            FROM '${__dirname}/db/csv/OptionImages.csv' DELIMITER ',' CSV HEADER;
            `
        );
    } catch (err) {
        console.log(`Error importing CSV files into database:\n${err}`);
        throw err;
    }

    console.log('Loaded tables from CSV ...')

    return;
}


init()
.then(() => process.exit(0))
.catch((err) => process.exit(1));