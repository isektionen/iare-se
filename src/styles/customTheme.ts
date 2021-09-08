import { theme, extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import { ButtonStyle as Button } from "./components/buttonStyles";
import { StepsStyleConfig as Steps } from "chakra-ui-steps";
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
        heading: "Oxygen",
    },
    colors: {
        ...theme.colors,
        gray: {
            ...theme.colors.gray,
            50: "#F3F5F5",
            100: "hsla(180, 3%, 88%, 1)", //"#ECEFEF",
            200: "hsla(180, 3%, 88%, 1)",
            300: "hsla(180, 3%, 66%, 1)",
            500: "#90A2A2",
            700: "hsla(196, 14%, 25%, 1)",
            800: "hsla(196, 14%, 18%, 1)",
            900: "hsla(196, 14%, 12%, 1)",
        },
        brand: {
            50: "#E2D8CF",
            100: "#C5B19F",
            200: "#C5B19F",
            500: "#976E49",
            600: "#976E49",
        },
        porter: {
            100: "#fff",
            200: "#ECEFEF",
            400: "#CBD5E0",
            500: "tomato",
        },
        dark: {
            100: "hsla(196, 14%, 12%, 1)",
            800: "#F3F5F5",
        },
    },
    breakpoints,
    components: { Button, Steps },
});

export default customTheme;
