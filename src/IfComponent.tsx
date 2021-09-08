import React from "react";

export default function IF({condition, children}:{condition: Boolean, children:JSX.Element}) {
    if(condition && children ) {
        return children
    }
    return <></>;
}