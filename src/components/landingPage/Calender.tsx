export const Calender = () => {
    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                margin: "2rem",
            }}
        >
            <iframe
                src="https://calendar.google.com/calendar/embed?height=600&wkst=1&bgcolor=%23795548&ctz=Europe%2FBerlin&showPrint=1&src=aWFyZS5udV9wcmU5N29kcDhidHVxM3UyYTlpNnUzZm5iY0Bncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=OHBqOThxMDdnYnVlbzIyZnVvNGJkcnU1Zm9AZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23795548&color=%23795548"
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};
