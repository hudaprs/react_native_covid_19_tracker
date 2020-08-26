const url = 'https://covid19.mathdro.id/api'

// Get All Covid
export const fetchAllCovid = async (country = '') => {
  try {
    const covids = await fetch(
      country !== '' ? `${url}/countries/${country}` : url
    )
    const { confirmed, recovered, deaths, lastUpdate } = await covids.json()

    return { confirmed, recovered, deaths, lastUpdate }
  } catch (err) {
    console.log(err)
  }
}

export const fetchAllCountry = async () => {
  try {
    const data = await fetch(`${url}/countries`)
    const { countries } = await data.json()

    return countries
  } catch (err) {
    console.log(err)
  }
}
