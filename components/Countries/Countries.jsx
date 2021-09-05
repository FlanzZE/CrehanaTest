import React from 'react'
import { shape, arrayOf } from 'prop-types'
import styles from './Countries.module.css'
import {
  Text,
  LinkBox,
  LinkOverlay,
  Heading,
  Flex,
} from '@chakra-ui/react';
const Countries = ({ countries }) => {
  return (
    <Flex wrap="wrap" className={styles.countriesMainContainer}>
      {countries.length ? countries.map((country) => {
        return (
          <LinkBox key={country.code} m="0.5rem" h="max-content" as="article" maxW="sm" p="5" borderWidth="1px" rounded="md">
            <Heading size="md" my="2">
              <LinkOverlay href={`/country/${country.code}`}>
                {country.name}
              </LinkOverlay>
            </Heading>
          </LinkBox>
        )
      }) : <Text>No se encontraron resultados por favor intenta de nuevo</Text>}
    </Flex>
  )
}

Countries.propTypes = {
  countries: arrayOf(shape())
}
Countries.defaultProps = {
  countries: null
}

export default Countries