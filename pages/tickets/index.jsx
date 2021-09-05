import React, { useState } from 'react'
import {
  Stack,
  Badge, Textarea,
  Heading,
  Flex,
} from '@chakra-ui/react';
export const Index = () => {
  const [tickets, settickets] = useState("25,25,50");
  const hasChange = bills => {
    const arrayBill = bills.split(",")
    let bill25 = 0;
    let bill50 = 0;
    arrayBill.map(el => {
      parseInt(el) == 25
        ? bill25++
        : parseInt(el) == 50
          ? (bill50++, bill25--)
          : (
            bill50
              ? bill50--
              : bill25 -= 2, bill25--
          );
      if (bill25 < 0) return false;
    })
    if (bill25 >= 0) {
      return true;
    }
    return false
  };
  return (
    <Flex flexDir="column" style={{ padding: "1rem" }}>
      <Heading>Tickets</Heading>

      <Heading as="h2" >Ingresa el orden de los billetes separados por comas</Heading>
      <Textarea
        value={tickets}
        name="Tickets"
        id="1"
        cols="30"
        rows="10"
        onChange={
          ({ target }) => {
            const { value } = target;
            settickets(value.replace(/\s/g, ''))
          }
        } />
      <Stack direction="row">
        <Badge
          id="result"
          variant={hasChange(tickets) ? "solid" : "subtle"}
          colorScheme={hasChange(tickets) ? "green" : "red"}>
          {hasChange(tickets) ? "Hay cambio" : "No hay cambio"}
        </Badge>
      </Stack>

    </Flex>
  )
}
export default Index