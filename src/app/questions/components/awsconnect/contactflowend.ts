export interface ContactFlowEndProps {
  ownUUID: string,
  positionX?: number,
  positionY?: number
}

export const ContactFlowEnd = (props: ContactFlowEndProps) => {
  let {
    ownUUID,
    positionX = 20,
    positionY = 220
  } = props

  return {
    id: ownUUID,
    type: "Disconnect",
    branches: [],
    parameters: [],
    metadata: {
      position: {
        x: positionX,
        y: positionY
      }
    }
  }

}