// https://github.com/mike-north/professional-ts/blob/master/src/utils/networking.js

/* API */
/**
 *
 * @param input
 * @param init
 */
async function getJSON(input: RequestInfo, init?: RequestInit) {
  try {
    const response = await fetch(input, init)
    const responseJSON = await response.json()
    return { response, json: responseJSON }
  } catch (err) {
    throw new Error(
      `Networking/getJSON: An error was encountered while fetching ${JSON.stringify(
        input
      )}`
    )
  }
}

/**
 *
 * @param path
 * @param init
 */
async function apiCall(path: string, init?: RequestInit): Promise<any> {
  let response
  let json
  try {
    const jsonRespInfo = await getJSON(`/api/${path}`, init)
    response = jsonRespInfo.response
    json = jsonRespInfo.json
  } catch (err) {
    throw new Error(
      `Networking/apiCall: An error was encountered while making api call to ${path}`
    )
  }
  if (!response.ok) throw new Error("Problem while making API call")
  return json
}

/* Model to verify */
interface ITeam {
  iconUrl: string
  name: string
  id: string
  channels: string[]
}

/* Code that use the API response */
let cachedAllTeamsList: Promise<ITeam[]>
async function getAllTeams(): Promise<ITeam[]> {
  if (typeof cachedAllTeamsList === "undefined")
    cachedAllTeamsList = apiCall("teams").then((rawData) => {
      assertIsTypedArray(rawData, isITeam)
      return rawData
    })

  return await cachedAllTeamsList
}

/* Type checks at runtime */
function isITeam(arg: any): arg is ITeam {
  return (
    typeof arg.iconUrl === "string" &&
    typeof arg.name === "string" &&
    typeof arg.id === "string" &&
    Array.isArray(arg.channels)
  )
}

function assertIsTypedArray<T>(
  arg: any,
  check: (val: any) => val is T
): asserts arg is T[] {
  if (!Array.isArray(arg))
    throw new Error(`Not an array: ${JSON.stringify(arg)}`)
  if (!arg.some((item) => !check(item)))
    throw new Error(`Violators found: ${JSON.stringify(arg)}`)
}
