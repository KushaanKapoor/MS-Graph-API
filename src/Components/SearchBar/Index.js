import React, { useState } from 'react';
import {
  Input,
  Stack,
  Text,
  InputGroup,
  InputLeftElement,
  Button
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';

function SearchBar(props) {
  const [input, setInput] = useState();
  const [isLoading, setLoading] = useState(false);
  const handleChange = (event) => setInput(event.target.value)

  return (
    <Stack spacing={4} marginY={6}>
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input placeholder="Search" value={input}
        onChange={handleChange}/>
    <Button
    colorScheme="blue.500"
    variant="outline"
    onClick={() => props.searchEmail(input)}
  >
    Search
  </Button>
      </InputGroup>
    </Stack>
  );
}
export default SearchBar;
