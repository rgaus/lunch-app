import express from 'express';
import {generateSheet, generateChoiceForSheet, sample} from './sheets';

// Usage
generateSheet('1DnHlU9IAN5-GRj3UXCnePmT02Fl2xD7fbvCx1uLKzeM').then(sheet => {
  return generateChoiceForSheet(sheet);
}).then(choices => {
  console.log("The choice is", choices);
}).catch(console.error.bind(console));
