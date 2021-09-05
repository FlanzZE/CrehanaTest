import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      'html, body': {
        width: '100%',
        height: '100%',
        position: 'relative',
        fontSize: '25px',
      },
    },
  },
});

export default theme;
