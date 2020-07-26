export interface ContactFlowAttributeProps {
  ownUUID: string,
  errorUUID: string,
  transitionUUID: string,
  value: any,
  key: string,
  positionX: number,
  positionY: number,
  namespace?: string | null
}

export const ContactFlowAttribute = (props: ContactFlowAttributeProps) => {
  let {
    ownUUID, errorUUID, transitionUUID, value, key, positionX, positionY,
    namespace = null
  } = props
  return {
    id: ownUUID,
    type: "SetAttributes",
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
        name: "Attribute",
        value: value,
        key: key,
        namespace: namespace
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