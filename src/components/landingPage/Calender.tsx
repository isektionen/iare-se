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
                src="https://calendar.google.com/calendar/embed?src=iare.nu_pre97odp8btuq3u2a9i6u3fnbc%40group.calendar.google.com&ctz=Europe%2FStockholm"
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};
