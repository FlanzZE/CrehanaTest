import React from 'react'
import { requestGQL } from '../../gql/client';
import { getCountryByCode } from '../../gql/queries/countryQuerys';
import getSymbolFromCurrency from 'currency-symbol-map'
function getLangs(langs) {
  console.log('====================================');
  console.log(langs.map(lang => lang.name).join(", "));
  console.log('====================================');
  return langs.map(lang => lang.name).join(", ")
}

const Country = ({ country, code }) => {
  console.log(country);
  return (
    <div>
      {
        country
          ?
          <div>
            <h1 style={{ textAlign: "center" }} > {country.name}, {country.capital} </h1>
            <p>Phone: {country.phone ? country.phone : "No Phone"} </p>
            <p>Code: {country.code} </p>
            <p>Currency: {`${country.currency} (${getSymbolFromCurrency(country.currency)})`} </p>
            <p>Languages: {country.languages ? getLangs(country.languages) : "No Langs"} </p>
            <p>Continent: {country.continent ? country.continent.name : "No Continent"} </p>
            <p>Phone: {country.phone ? country.phone : "No Phone"} </p>
          </div>
          : <p>No se encontro resultado con el codigo {code} </p>
      }
    </div>
  )
}



export async function getServerSideProps({ params }) {
  const { id } = params
  const { data } = await requestGQL(getCountryByCode, { code: id.toString().toUpperCase() }).then(data => data)
  return { props: { country: data.country || null, code: id } }
}
export default Country