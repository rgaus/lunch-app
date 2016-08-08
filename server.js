import express from 'express';
import {generateSheet, generateChoicesForSheet, getSheetSchema} from './sheets';
import _ from 'lodash';

const app = express();
app.set('view engine', 'ejs');

app.get('/sheets/:sheetId', (req, res) => {
  if (req.query.pick) {
    // Pick the place
    generateSheet(req.params.sheetId)
    .then(sheet => generateChoicesForSheet(sheet, req.query))
    .then(choices => {
      res.render('chosenVenue', {place: _.sample(choices)});
    });
  } else {
    // Choose criteria
    generateSheet(req.params.sheetId).then(getSheetSchema).then(fields => {
      res.render('venuePicker', {fields});
    });
  }
});

app.listen(process.env.PORT || 8000);
