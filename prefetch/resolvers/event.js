const axios = require("axios");
const backup_data = require("../backup_data/event.json");

const resolver = async (force_local) => {
    const url =
        process.env.NODE_ENV === "production" || !force_local
            ? "https://cms.iare.se/events"
            : "http://localhost:1337/events";
    const { data } = await axios.get(url);
    const prefetch_data = data.length !== 0 ? data[0] : backup_data;

    return {
        basename: "event",
        data: prefetch_data,
    };
};

module.exports = resolver;
