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
        await db.importCsvFiles()
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
