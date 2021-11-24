const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/posts/");

    return {
        basename: "blog",
        data,
    };
};

module.exports = resolver;
