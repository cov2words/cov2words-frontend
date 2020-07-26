import { uuid } from "uuidv4"
import { EmptyContactFlow } from "./emptycontactflow"
import { ContactFlowEnd } from "./contactflowend"
import { ContactFlowRepeat } from "./contactflowrepeat"
import { ContactFlowError } from "./contactflowerror"
import { ContactFlowTransfer } from "./contactflowtransfer"
import { ContactFlowStore } from "./contactflowstore"

export interface ContactFlowQuestionDateProps {
  language: string,
  errorText: string,
  repeatText: string,
  index: number,
  //dispatch,
  uuidMap: any,
  xxxMap: any,
  question: any,
  //addKey,
  name: string,
  basename: string,
  positionX?: number,
  positionY?: number
}

export const ContactFlowQuestionDate = (props: ContactFlowQuestionDateProps) => {
  let { 
    language, errorText, repeatText, index, uuidMap, xxxMap, question,
    name, basename,
    positionX = 820,
    positionY = 20
  } = props

  const endUUID = uuid()
  const repeatUUID = uuid()
  const errorUUID = uuid()

  const transferUUIDs = [{ uuid: uuid(), key: question.id }]

  const contactFlowQuestion = EmptyContactFlow({
    name: name,
    startUUID: uuidMap[question.id],
    description: question.id
  })
  const modules = []

  const contactFlowEnd = ContactFlowEnd({ ownUUID: endUUID })
  modules.push(contactFlowEnd)

  const contactFlowRepeat = ContactFlowRepeat({
    ownUUID: repeatUUID,
    transitionUUID: uuidMap[question.id],
    positionX: positionX,
    positionY: positionY + 200,
    text: repeatText
  })
  modules.push(contactFlowRepeat)

  const contactFlowError = ContactFlowError({
    ownUUID: errorUUID,
    transitionUUID: endUUID,
    errorText: errorText
  })
  modules.push(contactFlowError)

  const uniqueTransferUUIDs = Array.from(new Set(transferUUIDs))

  uniqueTransferUUIDs.forEach(t => {

    let current = xxxMap.find(u => u.key === t.key)
    let currentIndex = xxxMap.indexOf(current)
    let nextIndex = currentIndex + 1
    // TODO: clean up this mess....
    let fooName
    if (question.id === xxxMap.slice(-1)[0].key) {
      fooName = "end"
    } else {
      // uniqTransferUUIDs only 1 element? use xxxMap[next] else t.key
      fooName = uniqueTransferUUIDs.length === 1 ? xxxMap[nextIndex].key : t.key
    }

    let resourceName
    if (fooName !== "end") {
      let nextQuestion = xxxMap.find(x => x.key === fooName)
      fooName = xxxMap.indexOf(nextQuestion)
      resourceName = `${basename}_${fooName}`//`generated_charite_data_${fooName}`
    } else {
      // remove this. its a workaround for 100 max contactflows @ amazon connect
      resourceName = `${basename}_end`//"generated_charite_data_end"
    }
    console.log(`${question.id} leads to question number ${fooName}`)

    const contactFlowTransfer = ContactFlowTransfer({
      ownUUID: t.uuid,
      errorUUID: errorUUID,
      resourceName: resourceName//`question_${fooName}_${language}`
    })
    modules.push(contactFlowTransfer)
  })

  const contactFlowStore = ContactFlowStore({
    question: question,
    ownUUID: uuidMap[question.id],
    errorUUID: errorUUID,
    transitionUUIDs: transferUUIDs,
    modules: modules,
    positionX: positionX,
    positionY: positionY,
    //dispatch: dispatch,
    //addKey: addKey
    //maxDigits: question.inputType === "radio" ? "1" : "3"
  })
  modules.push(contactFlowStore)

  contactFlowQuestion.modules = modules

  return contactFlowQuestion
}