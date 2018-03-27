var massive = require('massive');
var fs = require('fs');
var XLSX = require('xlsx');
var express = require('express');

var dest = '/db/csv/';
var odsPath = './schema.ods';


var connectionString = "postgres://oneplus:oneplus@localhost:5432/oneplus";
var massiveInstance = massive.connectSync({
    connectionString: connectionString
});

//SET db PROPERTY FOR BEING ABLE TO USE IT APPLICATION WIDE
var app = express();

app.set('db', massiveInstance);

var db = app.get('db');


//INITIALIZATION ROUTINES


function createTables() {
    return db.createTables(function (error, result) {
        if (result) {
            console.log('Created tables ...\n');
            generateCsvFromOds();
            return result;
        } else {
            return error;
        }
    });
};

function generateCsvFromOds() {
    var workbook = XLSX.readFile(odsPath);

    for (var i = 1; i < workbook.SheetNames.length; i++) {
        console.log('Generated ' + workbook.SheetNames[i] + '.csv from' + odsPath + '\n');

        var currentFileName = __dirname + dest + workbook.SheetNames[i] + '.csv'

        fs.writeFile(currentFileName, XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[i]]), importCsvFiles);
    }
};

function importCsvFiles() {
    return db.importCsvFiles(function (error, result) {
        if (result) {
            console.log('Imported CSV files into database ...\n');
            process.exit(0);
        } else {
            console.log('Error importing CSV files into database: ', error, '\n');
            process.exit(0);
        }
    });
};

createTables();


