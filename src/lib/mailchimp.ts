import mailchimp from "@mailchimp/mailchimp_marketing";

mailchimp.setConfig({
    apiKey: process.env.MAILCHIMP_API_KEY,
    server: process.env.MAILCHIMP_SERVER,
});

const status = mailchimp.Status;

const client = {
    subscribe: async ({ email }: { email: string }) => {
        return await fetch("/api/mailchimp/subscribe", {
            body: JSON.stringify({
                email,
            }),
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
        });
    },
};

export { mailchimp, status, client };
