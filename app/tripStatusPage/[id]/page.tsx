"use client"

import { useParams } from "next/navigation";

export default function Page() {

    const tripId = useParams();
    console.log("Trip ID: ", tripId);


    return (
        <div>
            <h1>Trip Status Page</h1>
        </div>
    );
}
