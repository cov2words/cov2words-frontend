export interface EmptyContactFlowProps {
  startUUID: string,
  name: string,
  version?: string,
  positionX?: number,
  positionY?: number,
  description?: string,
  snapToGrid?: boolean
}

export const EmptyContactFlow = (props: EmptyContactFlowProps) => {
  let {
    startUUID, name,
    version = "1",
    positionX = 20,
    positionY = 50,
    description = "generated Contactflow",
    snapToGrid = true
  } = props

  return {
    modules: [],
    version: version,
    type: "contactFlow",
    start: startUUID,
    metadata: {
      entryPointPosition: {
        x: positionX,
        y: positionY
      },
      snapToGrid: snapToGrid,
      name: name,
      description: description,
      type: "contactFlow",
      status: "saved"
    }
  }
}