const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/committees/1");

    return {
        basename: "committee",
        data,
    };
};

module.exports = resolver;
