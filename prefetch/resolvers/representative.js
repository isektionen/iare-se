const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/representatives/1");

    return {
        basename: "representative",
        data,
    };
};

module.exports = resolver;
