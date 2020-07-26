export interface ContactFlowErrorProps {
  ownUUID: string,
  transitionUUID: string,
  errorText: string,
  positionX?: number,
  positionY?: number,
  useDynamic?: boolean
}

export const ContactFlowError = (props: ContactFlowErrorProps) => {
  let {
    ownUUID, transitionUUID, errorText,
    positionX = 220,
    positionY = 420,
    useDynamic = false
  } = props
  return {
    id: ownUUID,
    type: "PlayPrompt",
    branches: [
      {
        condition: "Success",
        transition: transitionUUID
      }
    ],
    parameters: [
      {
        name: "Text",
        value: errorText,
        namespace: null
      },
      {
        name: "TextToSpeechType",
        value: "ssml"
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