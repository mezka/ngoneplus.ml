const massive = require('massive');
const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

var dest = '/db/csv/';
var odsPath = './schema.ods';

//LOAD DOTENV CONFIG

try{
    require('dotenv').config();
} catch(error) {
    throw error;
}

let db = null;

async function init(){
    
    try{
        db = await massive({ host: process.env.DB_HOST, port: process.env.DB_PORT, database: process.env.DB_NAME, user: process.env.DB_USER, password: process.env.DB_PASSWORD });
    } catch (error){
        console.log(error);
        console.log('Could not establish connection to database ...');
        throw error;
    }

    createTables()
        .then(generateCsvFromOds)
        .then(importCsvFiles)
        .catch(error => {
            throw error;
    });
}

function createTables() {
    return db.createTables()
        .then(result => {
            console.log('Created tables ...');
        })
        .catch(error => {
            console.log(`Error while attempting to create tables: ${error}`);
            throw error;
        });
};

function generateCsvFromOds() {
    return new Promise(function (resolve, reject) {

        let workbook;

        try {
            workbook = XLSX.readFile(odsPath);
        } catch (error) {
            console.log(`Error while attempting to read file: ${error}`);
            reject(error);
        }

        for (let i = 1; i < workbook.SheetNames.length; i++) {
            console.log(`Generated ${workbook.SheetNames[i]}.csv from ${odsPath}`);

            try {
                fs.writeFile(path.join(__dirname, dest, `${workbook.SheetNames[i]}.csv`), XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[i]]), importCsvFiles);
            } catch (error) {
                console.log(`Error while attempting to create file: ${error}`);
                reject(error)
            }
        }

        resolve({ success: true });
    })
};

function importCsvFiles() {
    return db.importCsvFiles()
        .then(result => {
            console.log('Imported CSV files into database ...');
            process.exit(0);
        })
        .catch(error => {
            console.log('Error importing CSV files into database ...');
            throw error;
        })
};

init();


