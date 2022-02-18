const axios = require("axios");
const resolver = async (force_local) => {
    const url =
        process.env.NODE_ENV === "production" || !force_local
            ? "https://cms.iare.se/committees/1"
            : "http://localhost:1337/committees/1";
    const { data } = await axios.get(url);

    return {
        basename: "committee",
        data,
    };
};

module.exports = resolver;
