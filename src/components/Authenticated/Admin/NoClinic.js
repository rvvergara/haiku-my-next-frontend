import React from 'react';
import Router from 'next/router';

const handleRedirect = () => {
    Router.push('/')
}

export default function NoClinic() {
    return (
        <div>
            <div>Clinic is not created yet.</div>
            <button onClick={() => handleRedirect()}>Set up clinic</button>
        </div>
    )
}
