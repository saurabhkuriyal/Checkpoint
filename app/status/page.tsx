"use client";

import axios from "axios";
import { useState } from "react";

export default function StatusPage() {
    const [data, setData] = useState<any>(null);

    const getStatus = async () => {
        try {
            const response = await axios.get("https://n8n.srv1134060.hstgr.cloud/webhook-test/ee5a691f-2d88-4824-88b5-762346d5b3fe");
            setData(response.data);
            console.log(response.data);
        } catch (error) {
            console.error(error);
            setData({ error: "Failed to fetch status" });
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center gap-5 p-10">
            <button
                onClick={getStatus}
                className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 shadow-md active:scale-95 transition-all"
            >
                Status
            </button>

            {data && (
                <div className="mt-5 p-6 border border-slate-100 rounded-xl bg-slate-50 max-w-lg w-full overflow-auto shadow-sm">
                    <pre className="text-xs text-slate-700">{JSON.stringify(data, null, 2)}</pre>
                </div>
            )}
        </div>
    );
}
