const fs = require('fs').promises;
const path = require('path');
const XLSX = require('xlsx');

const workbook = XLSX.readFile('schema.ods');

for(const worksheetName in workbook.Sheets){
    try{
        fs.writeFile(path.join(__dirname, `db/csv/${worksheetName}.csv`), XLSX.utils.sheet_to_csv(workbook.Sheets[worksheetName]))
    } catch (err){
        console.log(err);
    }
}