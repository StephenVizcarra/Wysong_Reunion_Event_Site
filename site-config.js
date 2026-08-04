// =====================================================
//  WYSONG FAMILY REUNION — SITE CONFIGURATION
// =====================================================
//  Edit the values below to update the website.
//  After saving changes, commit and push to GitHub.
//  The site will automatically update within a minute.
//
//  TIPS FOR EDITING:
//  - Text values go inside "quotes"
//  - Numbers do NOT need quotes
//  - true / false controls whether something shows on the site
//  - Don't delete commas at the end of lines
//  - Use \n inside quotes for a line break (addresses, etc.)
// =====================================================

const SITE_CONFIG = {

  // ----- GENERAL INFO -----

  year: 2027,
  reunionName: "Wysong Family Reunion",
  tagline: "Lancaster, Pennsylvania",

  // Update these when dates are confirmed
  dates: "Dates TBD — Last Week of July 2027",
  datesShort: "July 2027",


  // ----- REGISTRATION SETTINGS -----

  // Set to false to hide the registration form (e.g., after the deadline passes)
  registrationOpen: true,

  // Deadline for mailing registration and check payment
  registrationDeadline: "June 15, 2027",

  // Who checks should be made payable to
  checkPayableTo: "Bern Harris",

  // Mailing address for checks and paper registration forms
  // Use \n for line breaks
  mailingAddress: "[ADDRESS TBD]\nLancaster, PA 17601",


  // ----- ANCESTOR / LINEAGE OPTIONS -----
  // These appear in the "Descendant of" dropdown on the registration form.
  // Add or remove names as needed.
  descendantOptions: [
    "Lewis",
    "Valentine",
    "Joseph",
    "Feidt",
    "Jacob",
    "Don't know"
  ],


  // ----- EVENTS -----
  // Each event appears in the registration form so attendees can sign up.
  // Set "active" to true when the event is confirmed and pricing is set.
  // Set "active" to false to hide an event from the form.
  // You can have up to 3 events.
  events: [
    {
      name: "Family Meeting & Banquet",
      description: "Annual family meeting followed by banquet dinner",
      adultRate: 25.00,    // price per adult
      childRate: 0,        // price per child, if applicable
      hasChildRate: false,  // set to true if children have a separate rate
      active: true          // set to true when details are finalized
    },
    {
      name: "Dinner & Show",
      description: "",
      adultRate: 0,
      childRate: 0,
      hasChildRate: true,
      active: false
    },
    {
      name: "Amish Country Group Tour",
      description: "Family group tour around Amish Country and Museum",
      adultRate: 100,
      childRate: 75,
      hasChildRate: true,
      active: true
    }
  ],


  // ----- SCHEDULE -----
  // Each day has a label and a list of items (time + title).
  // Add or remove days and items as needed.
  schedule: [
    {
      day: "Day 1",
      items: [
        { time: "TBD", title: "Arrival & Check-in" },
        { time: "TBD", title: "Welcome & Introductions" }
      ]
    },
    {
      day: "Day 2",
      items: [
        { time: "TBD", title: "Family Meeting & Banquet" }
      ]
    },
    {
      day: "Day 3",
      items: [
        { time: "TBD", title: "Activities TBD" },
        { time: "TBD", title: "Farewell" }
      ]
    }
  ],


  // ----- LODGING -----
  // Hotels or accommodations to recommend to attendees.
  // Add more entries by copying the block between { and },
  lodging: [
    {
      name: "[Hotel Name TBD]",
      address: "Lancaster, PA",
      phone: "",
      website: "",
      notes: "Group rate available — mention Wysong Family Reunion when booking"
    }
  ],


  // ----- GETTING THERE -----

  venueAddress: "Lancaster, PA",

  // To get a Google Maps embed URL:
  //   1. Go to maps.google.com and search for the venue
  //   2. Click Share > Embed a map > copy the URL inside src="..."
  //   3. Paste it below between the quotes
  // Leave empty ("") to hide the map section.
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d97720.3!2d-76.3730!3d40.0386!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6248a29e3c4e1%3A0x4582e29535b1e577!2sLancaster%2C%20PA!5e0!3m2!1sen!2sus",

  // Travel tips, driving directions, nearby airports, etc.
  directionsNote: "[PLACEHOLDER — REPLACE WITH YOUR COPY] Add driving directions, nearby airports, or travel tips here.",


  // ----- CONTACTS -----
  // People attendees can reach out to with questions.
  contacts: [
    {
      name: "Bern Harris",
      role: "2027 Reunion Host",
      phone: "",
      email: ""
    }
  ],


  // ----- ABOUT SECTION -----
  // This appears in the About section on the site.
  aboutText: "[PLACEHOLDER — REPLACE WITH YOUR COPY] Write about the Wysong family history, the reunion tradition, and what makes this gathering special."

};
