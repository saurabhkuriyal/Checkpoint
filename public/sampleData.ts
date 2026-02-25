// sampleData.ts
// contains predefined trip templates that can be loaded into the form

// simple id generator copied from page.tsx; not exported elsewhere
const generateId = () => Math.random().toString(36).substr(2, 9);

export interface TaskRow {
    id: string;
    name: string;
    description: string;
    time: string;
}

export interface DateGroup {
    groupId: string;
    date: string;
    tasks: TaskRow[];
}

export interface TripTemplate {
    tripName: string;
    tripDate: string;
    tripDiscussion: string;
    groups: DateGroup[];
}

export const templatesById: Record<string, TripTemplate> = {
    goa: {
        tripName: "Goa getaway",
        tripDate: "2026-03-01",
        tripDiscussion: "This is a two-day sample trip to Goa.",
        groups: [
            {
                groupId: generateId(),
                date: "2026-03-01",
                tasks: [
                    { id: generateId(), name: "Arrive at hotel", description: "Check-in and rest", time: "14:00" },
                    { id: generateId(), name: "Beach walk", description: "Evening stroll", time: "18:00" },
                ],
            },
            {
                groupId: generateId(),
                date: "2026-03-02",
                tasks: [
                    { id: generateId(), name: "Morning yoga", description: "On the beach", time: "07:00" },
                    { id: generateId(), name: "City tour", description: "Local sights", time: "10:00" },
                ],
            },
        ],
    },
    jaipur: {
        tripName: "Jaipur excursion",
        tripDate: "2026-04-10",
        tripDiscussion: "A three-day cultural tour in Jaipur.",
        groups: [
            {
                groupId: generateId(),
                date: "2026-04-10",
                tasks: [
                    { id: generateId(), name: "Visit Amber Fort", description: "Morning visit", time: "09:00" },
                ],
            },
            {
                groupId: generateId(),
                date: "2026-04-11",
                tasks: [
                    { id: generateId(), name: "City Palace", description: "Explore palace", time: "11:00" },
                ],
            },
        ],
    },
};
