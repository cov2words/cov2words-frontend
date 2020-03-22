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

    questionnaire_attributes = req.body;
    if(questionnaire_attributes != null){

      //General Recommendation Rules:
      //Risikogruppe, wenn eine der Diagnosen
      //Zum Arzt, wenn mehr als 3 Symptome
      //Zuhause bleiben, wenn mindestens 1 Symtpom oder wenn mit Verdachtsfall/Bestätigtem Fall in Kontakt gewesen

      questionnaire_attributes_obj = json.parse(questionnaire_attributes)

      risk_group_recommendation = ""; //Saetze, die eingefügt werden innerhalb der Recommendation
      doctor_recommendation = "";
      stay_at_home_recommendation = "";
     
      risk_group = []; 
      

       // Identifiziere Ob Risikogruppe

      risk_group.push(questionnaire_attributes_obj["pneumonia"]);
      risk_group.push(questionnaire_attributes_obj["diabetes"]);
      risk_group.push(questionnaire_attributes_obj["heart_disease"]);
      risk_group.push(questionnaire_attributes_obj["adipositas"]);
      risk_group.push(questionnaire_attributes_obj["pregnant"]);
      risk_group.push(questionnaire_attributes_obj["cortisone"]);
      risk_group.push(questionnaire_attributes_obj["cancer"]);

      risk_group.filter(function (e) {
        //0 = "Ja"
        return e > 0;
      });

      if(risk_group.length > 0){
        risk_group_recommendation = "Sie scheinen zu der Risikogruppe zu gehören. ";
      }
      else{
        risk_group_recommendation = "Sie scheinen nicht zu der Risikogruppe zu gehören. ";
      }

      // mehr als 3 Symptom-Ja´s => zum Arzt geschickt (Husten, Fieber und Durchfall) 
      symptoms = []
      symptoms.push(questionnaire_attributes_obj["fever_last_24h"]);
      symptoms.push(questionnaire_attributes_obj["fever_last_4d"]);
      symptoms.push(questionnaire_attributes_obj["chills"]);
      symptoms.push(questionnaire_attributes_obj["weak"]);
      symptoms.push(questionnaire_attributes_obj["limb_pain"]);
      symptoms.push(questionnaire_attributes_obj["cough"]);
      symptoms.push(questionnaire_attributes_obj["snuff"]);
      symptoms.push(questionnaire_attributes_obj["diarrhoea"]);
      symptoms.push(questionnaire_attributes_obj["sore_throat"]);
      symptoms.push(questionnaire_attributes_obj["head_ache"]);
      symptoms.push(questionnaire_attributes_obj["breathlessness"]);

      symptoms.filter(function (e) {
        //0 = "Ja"
        return e > 0;
      });

      if(symptoms.length > 3){
        doctor_recommendation = "Es wäre gut, wenn Sie einen Arzt aufsuchen könnten, der Ihre Symptome weiter untersucht. ";
        stay_at_home_recommendation = "Wir bitten Sie dringenst, ansonsten zunächst zuhause zu bleiben.";
      }

      //Weniger als 3 aber mindestens 1 Symptom 
      else if(symptoms.length > 0){
        // zuhause bleiben und sich checken ob Symptome dazukommen/schlimmer werden
        doctor_recommendation = "Sie müssen momentan keine ärztliche Beratung aufsuchen. ";
        stay_at_home_recommendation = "Bleiben Sie bitte trotzdem zuhause und beobachten Sie ihre eigene Symptome. Sollten Ihr Zustand sich verschlechtern, wiederholen Sie bitte diesen Test. ";;
      }
      
      else{
        //0 Symptome. Aber: wenn Kontakt mit Corona dude oder suspicion bleib zuhause
        doctor_recommendation = "Sie müssen momentan keine ärztliche Beratung aufsuchen. ";
        
        if(questionnaire_attributes_obj["contact_confirmed"] || questionnaire_attributes_obj["contact_suspicion"]){
          stay_at_home_recommendation = "Dennoch waren Sie vielleicht mit dem Virus in Kontakt. Wir bitten Sie dringenst, zunächst zuhause zu bleiben. Beobachten Sie sich selbst auf Symptome. Sollte Ihr Zustand sich verschlechtern, wiederholen Sie bitte diesen Test. ";
        }
        else{
          stay_at_home_recommendation = "Sie können Ihrem Alltag mit den aufs Nötigste reduzierten sozialen Kontakten weiter nachgehen.";
        }
      }

      if(risk_group_recommendation === "" || doctor_recommendation ==="" || stay_at_home_recommendation ===""){
        risk_group_recommendation = "Entschuldigung, etwas ist schief gelaufen. Probieren Sie es zu einem späteren Zeitpunkt erneut. Vielen Dank für Ihr Verständnis";
        doctor_recommendation = "";
        stay_at_home_recommendation = "";
      }


    }
    else{
      //Irgendweswegen ist der req.body leer
      risk_group_recommendation = "Entschuldigung, etwas ist schief gelaufen. Probieren Sie es zu einem späteren Zeitpunkt erneut. Vielen Dank für Ihr Verständnis";
      doctor_recommendation = "";
      stay_at_home_recommendation = "";
    }

    return handleResponse(200, {
      // TODO map word corpus (TH).
      word1: 'Apfel',
      word2: 'Kuchen',
      word3: 'Pfanne',
      recommendation: risk_group_recommendation + doctor_recommendation + stay_at_home_recommendation
    })
  });
});