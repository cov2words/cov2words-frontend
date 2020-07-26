export interface ContactFlowTransferProps {
  ownUUID: string,
  errorUUID: string,
  resourceName: string,
  positionX?: number,
  positionY?: number,
  endPoint?: string,
  useDynamic?: boolean
}

export const ContactFlowTransfer = (props: ContactFlowTransferProps) => {
  let {
    ownUUID, errorUUID, resourceName,
    positionX = 20,
    positionY = 600,
    endPoint = "",
    useDynamic = false
  } = props

  return {
    id: ownUUID,
    type: "Transfer",
    branches: [
      {
        condition: "Error",
        transition: errorUUID
      }
    ],
    parameters: [
      {
        name: "ContactFlowId",
        value: endPoint,
        resourceName: resourceName
      }
    ],
    metadata: {
      position: {
        x: positionX,
        y: positionY
      },
      useDynamic: useDynamic,
      ContactFlow: {
        id: endPoint,
        text: resourceName
      }
    },
    target: "Flow"
  }
}