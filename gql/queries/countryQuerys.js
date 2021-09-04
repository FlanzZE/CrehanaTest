import { gql } from '@apollo/client';


export const getCountries = gql`
    query {
      countries{ 
        name,
        currency,
        code,
        continent{
          name,
          code
        }
      }
    
  }
    `

export const getFilteredCountries = gql`
query countries($arg: CountryFilterInput) {
  countries(filter: $arg){ 
  name,
  currency,
  code,
  continent{
    name,
    code
  }
}
}

`;

export const getCountryByCode = gql`query($code:ID!) {
  country(code:$code){
    code,
    name,
    native,
    phone,
    continent{
      code, 
      name,
    }
    languages{
      name
    },
    capital,
    currency,
    states{
      name
    }
  }
}
`;