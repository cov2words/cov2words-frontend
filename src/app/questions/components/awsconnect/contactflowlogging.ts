export interface ContactFlowLoggingProps {
  ownUUID: string,
  transitionUUID: string,
  errorUUID: string,
  positionX?: number,
  positionY?: number
}

export const ContactFlowLogging = (props: ContactFlowLoggingProps) => {
  let {
    ownUUID, transitionUUID, errorUUID,
    positionX = 220,
    positionY = 20
  } = props

  return {
    id: ownUUID,
    type: "SetLoggingBehavior",
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
        name: "LoggingBehavior",
        value: "Enable"
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