export interface ContactFlowRepeatProps {
  ownUUID: string,
  transitionUUID: string,
  positionX: number,
  positionY: number,
  text: string,
  useDynamic?: boolean
}

export const ContactFlowRepeat = (props: ContactFlowRepeatProps) => {
  let {
    ownUUID, transitionUUID, positionX, positionY, text,
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
        value: text,
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