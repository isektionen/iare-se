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
                src="https://calendar.google.com/calendar/u/0/embed?src=iare.nu_pre97odp8btuq3u2a9i6u3fnbc@group.calendar.google.com&ctz=Europe/Stockholm&fbclid=IwAR1_uo_FW2eWkIlQq7G926j8k8LMuaprP9d0ZABhcQ0pfv4l2EVZELjPtYw"
                style={{ border: 0 }}
                width="800"
                height="600"
                frameBorder="0"
                scrolling="no"
            ></iframe>
        </div>
    );
};
