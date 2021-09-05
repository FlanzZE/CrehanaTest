import React, { useState, useEffect } from 'react';
import { requestGQL } from '../../gql/client';
import { getFilteredCountries } from '../../gql/queries/countryQuerys';
import { func, array } from 'prop-types'
import {
  Select,
  Input,
  Flex,
} from '@chakra-ui/react';
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
        map.set(item.currency, true);
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
      filterElements(filtro)
      return;
    }
    filterElements(filtro)
  }, [filterByCode, filterByContinent, filterCurrency]);


  return (
    <Flex>
      <Input
        placeholder="Ingrese codigo"
        type="text"
        onChange={e => { setfilterByCode(e.target.value) }} />
      <Select
        value={filterByContinent}
        name="Continent"
        onChange={(e) => { setfilterByContinent(e.target.value) }} >
        <option value="">Selecciona un continente</option>
        {
          getContinents().map((continent, key) => {
            return <option key={key} value={`${continent.code}`}> {continent.name} </option>
          })
        }
      </Select>
      <Select value={filterCurrency} name="Currency" onChange={(e) => { setfilterCurrency(e.target.value) }} >
        <option value="">Selecciona un currency</option>
        {
          getCurrency().map((currency, key) => {
            return <option key={key} value={`${currency}`}> {currency} </option>
          })
        }
      </Select>
    </Flex >
  )
}

Filters.propTypes = {
  countries: array.isRequired,
  setCountries: func.isRequired
}
export default Filters