const axios = require("axios");
const backup_data = require("../backup_data/post.json");

const resolver = async () => {
    const url =
        process.env.NODE_ENV === "production"
            ? "https://cms.iare.se/posts"
            : "http://localhost:1337/posts";
    const { data } = await axios.get(url);
    const prefetch_data = data.length != 0 ? data[0] : backup_data;

    return {
        basename: "blog",
        data: prefetch_data,
    };
};

module.exports = resolver;
