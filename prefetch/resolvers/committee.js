const axios = require("axios");
const resolver = async () => {
    const url =
        process.env.NODE_ENV === "production"
            ? "https://cms.iare.se/committees/1"
            : "http://localhost:1337/committees/1";
    const { data } = await axios.get(url);

    return {
        basename: "committee",
        data,
    };
};

module.exports = resolver;
