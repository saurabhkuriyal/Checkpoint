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
    tripName: "JIBHI - TIRTHAN VALLEY TRIP",
    tripDate: "9 MAY",
    tripDiscussion: "Jibhi - Tirthan Valley Trip - Operational Control Checklist. TO: Ankit. Monitoring: Central / Tour Manager.",
    groups:[
  {
    groupId: generateId(),
    date: "2026-03-09",
    tasks: [
      { id: generateId(), name: "Pre-Departure Setup", description: "Arrive early at school, check bus readiness, coordinate with driver and teachers, prepare attendance list", time: "19:30" },
      { id: generateId(), name: "Student Reporting & Attendance", description: "Headcount, mark attendance, verify student IDs", time: "20:30" },
      { id: generateId(), name: "Final Briefing", description: "Give instructions on discipline, safety, and journey rules after seating", time: "21:00" },
      { id: generateId(), name: "Luggage Loading", description: "Supervise luggage placement and ensure proper handling", time: "21:30" },
      { id: generateId(), name: "Departure & Headcount", description: "Final headcount in each bus including teachers, ensure all students seated properly", time: "22:00" },
      { id: generateId(), name: "Journey Monitoring", description: "Maintain discipline, ensure safety, avoid disturbance during travel", time: "23:00" }
    ]
  },
  {
    groupId: generateId(),
    date: "2026-03-10",
    tasks: [
      { id: generateId(), name: "Arrival & Headcount", description: "Check all students present after arrival", time: "06:00" },
      { id: generateId(), name: "Vehicle Transfer", description: "Manage transfer from bus to local vehicles with luggage", time: "06:30" },
      { id: generateId(), name: "Travel to Camp", description: "Ensure safe and smooth transfer to campsite", time: "07:00" },
      { id: generateId(), name: "Arrival & Breakfast", description: "Coordinate breakfast and manage students", time: "08:00" },
      { id: generateId(), name: "Pre Check-in Management", description: "Brief property rules and discipline, keep students engaged", time: "10:00" },
      { id: generateId(), name: "Room Allotment", description: "Assign rooms as per list and resolve issues", time: "12:00" },
      { id: generateId(), name: "Lunch Coordination", description: "Food tasting, ensure lunch readiness and proper discipline", time: "13:00" },
      { id: generateId(), name: "Sightseeing Departure", description: "Headcount before departure, manage group movement", time: "14:30" },
      { id: generateId(), name: "Dinner Coordination", description: "Food tasting, ensure dinner readiness, briefing for next day", time: "19:30" },
      { id: generateId(), name: "Night Discipline Check", description: "Room checks and ensure lights-off discipline", time: "22:00" }
    ]
  },
  {
    groupId: generateId(),
    date: "2026-03-11",
    tasks: [
      { id: generateId(), name: "Wake-Up Coordination", description: "Wake-up call and ensure all students are ready", time: "07:00" },
      { id: generateId(), name: "Breakfast", description: "Food tasting and ensure proper meal before trek", time: "08:00" },
      { id: generateId(), name: "Departure for Trek", description: "Headcount and move group to trek starting point", time: "09:00" },
      { id: generateId(), name: "Trek Management", description: "Safety briefing, monitor group movement and pacing", time: "10:30" },
      { id: generateId(), name: "Packed Lunch Break", description: "Distribute and manage lunch during trek", time: "13:30" },
      { id: generateId(), name: "Descent & Activities", description: "Headcount before descent, manage return and activities", time: "15:00" },
      { id: generateId(), name: "Dinner", description: "Food tasting, ensure attendance, briefing for next day", time: "19:30" },
      { id: generateId(), name: "Night Check", description: "Ensure discipline and proper rest", time: "22:00" }
    ]
  },
  {
    groupId: generateId(),
    date: "2026-03-12",
    tasks: [
      { id: generateId(), name: "Wake-Up & Packing", description: "Wake-up call, ensure luggage packed and rooms cleared", time: "06:30" },
      { id: generateId(), name: "Breakfast", description: "Food tasting and coordinate meal before checkout", time: "08:00" },
      { id: generateId(), name: "Checkout", description: "Manage room clearance and final checks", time: "09:00" },
      { id: generateId(), name: "Sightseeing", description: "Headcount and supervise final visits", time: "09:30" },
      { id: generateId(), name: "Lunch", description: "Food tasting and ensure timely meal", time: "12:00" },
      { id: generateId(), name: "Departure to Aut", description: "Call driver, coordinate transport and luggage loading", time: "13:00" },
      { id: generateId(), name: "Bus Boarding", description: "Coordinate vendor, transfer students, final headcount and seating", time: "18:00" },
      { id: generateId(), name: "Return Journey Monitoring", description: "Maintain discipline and ensure safety during return", time: "22:00" }
    ]
  },
  {
    groupId: generateId(),
    date: "2026-03-13",
    tasks: [
      { id: generateId(), name: "Arrival at School", description: "Ensure safe arrival and coordination", time: "06:00" },
      { id: generateId(), name: "Final Handover", description: "Hand over students to parents after final count", time: "06:30" }
    ]
  }
]
}
};

//   jaipur: {
//     tripName: "MERI College – Manali",
//     tripDate: "2026-03-30",
//     tripDiscussion: "Operational Control Checklist for Manali Tour. TO: Ankit. Monitoring: Central / Tour Manager.",
//     groups: [
//         {
//             groupId: generateId(),
//             date: "2026-03-30",
//             tasks: [
//                 { id: generateId(), name: "Student arrival confirmation", description: "Ensure all reported at college. Evidence: Head count", time: "08:00 PM" },
//                 { id: generateId(), name: "Teacher arrival confirmation", description: "Confirm all present. Evidence: Count", time: "08:00 PM" },
//                 { id: generateId(), name: "Bus readiness", description: "Check AC, seats, cleanliness. Evidence: Bus photo", time: "08:00 PM" },
                
//                 { id: generateId(), name: "Head count", description: "Final student + teacher count", time: "08:30 PM" },
//                 { id: generateId(), name: "Luggage tagging", description: "Ensure all bags loaded", time: "08:30 PM" },
//                 { id: generateId(), name: "Safety briefing", description: "Travel discipline rules", time: "08:30 PM" },

//                 { id: generateId(), name: "Final head count", description: "Before bus moves", time: "09:00 PM" },
//                 { id: generateId(), name: "Seat allocation", description: "Students settled", time: "09:00 PM" },
//                 { id: generateId(), name: "Teacher comfort check", description: "Confirm", time: "09:00 PM" },

//                 { id: generateId(), name: "Driver monitoring", description: "No rash driving", time: "Night" },
//                 { id: generateId(), name: "Student discipline", description: "No movement in bus", time: "Night" },
//                 { id: generateId(), name: "Medical check", description: "Any motion sickness", time: "Night" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-03-31",
//             tasks: [
//                 { id: generateId(), name: "Head count", description: "Before deboarding", time: "Morning" },
//                 { id: generateId(), name: "Breakfast coordination", description: "Verify menu. Evidence: Breakfast photo", time: "Morning" },

//                 { id: generateId(), name: "Bus/Local Transport check", description: "Confirm condition", time: "Transfer" },
//                 { id: generateId(), name: "Head count", description: "Before departure", time: "Transfer" },

//                 { id: generateId(), name: "Room allocation", description: "Rooms allocated equally to boys and girls", time: "11:00 AM" },
//                 { id: generateId(), name: "Room briefing", description: "Damage responsibility", time: "11:00 AM" },
//                 { id: generateId(), name: "Movement control", description: "No room switching", time: "11:00 AM" },

//                 { id: generateId(), name: "Escort on Boys section", description: "Escort members should be with boys section", time: "11:00 AM" },


//                 { id: generateId(), name: "Lunch -Menu check", description: "Match plan", time: "01:30 PM" },
//                 { id: generateId(), name: "Teacher care", description: "Separate service", time: "01:30 PM" },

//                 { id: generateId(), name: "For Vashisht Temple -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },

//                 { id: generateId(), name: "For Hadimba Temple -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },


//                 { id: generateId(), name: "Tibetian Monastery -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },
            

//                 { id: generateId(), name: "Mall Road -Head count", description: "At every location. Evidence: Group photo", time: "03:00 PM" },
//                 { id: generateId(), name: "Group discipline", description: "No isolation", time: "03:00 PM" },
//                 { id: generateId(), name: "Market control", description: "Fixed time at Mall Road", time: "03:00 PM" },


//                 { id: generateId(), name: "Dinner-Taste check", description: "TO + Teacher", time: "08:00 PM" },
//                 { id: generateId(), name: "Feedback", description: "Record issues", time: "08:00 PM" },

//                 { id: generateId(), name: "Night Check-Visit rooms", description: "Check wellbeing", time: "10:30 PM" },
//                 { id: generateId(), name: "Discipline", description: "Lights off", time: "10:30 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-04-01",
//             tasks: [
//                 { id: generateId(), name: "Breakfast check", description: "Standard food check", time: "07:30 AM" },
                
//                 { id: generateId(), name: "Vehicle check", description: "Snow suitability", time: "08:30 AM" },
//                 { id: generateId(), name: "Head count", description: "Before departure", time: "08:30 AM" },

//                 { id: generateId(), name: "Safety briefing", description: "Snow discipline. Strict: No unsupervised snow activity or student alone", time: "10:30 AM" },
//                 { id: generateId(), name: "Activity monitoring", description: "No risky activity without permission", time: "10:30 AM" },
//                 { id: generateId(), name: "Vendor control", description: "Only approved vendors", time: "10:30 AM" },

//                 { id: generateId(), name: "Time control", description: "Avoid delays", time: "Atal Tunnel" },
//                 { id: generateId(), name: "Head count", description: "Before departure", time: "Atal Tunnel" },

//                 { id: generateId(), name: "Return to Hotel", description: "Make sure return of everyone", time: "Atal Tunnel" },
                
//                 { id: generateId(), name: "DJ supervision", description: "No indiscipline", time: "Evening" },
//                 { id: generateId(), name: "Teacher presence", description: "Mandatory", time: "Evening" },

//                 { id: generateId(), name: "Dinner-Taste check", description: "TO + Teacher", time: "08:00 PM" },
//                 { id: generateId(), name: "Feedback", description: "Record issues", time: "08:00 PM" },

//                 { id: generateId(), name: "Night Check-Visit rooms", description: "Check wellbeing", time: "10:30 PM" },
//                 { id: generateId(), name: "Discipline", description: "Lights off", time: "10:30 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-04-02",
//             tasks: [

//                 { id: generateId(), name: "Breakfast check", description: "Standard food check", time: "07:30 AM" },
                
//                 { id: generateId(), name: "Take student feedback", description: "ensure student feedback", time: "07:30 AM" },

//                 { id: generateId(), name: "Safety briefing", description: "EnsuresRiver proximity rules", time: "09:00 AM" },
//                 { id: generateId(), name: "Group control", description: "No entering water", time: "09:00 AM" },
//                 { id: generateId(), name: "Photo coordination", description: "Controlled movement", time: "09:00 AM" },

//                 { id: generateId(), name: "Room inspection", description: "Damage check", time: "11:00 AM" },
//                 { id: generateId(), name: "Key collection", description: "Clearance", time: "11:00 AM" },

//                 { id: generateId(), name: "Lunch -Menu check", description: "Match plan", time: "01:30 PM" },
//                 { id: generateId(), name: "Teacher care", description: "Separate service", time: "01:30 PM" },


//                 { id: generateId(), name: "Head count", description: "Before departure", time: "02:00 PM" },
//                 { id: generateId(), name: "Luggage check", description: "Ensure all loaded", time: "02:00 PM" },

//                 { id: generateId(), name: "Time control", description: "Avoid delays", time: "Enroute" },
//                 { id: generateId(), name: "Student discipline", description: "Group movement", time: "Enroute" },

//                 { id: generateId(), name: "Food check", description: "Hygiene & quality", time: "Dinner" },
//                 { id: generateId(), name: "Teacher care", description: "Check satisfaction", time: "Dinner" },

//                 { id: generateId(), name: "QR sharing", description: "Share Google review QR link. Evidence: Screenshot", time: "Return Journey" },
//                 { id: generateId(), name: "Instruction", description: "Guide students how to review. Evidence: Video/photo", time: "Return Journey" },
//                 { id: generateId(), name: "Minimum target", description: "At least 60–70% students. Evidence: Count", time: "Return Journey" },
//                 { id: generateId(), name: "Review check", description: "Confirm posting. Evidence: Screenshot", time: "Return Journey" },

//                 { id: generateId(), name: "Share Insta ID", description: "@backpackers (your handle). Evidence: Screenshot", time: "Return Journey" },
//                 { id: generateId(), name: "Ask students", description: "Post story/reel tagging Backpackers. Evidence: Story screenshots", time: "Return Journey" },
//                 { id: generateId(), name: "Repost content", description: "Collect best stories. Evidence: Archive", time: "Return Journey" },

//                 { id: generateId(), name: "Collect numbers", description: "Take all teacher contacts. Evidence: List", time: "Return Journey" },
//                 { id: generateId(), name: "Permission", description: "Inform about Backpackers community. Evidence: Verbal consent", time: "Return Journey" },
//                 { id: generateId(), name: "Save properly", description: "Add name + school. Evidence: Sheet entry", time: "Return Journey" },

//                 { id: generateId(), name: "Explain benefit", description: "Future tours / priority offers", time: "Return Journey" },
//                 { id: generateId(), name: "Create connect", description: "Personal relationship building", time: "Return Journey" },
//                 { id: generateId(), name: "Follow-up note", description: "Add to WhatsApp / CRM later", time: "Return Journey" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "2026-04-03",
//             tasks: [
//                 { id: generateId(), name: "Head count", description: "Final count", time: "05:00-06:00 AM" },
//                 { id: generateId(), name: "Luggage check", description: "Nothing left", time: "05:00-06:00 AM" },
//                 { id: generateId(), name: "Student handover", description: "Ensure safe dispersal", time: "05:00-06:00 AM" },

//                 { id: generateId(), name: "Group photo", description: "End of tour", time: "Final Task" },
//                 { id: generateId(), name: "Teacher feedback", description: "Record", time: "Final Task" }
//             ]
//         }
//     ]
// }

// for camp O Royale 
//   jaipur: {
//     tripName: "Camp O Royale",
//     tripDate: "Day 1",
//     tripDiscussion: "3-Day Student Group – Operational Control Checklist for Camp O Royale.",
//     groups: [
//         {
//             groupId: generateId(),
//             date: "Day 1 – Arrival + Adventure + Experience",
//             tasks: [
//                 // 12:30–01:30 PM – ARRIVAL & WELCOME
//                 { id: generateId(), name: "Arrival coordination", description: "Ensure team ready at gate. Evidence: Photo", time: "12:30–01:30 PM" },
//                 { id: generateId(), name: "Welcome drink", description: "Serve immediately on arrival. Evidence: Photo", time: "12:30–01:30 PM" },
//                 { id: generateId(), name: "Luggage handling", description: "Assist unloading. Evidence: Photo", time: "12:30–01:30 PM" },
//                 { id: generateId(), name: "Head count", description: "Confirm students + teachers. Evidence: Record", time: "12:30–01:30 PM" },

//                 // 01:30 PM – BRIEFING
//                 { id: generateId(), name: "Forest safety briefing", description: "No wandering alone", time: "01:30 PM" },
//                 { id: generateId(), name: "Property rules", description: "No room hopping", time: "01:30 PM" },
//                 { id: generateId(), name: "Timing discipline", description: "Strict adherence", time: "01:30 PM" },
//                 { id: generateId(), name: "Emergency protocol", description: "Share contact person", time: "01:30 PM" },
//                 { id: generateId(), name: "Adventure safety", description: "Pre-warning", time: "01:30 PM" },

//                 // 02:00 PM – ROOM ALLOCATION
//                 { id: generateId(), name: "Room distribution", description: "Smooth & quick. Evidence: Rooming list", time: "02:00 PM" },
//                 { id: generateId(), name: "Room inspection briefing", description: "Damage responsibility. Evidence: Photo/video", time: "02:00 PM" },
//                 { id: generateId(), name: "Key control", description: "Proper allocation. Evidence: Record", time: "02:00 PM" },

//                 // 02:30 PM – LUNCH
//                 { id: generateId(), name: "Food readiness check", description: "Before service", time: "02:30 PM" },
//                 { id: generateId(), name: "Taste check", description: "Manager + teacher", time: "02:30 PM" },
//                 { id: generateId(), name: "Teacher service", description: "Separate attention", time: "02:30 PM" },
//                 { id: generateId(), name: "Feedback collection", description: "After meal", time: "02:30 PM" },

//                 // 03:00 PM – ADVENTURE ACTIVITIES (Pre-Activity)
//                 { id: generateId(), name: "Safety briefing", description: "Mandatory", time: "03:00 PM" },
//                 { id: generateId(), name: "Instructor introduction", description: "Build trust", time: "03:00 PM" },
//                 { id: generateId(), name: "Group division", description: "2 groups", time: "03:00 PM" },
//                 { id: generateId(), name: "Equipment check", description: "Before start", time: "03:00 PM" },

//                 // 03:00 PM – ADVENTURE ACTIVITIES (Execution)
//                 { id: generateId(), name: "Group rotation", description: "Smooth transition", time: "03:00 PM" },
//                 { id: generateId(), name: "Instructor supervision", description: "Continuous", time: "03:00 PM" },
//                 { id: generateId(), name: "Injury check", description: "Immediate response", time: "03:00 PM" },
//                 { id: generateId(), name: "Hydration check", description: "Regular", time: "03:00 PM" },

//                 // 06:00 PM – EVENING TEA & SNACKS
//                 { id: generateId(), name: "Snack readiness", description: "Confirm", time: "06:00 PM" },
//                 { id: generateId(), name: "Teacher service", description: "Priority", time: "06:00 PM" },
//                 { id: generateId(), name: "Student control", description: "No crowding", time: "06:00 PM" },

//                 // 07:00 PM – JUNGLE TREK (High Risk)
//                 { id: generateId(), name: "Safety briefing", description: "Torch + group discipline", time: "07:00 PM" },
//                 { id: generateId(), name: "Guide allocation", description: "Mandatory", time: "07:00 PM" },
//                 { id: generateId(), name: "Head count", description: "Before & after", time: "07:00 PM" },
//                 { id: generateId(), name: "No isolation rule", description: "Strict", time: "07:00 PM" },

//                 // 08:00 PM – BONFIRE + MOVIE / STAR GAZING
//                 { id: generateId(), name: "Bonfire setup", description: "Safe distance", time: "08:00 PM" },
//                 { id: generateId(), name: "Seating arrangement", description: "Organized", time: "08:00 PM" },
//                 { id: generateId(), name: "Engagement", description: "Movie / storytelling", time: "08:00 PM" },
//                 { id: generateId(), name: "Discipline control", description: "No chaos", time: "08:00 PM" },

//                 // 10:00 PM – DINNER
//                 { id: generateId(), name: "Food check", description: "Taste + quality", time: "10:00 PM" },
//                 { id: generateId(), name: "Teacher service", description: "Priority", time: "10:00 PM" },
//                 { id: generateId(), name: "Feedback", description: "Record", time: "10:00 PM" },

//                 // 11:00 PM – ROOM ROUND
//                 { id: generateId(), name: "Visit each room", description: "Check comfort", time: "11:00 PM" },
//                 { id: generateId(), name: "Noise control", description: "Enforce discipline", time: "11:00 PM" },
//                 { id: generateId(), name: "Medical check", description: "Any issue", time: "11:00 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "Day 2 – Trek + Team Building + Treasure Hunt",
//             tasks: [
//                 // 06:00 AM – TAPOVAN TREK (High Risk)
//                 { id: generateId(), name: "Wake-up call", description: "Ensure readiness", time: "06:00 AM" },
//                 { id: generateId(), name: "Safety briefing", description: "Before start", time: "06:00 AM" },
//                 { id: generateId(), name: "Guide presence", description: "Mandatory", time: "06:00 AM" },
//                 { id: generateId(), name: "Head count", description: "Start & end", time: "06:00 AM" },
//                 { id: generateId(), name: "Hydration", description: "Carry water", time: "06:00 AM" },

//                 // 08:30 AM – RETURN + RECOVERY
//                 { id: generateId(), name: "Rest coordination", description: "Ensure recovery", time: "08:30 AM" },
//                 { id: generateId(), name: "Medical check", description: "Any fatigue/injury", time: "08:30 AM" },

//                 // 10:00 AM – BREAKFAST
//                 { id: generateId(), name: "Breakfast check", description: "Standard food + teacher care protocol", time: "10:00 AM" },

//                 // 11:00 AM – REST PERIOD
//                 { id: generateId(), name: "Room discipline", description: "Ensure rest", time: "11:00 AM" },
//                 { id: generateId(), name: "No outdoor roaming", description: "Strict", time: "11:00 AM" },

//                 // 01:00 PM – LUNCH
//                 { id: generateId(), name: "Lunch check", description: "Standard protocol", time: "01:00 PM" },

//                 // 03:00 PM – TREASURE HUNT (Pre-Activity)
//                 { id: generateId(), name: "Story briefing", description: "Make it engaging", time: "03:00 PM" },
//                 { id: generateId(), name: "Group division", description: "Teams", time: "03:00 PM" },
//                 { id: generateId(), name: "Rules explanation", description: "Clearly defined", time: "03:00 PM" },

//                 // 03:00 PM – TREASURE HUNT (Execution)
//                 { id: generateId(), name: "Checkpoint setup", description: "Clear markers", time: "03:00 PM" },
//                 { id: generateId(), name: "Staff allocation", description: "At each point", time: "03:00 PM" },
//                 { id: generateId(), name: "Time control", description: "Strict", time: "03:00 PM" },
//                 { id: generateId(), name: "Fair play monitoring", description: "Ensure", time: "03:00 PM" },

//                 // 05:30 PM – SNACKS
//                 { id: generateId(), name: "Snacks service", description: "Serve on time", time: "05:30 PM" },

//                 // 07:00 PM – BONFIRE + MUSIC
//                 { id: generateId(), name: "Music control", description: "Volume + timing", time: "07:00 PM" },
//                 { id: generateId(), name: "Student engagement", description: "Dance / interaction", time: "07:00 PM" },
//                 { id: generateId(), name: "Teacher comfort", description: "Priority", time: "07:00 PM" },

//                 // 09:00 PM – DINNER
//                 { id: generateId(), name: "Dinner check", description: "Standard protocol", time: "09:00 PM" },

//                 // 10:30 PM – ROOM ROUND
//                 { id: generateId(), name: "Room round", description: "Standard check", time: "10:30 PM" }
//             ]
//         },
//         {
//             groupId: generateId(),
//             date: "Day 3 – Checkout & Departure",
//             tasks: [
//                 // 08:00 AM – BREAKFAST
//                 { id: generateId(), name: "Breakfast check", description: "Standard protocol", time: "08:00 AM" },

//                 // 09:00–11:00 AM – PACKING & CHECKOUT PREP
//                 { id: generateId(), name: "Luggage packing", description: "Ensure readiness", time: "09:00–11:00 AM" },
//                 { id: generateId(), name: "Room inspection", description: "Damage check", time: "09:00–11:00 AM" },
//                 { id: generateId(), name: "Key collection", description: "Proper", time: "09:00–11:00 AM" },

//                 // 11:00 AM – LIGHT REFRESHMENT
//                 { id: generateId(), name: "Light refreshment", description: "Serve on time", time: "11:00 AM" },

//                 // 11:30 AM – BRAND TASKS: Google Review
//                 { id: generateId(), name: "QR sharing", description: "Show code. Evidence: Screenshot", time: "11:30 AM" },
//                 { id: generateId(), name: "Instruction", description: "Guide students how to review. Evidence: Video/photo", time: "11:30 AM" },
//                 { id: generateId(), name: "Target", description: "Minimum 60% students. Evidence: Count", time: "11:30 AM" },

//                 // 11:30 AM – BRAND TASKS: Instagram Tagging
//                 { id: generateId(), name: "Share handle", description: "Share Camp O Royale Instagram handle. Evidence: Screenshot", time: "11:30 AM" },
//                 { id: generateId(), name: "Story posting", description: "Encourage students to post & tag. Evidence: Story screenshots", time: "11:30 AM" },
//                 { id: generateId(), name: "Repost collection", description: "Save best content. Evidence: Archive", time: "11:30 AM" },

//                 // 11:30 AM – BRAND TASKS: Teacher Network
//                 { id: generateId(), name: "Collect contacts", description: "Name + school. Evidence: List", time: "11:30 AM" },
//                 { id: generateId(), name: "Permission", description: "For community. Evidence: Verbal consent", time: "11:30 AM" },
//                 { id: generateId(), name: "Relationship building", description: "Personal interaction", time: "11:30 AM" },

//                 // 12:00 PM – DEPARTURE
//                 { id: generateId(), name: "Final head count", description: "Mandatory", time: "12:00 PM" },
//                 { id: generateId(), name: "Luggage check", description: "Nothing left", time: "12:00 PM" },
//                 { id: generateId(), name: "Farewell coordination", description: "Smooth exit", time: "12:00 PM" }
//             ]
//         }
//     ]
// }