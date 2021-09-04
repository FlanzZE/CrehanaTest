import React, { useEffect } from 'react'
import { shape, arrayOf } from 'prop-types'
import styles from './Countries.module.css'
const Countries = ({ countries }) => {
  useEffect(() => {
    console.log('========from ue============================');
    console.log(countries);
    console.log('====================================');
  }, []);
  return (
    <div className={styles.countriesMainContainer}>
      {countries.length ? countries.map((country, id) => {
        return (<div key={`${id}${country.code}`}>
          <a href={`/country/${country.code}`}> {country.name} </a>
        </div>)
      }) : <p>No se encontraron resultados por favor intenta de nuevo</p>}
    </div>
  )
}

Countries.propTypes = {
  countries: arrayOf(shape())
}
Countries.defaultProps = {
  countries: null
}

export default Countries