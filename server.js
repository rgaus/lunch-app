import path from 'path';
import express from 'express';
import _ from 'lodash';
import {generateSheet, generateChoicesForSheet, getSheetSchema} from './sheets';

const app = express();
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

// Notes
// For this to work, you need to make the sheet public with File -> Publish to the Web
// This means no api key is needed (no rate limit) and auth sucks to use in the googl ecosystem.
app.get('/', (req, res) => res.redirect('/sheets/1DnHlU9IAN5-GRj3UXCnePmT02Fl2xD7fbvCx1uLKzeM'));
app.get('/density', (req, res) => res.redirect('/sheets/1frVwofgRgZYBo5NCGnPV2eNQB8gKvLEon21T6TGG5b0'));

app.get('/sheets/:sheetId', (req, res) => {
  if (req.query.pick) {
    // Pick the place
    generateSheet(req.params.sheetId)
    .then(sheet => generateChoicesForSheet(sheet, req.query))
    .then(choices => {
      res.render('chosenVenue', {place: _.sample(choices)});
    }).catch(console.error.bind(console));
  } else {
    // Choose criteria
    generateSheet(req.params.sheetId).then(getSheetSchema).then(fields => {
      res.render('venuePicker', {fields, sheetId: req.params.sheetId});
    }).catch(console.error.bind(console));
  }
});

app.listen(process.env.PORT || 8000);
