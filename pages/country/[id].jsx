import React from 'react'
import { requestGQL } from '../../gql/client';
import { getCountryByCode } from '../../gql/queries/countryQuerys';
import getSymbolFromCurrency from 'currency-symbol-map'
function getLangs(langs) {
  return langs.map(lang => lang.name).join(", ")
}
import {
  Box, Table,
  Thead,
  Td, Tr, Th, Tbody,
  Heading,
  Flex,
} from '@chakra-ui/react';
const Country = ({ country, code }) => {
  return (
    <Flex flexDir="column" alignItems="center" justifyContent="center">
      <Heading as="h1">Detalle de pais:</Heading>
      {
        country
          ?
          <Box>
            <Table variant="striped" colorScheme="purple">
              <Thead>
                <Tr>
                  <Th isNumeric><Heading>{country.name}</Heading></Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Th>Capital:</Th>
                  <Th>{country.capital ? country.capital : "No Capital"}</Th>

                </Tr>
                <Tr>
                  <Td>Phone:</Td>
                  <Td>{country.phone ? country.phone : "No Phone"}</Td>
                </Tr>
                <Tr>
                  <Td>Code:</Td>
                  <Td>{country.code}</Td>
                </Tr>
                <Tr>
                  <Td>Currency</Td>
                  <Td>{`${country.currency} (${getSymbolFromCurrency(country.currency)})`}</Td>
                </Tr>
                <Tr>
                  <Td>Languages:</Td>
                  <Td>{country.languages ? getLangs(country.languages) : "No Langs"}</Td>
                </Tr>
                <Tr>
                  <Td>Continent:</Td>
                  <Td>{country.continent ? country.continent.name : "No Continent"}</Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          : <p>No se encontro resultado con el codigo {code} </p>
      }
    </Flex>
  )
}



export async function getServerSideProps({ params }) {
  const { id } = params
  const { data } = await requestGQL(getCountryByCode, { code: id.toString().toUpperCase() }).then(data => data)
  return { props: { country: data.country || null, code: id } }
}
export default Country