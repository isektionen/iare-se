const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/events/");

    return {
        basename: "event",
        data,
    };
};

module.exports = resolver;
