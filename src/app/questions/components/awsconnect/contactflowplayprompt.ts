export interface ContactFlowPlayPromptProps {
  ownUUID: string,
  transitionUUID: string,
  errorUUID: string,
  text: string,
  positionX?: number,
  positionY?: number,
  useDynamic?: boolean,
  textToSpechType?: string
}

export const ContactFlowPlayPrompt = (props: ContactFlowPlayPromptProps) => {
  let {
    ownUUID, transitionUUID, errorUUID, text,
    positionX = 620,
    positionY = 20,
    useDynamic = false,
    textToSpechType = "ssml"
  } = props

  return {
    id: ownUUID,
    type: "PlayPrompt",
    branches: [
      {
        condition: "Success",
        transition: transitionUUID
      },
      {
        condition: "Error",
        transition: errorUUID
      }
    ],
    parameters: [
      {
        name: "Text",
        value: text,
        namespace: null
      },
      {
        name: "TextToSpeechType",
        value: textToSpechType
      }
    ],
    metadata: {
      position: {
        x: positionX,
        y: positionY
      },
      useDynamic: useDynamic
    }
  }
}