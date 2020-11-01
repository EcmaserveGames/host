const path = require('path')
const protobuf = require('protobufjs')

const loadProtobufAsync = (path) =>
  new Promise((resolve, reject) => {
    protobuf.load(path, (err, root) => {
      if (err) return reject(err)
      resolve(root)
    })
  })

let actionResponseResolver
async function loadActionResponseAsync() {
  actionResponseResolver =
    actionResponseResolver ||
    loadProtobufAsync(path.resolve(__dirname, './ActionResponse.proto'))
  const root = await actionResponseResolver
  return root.lookupType('ecmaservegames.host.ActionResponse')
}

const loadStateAsync = async (path, package) => {
  const root = await loadProtobufAsync(path)
  try {
    const State = root.lookupType(`${package}.State`)
    return State
  } catch (e) {
    console.error(
      'You must provide a protobuf file for State in the structure of ',
      `
message State {
  ...
}
    `,
      e
    )
    throw e
  }
}

const loadActionsAsync = async (path, package) => {
  const root = await loadProtobufAsync(path)
  try {
    const Actions = root.lookupType(`${package}.Actions`)
    if (!Actions.oneofs || !Actions.oneofs.Action) {
      throw new Error(
        'missing a oneof Action in your Actions message structure'
      )
    }
    return Actions
  } catch (e) {
    console.error(
      'You must provide a protobuf file for Actions in the structure of ',
      `
message Actions {
  oneof Action {
    ...
  }
}
    `,
      e
    )
    throw e
  }
}

module.exports = {
  loadProtobufAsync,
  loadActionResponseAsync,
  loadActionsAsync,
  loadStateAsync,
}
