const patientData = {
  "Details": {
    "ContactData": {
      "Attributes": {
        "CatA_X1": "3",
        "CatA_X2": "1",
        "scoreMap": "{\"conditions\":{\"lala\":{\"combination\":\"&&\",\"name\":\"lala\",\"operand\":\"==\",\"selected\":[\"CatA_X1\"],\"uuid\":\"042bbe86-e9f8-4091-b710-e914849aa7af\",\"value\":{\"display\":\"zwitter, zwitter\",\"val\":\"2\"}},\"lulu\":{\"name\":\"lulu\",\"operand\":\"==\",\"selected\":[\"CatA_X2\"],\"uuid\":\"b72a5374-0dae-46f6-b38a-310b5d909163\",\"value\":{\"display\":\"aaa\",\"val\":\"0\"}}},\"statements\":{\"Rammstein\":{\"conditions\":[\"042bbe86-e9f8-4091-b710-e914849aa7af\",\"b72a5374-0dae-46f6-b38a-310b5d909163\"],\"falseText\":\"Depp\",\"name\":\"Rammstein\",\"trueText\":\"Rammsteinfan oder Mathegenie\",\"uuid\":\"8124d82c-20e5-43e4-8700-c433bc113a38\"}}}"
      },
      "Channel": "VOICE",
      "ContactId": "3712acb3-011f-498d-8a05-25823030edc9",
      "CustomerEndpoint": {
        "Address": "+49724398911",
        "Type": "TELEPHONE_NUMBER"
      },
      "InitialContactId": "3712acb3-011f-498d-8a05-25823030edc9",
      "InitiationMethod": "INBOUND",
      "InstanceARN": "arn:aws:connect:eu-west-2:260148551992:instance/acfcd22b-ea7c-4be1-bf41-a109717c3bcd",
      "MediaStreams": {
        "Customer": {
          "Audio": null
        }
      },
      "PreviousContactId": "3712acb3-011f-498d-8a05-25823030edc9",
      "Queue": null,
      "SystemEndpoint": {
        "Address": "+3726682808",
        "Type": "TELEPHONE_NUMBER"
      }
    },
    "Parameters": {
      "CatA_X1": "3",
      "CatA_X2": "1"
    }
  },
  "Name": "ContactFlowEvent"
}

const evalCondtion = (value, operand, targetValue) => {

  switch (operand) {
    case "==":
      return value === targetValue
    case "!=":
      return value !== targetValue
    case "<=":
      return value <= targetValue
    case ">=":
      return value >= targetValue
    case "&&":
      return value && targetValue
    case "||":
      return value || targetValue
    default:
      console.log("FAIL RAISE ERROR")
      return undefined
  }
}

const getEvaluations = (statements, conditions, answers) => {

  /*  evaluate each statement's conditions with the answers given. return array of strings */

  let evaluations = []

  statements.forEach(statement => {

    let truthList = []

    statement.conditions.forEach((conditionUUID, i) => {
      let condition = conditions.find(cond => cond.uuid === conditionUUID)
      //let condition = conditions[conditionUUID]
      let conditionTruthList = []
      let conditionTrue

      /* statement conditions can be chained together. if theres is a follow-up condition, current condition will have combination property */

      if (condition.hasOwnProperty("combination")) {

        let nextconditionUUID = statement.conditions[i+1]
        let nextcondition = conditions.find(cond => cond.uuid === nextconditionUUID)
        console.log("woot", nextcondition)
        let nextcondtionTruthList = []

        nextcondition.selected.forEach(sel => {
          console.log("answers", answers, sel)
          //let answer = answers.find(a => a.hasOwnProperty(sel))[sel]
          let answer = answers[sel]
          console.log(answer)
          let { operand, value} = nextcondition
          let {val} = value
          answer = parseInt(answer) - 1
          val = parseInt(val)
          let nextconditionTrue = evalCondtion(answer, operand, val)
          console.log(`${answer} ${operand} ${val} is ${nextconditionTrue}`)
          nextcondtionTruthList.push(nextconditionTrue)
        })

        condition.selected.forEach(sel => {
          //let answer = answers.find(a => a.hasOwnProperty(sel))[sel]
          let answer = answers[sel]
          let { operand, value} = condition
          let {val} = value
          answer = parseInt(answer) - 1
          val = parseInt(val)
          let conditionTrue = evalCondtion(answer, operand, val)
          console.log(`${answer} ${operand} ${val} is ${conditionTrue}`)
          conditionTruthList.push(conditionTrue)
        })

        let cListTrue = conditionTruthList.every(c => c === true)
        let nListTrue = nextcondtionTruthList.every(c => c === true)

        conditionTrue = evalCondtion(
          cListTrue, condition.combination, nListTrue
        )
        /* console.log("WTF", conditionTrue) */
      }

      else {

        condition.selected.forEach(sel => {
          //let answer = answers.find(a => a.hasOwnProperty(sel))[sel]
          let answer = answers[sel]
          console.log("the motherfucking answer", answer, sel)
          let { operand, value} = condition
          let {val} = value
          answer = parseInt(answer) - 1
          val = parseInt(val)
          let conditionTrue = evalCondtion(answer, operand, val)
          console.log(`${answer} ${operand} ${val} is a bitch ${conditionTrue}`)
          conditionTruthList.push(conditionTrue)
        })

        conditionTrue = conditionTruthList.every(c => c === true)
        /* console.log("WTF ELSE", conditionTrue) */
      }

      if (i + 1 !== statement.conditions.length || i === 0) {
        console.log("blyat?!", conditionTrue)
        truthList.push(conditionTrue)
      }

    })

    /* console.log("the traash", truthList)
    console.log("aye",truthList.every(t => t === true)) */
    truthList.every(t => t === true) ? evaluations.push(statement.trueText) : evaluations.push(statement.falseText)

  })

  console.log(JSON.stringify(evaluations))

  return evaluations
}

export const answersToStatements = (answers, scoreMap) => {
const { conditions, statements } = JSON.parse(scoreMap);
let k = Object.keys(statements).map(o => statements[o]),
    s = Object.keys(conditions).map(l => conditions[l]),
    c = answers//Object.keys(answers).map(e => answers[e])

return getEvaluations(k, s, c).join('') // ole ole
};

export const mockIndex = () => {
  /* var data = JSON.stringify(event);
    console.log(data);

    var patientData = JSON.parse(data);
  var patientData = JSON.parse(connectData); */
  var { scoreMap, ...answers } = patientData.Details.ContactData.Attributes;
  var recommendationTerm = answersToStatements(answers, scoreMap)
  console.log(recommendationTerm)
}