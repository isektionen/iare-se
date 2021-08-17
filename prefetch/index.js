const fs = require("fs");
const header = require("./resolvers/header");
const footer = require("./resolvers/footer");

const config = {
    resolvers: [header, footer],
};

const prefetch = () => {
    const { resolvers } = config;

    resolvers.forEach(async (resolver) => {
        const { basename, data } = await resolver();
        fs.writeFileSync(
            __dirname + `/static/${basename}.json`,
            JSON.stringify(data, null, 4)
        );
        console.log("prefetched:", basename);
    });
};

prefetch();
