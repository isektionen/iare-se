const fs = require("fs");
const header = require("./resolvers/header");
const event = require("./resolvers/event");
const auth = require("./resolvers/auth");
const footer = require("./resolvers/footer");
const blog = require("./resolvers/blog");
const committee = require("./resolvers/committee");
const representative = require("./resolvers/representative");
const job = require("./resolvers/job");
const committeeFunction = require("./resolvers/committeeFunction");

const config = {
    resolvers: [
        header,
        footer,
        auth,
        event,
        blog,
        committee,
        representative,
        job,
        committeeFunction,
    ],
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
