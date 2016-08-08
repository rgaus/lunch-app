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
        if (criteria[field] !== undefined && criteria[field].toLowerCase() !== row[field].toLowerCase()) {
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

// Return the fields that can be used to refine the choice
export function getSheetSchema(sheet) {
  return generateChoicesForSheet(sheet, {}).then((choices) => {
    let schema = {};
    choices.forEach(choice => {
      for (let key in choice) {
        let choiceKey = choice[key].toLowerCase(); // lowercase all values

        if (key === "id" || key === "venue") {
          continue;
        } else if (Array.isArray(schema[key]) && schema[key].indexOf(choiceKey) === -1) {
          // The array has already been started, append unique values
          schema[key].push(choiceKey);
        } else if (typeof schema[key] === 'undefined' ) {
          // Create a new sub-array for all possible schema values
          schema[key] = [choiceKey];
        }
      }
    });

    return schema;
  });
}
