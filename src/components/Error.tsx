import React from "react";
import BaseError from "next/error";
export const ClientError = () => {
    return (
        <BaseError
            statusCode={406}
            title="There seems to not exist any version of this page in your
    selected language"
        />
    );
};
