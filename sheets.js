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
export function generateChoiceForSheet(sheet, criteria={}) {
  const getRows = thenify(sheet.getRows);
  return getRows({
    offset: 1, // ignore the header row
  }).then(rows => {
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
      return row;
    });
  });
}

// Return a random item from an array
export function sample(array) {
  return array[Math.round(Math.random() * array.length) - 1];
}
