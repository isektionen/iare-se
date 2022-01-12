const axios = require("axios");
const resolver = async () => {
    const url =
        process.env.NODE_ENV === "production"
            ? "https://cms.iare.se/representatives/1"
            : "http://localhost:1337/representatives/1";
    const { data } = await axios.get(url);

    return {
        basename: "representative",
        data,
    };
};

module.exports = resolver;
