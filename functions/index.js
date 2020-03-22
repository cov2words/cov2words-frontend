'use strict';

const functions = require('firebase-functions');

// CORS Express middleware to enable CORS Requests.
const cors = require('cors')({origin: true});

// Firebase Setup
const admin = require('firebase-admin');
admin.initializeApp();

exports.wordsFromJSON = functions.https.onRequest((req, res) => {
  const handleError = (error) => {
    console.error(error);
    return res.sendStatus(500);
  };
  const handleResponse = (status, body) => {
    console.log({
      Response: {
        Status: status,
        Body: body,
      },
    });
    if (body) {
      return res.status(200)
        .json(body);
    }
    return res.sendStatus(status);
  };

  return cors(req, res, async () => {
    return handleResponse(200, {
      // TODO map word corpus (TH)
      word1: 'Apfel',
      word2: 'Kuchen',
      word3: 'Pfanne',
      // TODO map recommendation (Ruben)
      recommendation: 'Müllers Fritz fischt frische Fische'
    })
  });
});