var app = require('./index.js');
var db = app.get('db');

var dest = '/db/csv/';
var odsPath = './schema.ods';


fs = require('fs');
XLSX = require('xlsx');

//INITIALIZATION ROUTINES

module.exports = {
    createTables: function createTables() {
        return db.createTables(function (error, result) {
            if (result) {
                console.log('Created tables ...\n');
                return result;
            } else {
                return error;
            }
        });
    },

    generateCsvFromOds: function generateCsvFromOds() {
        var workbook = XLSX.readFile(odsPath);

        for (var i = 1; i < workbook.SheetNames.length; i++) {
            console.log('Generated ' + workbook.SheetNames[i] + '.csv from' + odsPath + '\n');

            var currentFileName = __dirname + dest + workbook.SheetNames[i] + '.csv'

            fs.writeFile(currentFileName, XLSX.utils.sheet_to_csv(workbook.Sheets[workbook.SheetNames[i]]));
        }
    },

    importCsvFiles: function importCsvFiles() {
        db.importCsvFiles(function (error, result) {
            if (result) {
                console.log('Imported CSV files into database ...\n');
                return result;
            } else {
                console.log('Error importing CSV files into database: ', error, '\n');
                return error;
            }
        })
    }
}