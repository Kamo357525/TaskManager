import {extendTheme} from "@chakra-ui/react";
import '@fontsource/open-sans/400.css'

const theme = extendTheme({
    config: {
        initialColorMode: "light",
        useSystemColorMode: false,
    },
    fonts: {
        body: `'Open Sans', sans-serif`,
    },
});

export default theme;
