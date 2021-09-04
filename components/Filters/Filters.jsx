import React, { useState, useEffect } from 'react';
import { requestGQL } from '../../gql/client';
import { getFilteredCountries } from '../../gql/queries/countryQuerys';
export const Filters = ({ countries, setCountries }) => {
  const [filterByCode, setfilterByCode] = useState();
  const [filterByContinent, setfilterByContinent] = useState();
  const [filterCurrency, setfilterCurrency] = useState();

  function getContinents() {
    const distinct = [...new Map(countries.map(item =>
      [item.continent['name'], item.continent])).values()];
    return distinct
  }

  function getCurrency() {
    const result = [];
    const map = new Map();
    for (const item of countries) {
      if (!map.has(item.currency) && item.currency) {
        map.set(item.currency, true);    // set any value to Map
        result.push(item.currency);
      }
    }
    return result
  }

  function filterElements(filter) {
    requestGQL(getFilteredCountries, {
      arg: filter
    }).then(({ data }) => {
      setCountries(data.countries)
    })

  }

  useEffect(() => {
    const filtro = {}
    if (filterByCode || filterByContinent || filterCurrency) {
      filterByContinent ? filtro.continent = { regex: filterByContinent } : "";
      filterByCode ? filtro.code = { regex: filterByCode.toUpperCase() } : "";
      filterCurrency ? filtro.currency = { regex: filterCurrency } : "";
      console.log(filtro, "filtro")
      filterElements(filtro)
      return;
    }
    filterElements(filtro)
  }, [filterByCode, filterByContinent, filterCurrency]);


  return (
    <div>
      <p>Buscar por codigo:</p>
      <input type="text" onChange={e => { setfilterByCode(e.target.value) }} />
      <select value={filterByContinent} name="Continent" onChange={(e) => { setfilterByContinent(e.target.value) }} >
        <option value="">Selecciona un continente</option>
        {
          getContinents().map((continent, key) => {
            return <option key={key} value={`${continent.code}`}> {continent.name} </option>
          })
        }
      </select>
      <select value={filterCurrency} name="Currency" onChange={(e) => { setfilterCurrency(e.target.value) }} >
        <option value="">Selecciona un currency</option>
        {
          getCurrency().map((currency, key) => {
            return <option key={key} value={`${currency}`}> {currency} </option>
          })
        }
      </select>

    </div >
  )
}
export default Filters