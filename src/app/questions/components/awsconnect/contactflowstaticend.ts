import { uuid } from "uuidv4"
import { EmptyContactFlow } from "./emptycontactflow"
import { ContactFlowError } from "./contactflowerror"
import { ContactFlowEnd } from "./contactflowend"
import { ContactFlowInvokeExternal } from "./contactflowinvokeexternal"
import { ContactFlowPlayPrompt } from "./contactflowplayprompt"
import { defaultText } from "./defaulttext"

export interface ContactFlowStaticEndProps {
  language: string,
  name: string
}

export const ContactFlowStaticEnd = (props: ContactFlowStaticEndProps) => {
  let { language, name } = props

  const finishUUID = uuid()
  const endErrorUUID = uuid()
  const lambdaUUID = uuid()
  const recomSpeechUUID = uuid()

  const staticEnd = EmptyContactFlow({
    startUUID: lambdaUUID,
    name: name,
    description: "end"
  })
  const endModules = []

  const endError = ContactFlowError({
    ownUUID: endErrorUUID,
    transitionUUID: finishUUID,
    errorText: defaultText.errorText[language]
  })
  endModules.push(endError)

  const finishLine = ContactFlowEnd({ ownUUID: finishUUID })
  endModules.push(finishLine)

  //const finalState = getState()
  //const lambdaKeys = finalState.creator.lambdaKeys.lambdaKeys
  const lambdaKeys = [] //TODO: send actual lambdakeys

  const lambdaCall = ContactFlowInvokeExternal({
    ownUUID: lambdaUUID,
    errorUUID: endErrorUUID,
    lambdaKeys: lambdaKeys,
    transitionUUID: recomSpeechUUID
  })
  endModules.push(lambdaCall)

  const recomVoice = ContactFlowPlayPrompt({
    ownUUID: recomSpeechUUID,
    transitionUUID: finishUUID,
    errorUUID: endErrorUUID,
    textToSpechType: "text",
    text: "$.External.word1 und $.External.word2"
  })
  endModules.push(recomVoice)

  staticEnd.modules = endModules

  return staticEnd
}