const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/jobs/1");

    return {
        basename: "job",
        data,
    };
};

module.exports = resolver;
