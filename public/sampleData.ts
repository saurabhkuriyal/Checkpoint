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
        tripDate: "2026-03-13",
        tripDiscussion: "This is a two-day sample trip to Goa.",
        groups: [

            {
                groupId: generateId(),
                date: "2026-03-13",
                tasks: [
                    { id: generateId(), name: "Train Status Check", description: "Verify train running status. Evidence: Screenshot", time: "3:30" },
                    { id: generateId(), name: "Teacher Coordination", description: "Confirm arrival time of students. Evidence: Call log", time: "3:30" },

                    { id: generateId(), name: "Student Head Count", description: "Confirm total students. Evidence: Group photo at station", time: "4:00" },
                    { id: generateId(), name: "Teacher Head Count", description: "Confirm teachers. Evidence: Group photo at station", time: "4:00" },
                    { id: generateId(), name: "Luggage Check", description: "Ensure all baggage tagged. Evidence: Group photo at station", time: "4:00" },

                    { id: generateId(), name: "Coach Number Verification", description: "Confirm coach details", time: "4:30" },
                    { id: generateId(), name: "Seat Allocation", description: "Guide students to seats", time: "4:30" },
                    { id: generateId(), name: "Luggage Placement", description: "Safe luggage arrangement", time: "4:30" },

                    { id: generateId(), name: "Final Head Count", description: "Confirm all boarded", time: "4:45" },
                    { id: generateId(), name: "Safety Briefing", description: "Train discipline rules", time: "4:45" },
                    { id: generateId(), name: "Teacher Comfort Check", description: "Ask teachers if comfortable", time: "4:45" }
                ]
            },

            {
                groupId: generateId(),
                date: "2026-03-14",
                tasks: [
                    { id: generateId(), name: "Head Count On Train", description: "Confirm students", time: "2:30" },
                    { id: generateId(), name: "Luggage Verification", description: "Ensure nothing left", time: "2:30" },

                    { id: generateId(), name: "Bus Vendor Call", description: "Confirm buses ready. Evidence: Bus interior photo", time: "2:45" },
                    { id: generateId(), name: "Bus Number & Driver Contact", description: "Record details. Evidence: Bus interior photo", time: "2:45" },
                    { id: generateId(), name: "Bus Inspection", description: "AC / seating / cleanliness. Evidence: Bus interior photo", time: "2:45" },

                    { id: generateId(), name: "Hotel Arrival Confirmation", description: "Inform reception", time: "6:00" },
                    { id: generateId(), name: "Lobby Seating Arrangement", description: "Students wait calmly", time: "6:00" },
                    { id: generateId(), name: "Washroom Coordination", description: "Freshen up rooms", time: "6:00" },

                    { id: generateId(), name: "Menu Verification", description: "Match approved menu. Evidence: Breakfast photo", time: "8:00" },
                    { id: generateId(), name: "Taste Check", description: "TO + Teacher. Evidence: Breakfast photo", time: "8:00" },
                    { id: generateId(), name: "Teacher Table Arrangement", description: "Serve teachers separately. Evidence: Breakfast photo", time: "8:00" },

                    { id: generateId(), name: "Room Allocation", description: "Smooth key distribution", time: "11:00" },
                    { id: generateId(), name: "Room Briefing", description: "Damage responsibility rules", time: "11:00" },
                    { id: generateId(), name: "Movement Rule", description: "No visiting other rooms", time: "11:00" },

                    { id: generateId(), name: "Menu Verification", description: "Match menu", time: "1:30" },
                    { id: generateId(), name: "Teacher Care", description: "Ask satisfaction", time: "1:30" },

                    { id: generateId(), name: "Guide Coordination", description: "Confirm guide availability. Evidence: Group photo", time: "3:00" },
                    { id: generateId(), name: "Student Briefing", description: "Historical significance. Evidence: Group photo", time: "3:00" },
                    { id: generateId(), name: "Head Count", description: "Before entry & exit. Evidence: Group photo", time: "3:00" },

                    { id: generateId(), name: "Head Count", description: "Entry & exit", time: "5:00" },
                    { id: generateId(), name: "Discipline Monitoring", description: "Students remain in groups", time: "5:00" },

                    { id: generateId(), name: "Safety Briefing", description: "Lake discipline", time: "6:30" },
                    { id: generateId(), name: "Boat Ride Coordination", description: "Optional activity", time: "6:30" },

                    { id: generateId(), name: "Student Supervision", description: "Maintain discipline", time: "8:00" },
                    { id: generateId(), name: "Teacher Presence", description: "Ensure monitoring", time: "8:00" },

                    { id: generateId(), name: "Dinner Readiness Check", description: "Verify menu", time: "9:00" },
                    { id: generateId(), name: "Taste Check", description: "TO + Teacher", time: "9:00" },

                    { id: generateId(), name: "Visit Each Room", description: "Check student wellbeing", time: "10:30" },
                    { id: generateId(), name: "Lights Off", description: "Discipline control", time: "10:30" }
                ]
            },

            {
                groupId: generateId(),
                date: "2026-03-15",
                tasks: [
                    { id: generateId(), name: "Menu Verification", description: "Match approved menu. Evidence: Breakfast photo", time: "8:00" },
                    { id: generateId(), name: "Taste Check", description: "TO + Teacher. Evidence: Breakfast photo", time: "8:00" },
                    { id: generateId(), name: "Teacher Table Arrangement", description: "Serve teachers separately. Evidence: Breakfast photo", time: "8:00" },

                    { id: generateId(), name: "Bus Vendor Confirmation", description: "Confirm buses 1 hour before departure", time: "8:30" },
                    { id: generateId(), name: "Head Count", description: "Before departure", time: "8:30" },

                    { id: generateId(), name: "Guide Coordination", description: "Historical explanation. Evidence: Group photo", time: "11:00" },
                    { id: generateId(), name: "Head Count", description: "Entry & exit. Evidence: Group photo", time: "11:00" },

                    { id: generateId(), name: "Market Discipline", description: "Students remain in groups", time: "5:30" },
                    { id: generateId(), name: "Craft Activity Coordination", description: "Participate in workshop", time: "5:30" },

                    { id: generateId(), name: "Dinner Readiness Check", description: "Verify menu", time: "9:00" },
                    { id: generateId(), name: "Taste Check", description: "TO + Teacher", time: "9:00" },

                ]
            },

            {
                groupId: generateId(),
                date: "2026-03-16",
                tasks: [
                    { id: generateId(), name: "Menu Verification", description: "Match approved menu. Evidence: Breakfast photo", time: "8:00" },
                    { id: generateId(), name: "Taste Check", description: "TO + Teacher. Evidence: Breakfast photo", time: "8:00" },
                    { id: generateId(), name: "Teacher Table Arrangement", description: "Serve teachers separately. Evidence: Breakfast photo", time: "8:00" },

                    { id: generateId(), name: "Safety Briefing", description: "Lake area discipline", time: "9:00" },
                    { id: generateId(), name: "Head Count", description: "Entry & exit", time: "9:00" },

                    { id: generateId(), name: "Educational Briefing", description: "Historical importance", time: "10:30" },
                    { id: generateId(), name: "Group Photo", description: "Mandatory", time: "10:30" },

                    { id: generateId(), name: "Room Inspection", description: "Damage check", time: "12:00" },
                    { id: generateId(), name: "Key Collection", description: "Clearance", time: "12:00" },

                    { id: generateId(), name: "Menu Verification", description: "Match menu", time: "1:30" },
                    { id: generateId(), name: "Teacher Care", description: "Ask satisfaction", time: "1:30" },


                    { id: generateId(), name: "Guide Briefing", description: "Fort history", time: "3:00" },
                    { id: generateId(), name: "Head Count", description: "Entry & exit", time: "3:00" },

                    { id: generateId(), name: "Dinner Readiness Check", description: "Verify menu", time: "9:00" },
                    { id: generateId(), name: "Taste Check", description: "TO + Teacher", time: "9:00" },

                    { id: generateId(), name: "Bus Coordination", description: "Confirm driver", time: "9:30" },
                    { id: generateId(), name: "Head Count", description: "Before departure", time: "9:30" },

                    { id: generateId(), name: "Coach Verification", description: "Confirm seat numbers", time: "12:45" },
                    { id: generateId(), name: "Final Head Count", description: "Before departure", time: "12:45" }
                ]
            },

            {
                groupId: generateId(),
                date: "2026-03-17",
                tasks: [
                    { id: generateId(), name: "Head Count", description: "Confirm all students", time: "11:00" },
                    { id: generateId(), name: "Luggage Check", description: "Ensure nothing left", time: "11:00" },
                    { id: generateId(), name: "Group Photo", description: "End of tour documentation", time: "11:00" }
                ]
            }

        ]
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
