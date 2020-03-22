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
    try {
      return handleResponse(200, {
        // TODO map word corpus (TH).
        word1: 'Apfel',
        word2: 'Kuchen',
        word3: 'Pfanne',
        recommendation: answersToRecommendation(req)
      })
    } catch (e) {
      return handleError(e.message || 'Unknown error');
    }
  });
});

function answersToRecommendation(req) {
  const messageError = 'Entschuldigung, etwas ist schief gelaufen. Probieren Sie es zu einem späteren Zeitpunkt erneut. Vielen Dank für Ihr Verständnis';
  if (!req || !req.body) {
    return messageError;
  }
  const answers = req.body,
    answerKeys = Object.keys(answers);
  // General Recommendation Rules:
  // Risikogruppe, wenn eine der Diagnosen
  let riskGroupRecommendation = '';
  // Zum Arzt, wenn mehr als 3 Symptome
  let doctorRecommendation = '';
  // Zuhause bleiben, wenn mindestens 1 Symtpom oder wenn mit Verdachtsfall/Bestätigtem Fall in Kontakt gewesen
  let stayHomeRecommendation = '';
  console.info(JSON.stringify(answers));
  const isRiskGroup = [
    'pneumonia',
    'diabetes',
    'heart_disease',
    'adipositas',
    'pregnant',
    'cortison',
    'cancer'
  ].find((el) => answers[el] === true);
  riskGroupRecommendation = isRiskGroup
    ? 'Sie scheinen zu der Risikogruppe zu gehören. '
    : 'Sie scheinen nicht zu der Risikogruppe zu gehören.';

  // mehr als 3 Symptom-Ja´s => zum Arzt geschickt (Husten, Fieber und Durchfall)
  const numberOfSymptoms = [
    'fever_last_24h',
    'fever_last_4d',
    'chills',
    'weak',
    'limb_pain',
    'cough',
    'snuff',
    'diarrhoea',
    'sore_throat',
    'head_ache',
    'breathlessness'
  ].filter((el) => answers[el] === true).length;
  if (numberOfSymptoms >= 3) {
    doctorRecommendation = 'Es wäre gut, wenn Sie einen Arzt aufsuchen könnten, der Ihre Symptome weiter untersucht.';
    stayHomeRecommendation = 'Wir bitten Sie dringenst, ansonsten zunächst zuhause zu bleiben.';
  }
  // Weniger als 3 aber mindestens 1 Symptom
  else if (numberOfSymptoms > 0) {
    // zuhause bleiben und sich checken ob Symptome dazukommen/schlimmer werden
    doctorRecommendation = 'Sie müssen momentan keine ärztliche Beratung aufsuchen.';
    stayHomeRecommendation = 'Bleiben Sie bitte trotzdem zuhause und beobachten Sie ihre eigene Symptome. Sollten Ihr Zustand sich verschlechtern, wiederholen Sie bitte diesen Test.';
  } else {
    // 0 Symptome. Aber: wenn Kontakt mit Corona dude oder suspicion bleib zuhause
    doctorRecommendation = 'Sie müssen momentan keine ärztliche Beratung aufsuchen.';
    if (answers['contact_confirmed'] || answers['contact_suspicion']) {
      stayHomeRecommendation = 'Dennoch waren Sie vielleicht mit dem Virus in Kontakt. Wir bitten Sie dringenst, zunächst zuhause zu bleiben. Beobachten Sie sich selbst auf Symptome. Sollte Ihr Zustand sich verschlechtern, wiederholen Sie bitte diesen Test.';
    } else {
      stayHomeRecommendation = 'Sie können Ihrem Alltag mit den aufs Nötigste reduzierten sozialen Kontakten weiter nachgehen.';
    }
  }
  if (riskGroupRecommendation.length < 1 || doctorRecommendation.length < 1 || stayHomeRecommendation.length < 1) {
    return messageError;
  }
  return [riskGroupRecommendation, doctorRecommendation, stayHomeRecommendation].join(' ');
}