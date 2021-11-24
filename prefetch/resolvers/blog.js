const axios = require("axios");
const backup_data = require('../backup_data/post.json');

const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/posts/");
    const prefetch_data = data.length != 0 ? data[0] : backup_data;

    return {
        basename: "blog",
        data: prefetch_data,
    };
};

module.exports = resolver;
