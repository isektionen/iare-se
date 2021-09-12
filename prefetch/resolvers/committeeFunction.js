const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get(
        "https://cms.iare.se/committee-functions/2"
    );

    return {
        basename: "committeeFunction",
        data,
    };
};

module.exports = resolver;
