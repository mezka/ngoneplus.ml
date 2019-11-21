const massive = require('massive');
const fs = require('fs');
const XLSX = require('xlsx');
const path = require('path');

var dest = '/db/csv/';
var odsPath = './schema.ods';

var db = null;

const connectDb = async () => {
    db = await massive({ host: 'localhost', port: 5432, database: 'oneplus', user: 'oneplus', password: 'oneplus'});
};


async function init(){

    await connectDb();

    createTables()
        .then(generateCsvFromOds)
        .then(importCsvFiles)
        .catch(error => {
            console.log(`Unexpected error: ${error}`);
    });
}


function createTables() {
    return db.createTables()
        .then(result => {
            console.log('Created tables ...');
        })
        .catch(error => {
            console.log(`Error while attempting to create tables: ${error}`);
            process.exit(1);
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
            console.log(`Error importing CSV files into database: ${error}`);
            process.exit(1);
        })
};


init();


