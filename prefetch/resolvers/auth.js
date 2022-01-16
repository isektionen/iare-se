const axios = require("axios").default;
const path = require("path");
const opath = path.resolve(process.cwd(), ".env.local");
require("dotenv").config({ path: opath });

const resolver = async (force_local) => {
    const url =
        process.env.NODE_ENV === "production" && !force_local
            ? "https://cms.iare.se/remote-services/init"
            : "http://localhost:1337/remote-services/init";
    const body = {
        email: process.env.AUTH_EMAIL,
        password: process.env.AUTH_PASSWORD,
    };
    const token = await axios.post(url, body);
    if (token) {
        console.log("Frontend authenticated");
    } else {
        console.log("Frontend is authenticated");
    }
    return {
        basename: "auth",
        data: { token: token.data },
    };
};

module.exports = resolver;
