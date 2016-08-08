import express from 'express';
import {generateSheet, generateChoicesForSheet, sample, getSheetSchema} from './sheets';

const app = express();

app.get('/sheets/:sheetId/schema', (req, res) => {
  generateSheet(req.params.sheetId).then(getSheetSchema).then(fields => {
    res.json({fields});
  });
});

// Usage
// generateSheet('1DnHlU9IAN5-GRj3UXCnePmT02Fl2xD7fbvCx1uLKzeM').then(sheet => {
//   return generateChoicesForSheet(sheet);
// }).then(choices => {
//   console.log("The choice is", choices);
// }).catch(console.error.bind(console));

app.listen(process.env.PORT || 8000);
