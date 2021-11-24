const axios = require("axios");
const backup_data = require('../backup_data/event.json');

const resolver = async () => {
    const { data } = await axios.get("https://cms.iare.se/events/");
    const prefetch_data = data.length != 0 ? data[0] : backup_data;

    return {
        basename: "event",
        data: prefetch_data,
    };
};

module.exports = resolver;
