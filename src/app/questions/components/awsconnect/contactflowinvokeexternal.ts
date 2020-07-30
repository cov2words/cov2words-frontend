export interface ContactFlowInvokeExternalProps {
  ownUUID: string,
  transitionUUID: string,
  errorUUID: string,
  lambdaKeys: any[]
  positionX?: number
  positionY?: number
  endPoint?: string
}

export const ContactFlowInvokeExternal = (props: ContactFlowInvokeExternalProps) => {
  let {
    ownUUID, transitionUUID, errorUUID, lambdaKeys,
    positionX = 337,
    positionY = 35,
    endPoint = "arn:aws:lambda:eu-west-2:260148551992:function:determineWordsForCovApp",
  } = props
  let dynamicParameters = []
  let dynamicMetadata = {}

  lambdaKeys.forEach((key, i) => {
    let dynamicParamter = {
      name: "Parameter",
      key: key.name,
      value: `$.Attributes.${key.name}`,
      namespace: null
    }
    //let dynamicMetadata = {[key]: false} woopsie
    dynamicParameters.push(dynamicParamter)
    dynamicMetadata[key] = false
  })

  console.log({ dynamicMetadata })

  return {
    id: ownUUID,
    type: "InvokeExternalResource",
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
        name: "FunctionArn",
        value: endPoint,
        namespace: null
      },
      {
        name: "TimeLimit",
        value: "8"
      },
      ...dynamicParameters
    ],
    metadata: {
      position: {
        x: positionX,
        y: positionY
      },
      dynamicMetadata: dynamicMetadata,
      useDynamic: false
    },
    target: "Lambda"
  }
}