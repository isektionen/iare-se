const axios = require("axios");
const resolver = async (force_local) => {
    const url =
        process.env.NODE_ENV === "production" || !force_local
            ? "https://cms.iare.se/committee-functions/2"
            : "http://localhost:1337/committee-functions/2";
    const { data } = await axios.get(url);

    return {
        basename: "committeeFunction",
        data,
    };
};

module.exports = resolver;
