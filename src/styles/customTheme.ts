import { theme, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { ButtonStyle as Button } from "./components/buttonStyles";
const breakpoints = createBreakpoints({
    sm: "30em",
    md: "50em",
    lg: "62em",
    xl: "80em",
    "2xl": "96em",
});

const customTheme = extendTheme({
    fonts: {
        ...theme.fonts,
        body: "Source Sans Pro",
        heading: "Source Sans Pro",
    },
    colors: {
        ...theme.colors,
        gray: {
            ...theme.colors.gray,
            50: "#F3F5F5",
            100: "#ECEFEF",
            200: "hsla(180, 3%, 88%, 1)",
            700: "hsla(196, 14%, 25%, 1)",
            800: "hsla(196, 14%, 18%, 1)",
            900: "hsla(196, 14%, 12%, 1)",
        },
    },
    breakpoints,
    components: { Button },
});

export default customTheme;
