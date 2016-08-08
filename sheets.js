import Spreadsheet from 'google-spreadsheet';
import Promise from 'bluebird';
import thenify from 'thenify';

// Generate a new sheet instance
export function generateSheet(sheetId) {
  let doc = new Spreadsheet(sheetId), sheet;
  const getInfo = thenify(doc.getInfo);

  return getInfo().then(data => {
    return data.worksheets[0];
  });
}

// Given a sheet and critera, generate a list of matching resturaunts
export function generateChoicesForSheet(sheet, criteria={}, args={}) {
  const getRows = thenify(sheet.getRows);
  return getRows(Object.assign({
    offset: 1, // ignore the header row
  }, args)).then(rows => {
    return rows.filter(row => {
      // only return valid venues
      return row.venue && row.venue.length > 0;
    }).filter(row => {
      // all matching choices that are defined
      for (let field in row) {
        if (criteria[field] !== undefined && criteria[field] !== row[field]) {
          return false;
        }
      }
      return true;
    }).map(row => {
      // remove bogus rows
      delete row._xml;
      delete row._links;
      delete row.save;
      delete row.del;
      return row;
    });
  });
}

export function getSheetSchema(sheet) {
  return generateChoicesForSheet(sheet, {}, {limit: 1}).then(([choice]) => {
    return Object.keys(choice);
  });
}

// Return a random item from an array
export function sample(array) {
  return array[Math.round(Math.random() * array.length) - 1];
}
