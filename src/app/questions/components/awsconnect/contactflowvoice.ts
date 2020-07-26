export interface ContactFlowVoiceProps {
  ownUUID: string,
  transitionUUID: string,
  errorUUID: string,
  voiceType?: string,
  positionX?: number,
  positionY?: number
}

export const ContactFlowVoice = (props: ContactFlowVoiceProps) => {
  let {
    ownUUID, transitionUUID, errorUUID,
    voiceType = "Vicki",
    positionX = 420,
    positionY = 20
  } = props

  return {
    id: ownUUID,
    type: "SetVoice",
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
        name: "GlobalVoice",
        value: voiceType
      }
    ],
    metadata: {
      position: {
        x: positionX,
        y: positionY
      }
    }
  }
}