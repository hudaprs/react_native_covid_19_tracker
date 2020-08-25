const url = 'https://covid19.mathdro.id/api'

// Get All Covid
export const fetchAllCovid = async () => {
  try {
    const covids = await fetch(url)
    const { confirmed, recovered, deaths, lastUpdate } = await covids.json()

    return { confirmed, recovered, deaths, lastUpdate }
  } catch (err) {
    console.log(err)
  }
}
