const axios = require("axios").default;
const path = require("path");
const opath = path.resolve(process.cwd(), ".env.local");
require("dotenv").config({ path: opath });

const resolver = async () => {
    const url = "https://cms.iare.se/remote-services/init";
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
