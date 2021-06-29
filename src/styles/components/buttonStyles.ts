import { darken, lighten, whiten, mode } from "@chakra-ui/theme-tools";
import { Dict } from "@chakra-ui/utils";

export const ButtonStyle = {
    // Styles for the base style
    baseStyle: {},
    // Styles for the size variations
    sizes: {},
    // Styles for the visual style variations
    variants: {
        iareSolid: (props: Dict<any>) => ({
            bg: "gray.900",
            color: "white",
            _hover: {
                bg: "gray.700",
            },
        }),
    },
    // The default `size` or `variant` values
    defaultProps: {},
};
