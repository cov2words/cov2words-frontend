import { uuid } from "uuidv4"
import { ContactFlowAttribute } from "./contactflowattribute"

export interface ContactFlowUserInputProps {
  question: any,
  ownUUID: string,
  repeatUUID: string,
  errorUUID: string,
  transitionUUIDs: any[],
  optionsUUIDMap: any,
  modules: any[],
  positionX: number,
  positionY: number,
  language: string,
  useDynamic?: boolean,
  maxDigits?: string
}

export const generateTextFromOptions = (question, language) => {
  let text = `${question.text} <break time="1s" />`

  // quick n dirty. these stuff needs to be moved to state.
  let part1 = language === 'de' ? 'Drücken Sie die' : 'Press'
  let part2 = language === 'de' ? 'für' : 'for'

  question.options.forEach((option, i) => {
    text = text.concat(`${part1} ${i + 1} ${part2} ${option} <break time="1s" />`)
  })
  return `<speak>${text}</speak>`
}

export const ContactFlowUserInput = (props: ContactFlowUserInputProps) => {
  let { 
    question, ownUUID, repeatUUID, errorUUID, transitionUUIDs, optionsUUIDMap,
    modules, positionX, positionY, language,
    useDynamic = false,
    maxDigits = 1
  } = props

  const conditionMetadata = []

  let staticBranches = [
    {
      condition: "Timeout",
      transition: repeatUUID
    },
    {
      condition: "NoMatch",
      transition: repeatUUID
    },
    {
      condition: "Error",
      transition: errorUUID
    }
  ]

  /*  each dynamic branch needs a SetAttributes */
  const dynamicBranches = question.options.map((option, i) => {
    let conditionMetadataUUID = uuid()
    let val = i + 1
    const conditionMetadataObj = {
      id: conditionMetadataUUID,
      value: val.toString()
    }
    conditionMetadata.push(conditionMetadataObj)

    let key = `${question.category}_${question.id}`


    let contactFlowAttribute = ContactFlowAttribute({
      ownUUID: optionsUUIDMap[i],
      errorUUID: errorUUID,
      key: key,
      value: val,
      positionX: positionX + 250,
      positionY: positionY + i * 200,
      transitionUUID: transitionUUIDs[i].uuid
      // what the blin?
      //score: question.hasOwnProperty("scoreMap") ? question.scoreMap[i] : undefined
    })
    modules.push(contactFlowAttribute)

    return {
      condition: "Evaluate",
      conditionType: "Equals",
      conditionValue: val.toString(),
      transition: optionsUUIDMap[i]
    }
  })

  const branches = [...dynamicBranches, ...staticBranches]

  let useFullText = question.hasOwnProperty("options") ? generateTextFromOptions(question, language) : `<speak>${question.text}</speak>`

  return {
    id: ownUUID,
    type: "GetUserInput",
    branches: branches,
    parameters: [
      {
        name: "Text",
        value: useFullText,
        namespace: null
      },
      {
        name: "TextToSpeechType",
        value: "ssml"
      },
      {
        name: "Timeout",
        value: "5"
      },
      {
        name: "MaxDigits",
        value: maxDigits
      }
    ],
    metadata: {
      position: {
        x: positionX,
        y: positionY
      },
      conditionMetadata: conditionMetadata,
      useDynamic: useDynamic
    },
    target: "Digits"
  }
}