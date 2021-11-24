const axios = require("axios");
const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/posts/1");

    return {
        basename: "blog",
        data,
    };
};

module.exports = resolver;
