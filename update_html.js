const fs = require("fs");

const filePath = "emergency.html";
let html = fs.readFileSync(filePath, "utf8");

// Remove duplicate states
const statesToRemove = [
  "Andhra Pradesh",
  "Telangana",
  "Gujarat"
];

statesToRemove.forEach(state => {
  const regex = new RegExp(`,?\\s*\\{[^}]*"state"\\s*:\\s*"${state}"[\\s\\S]*?\\}\\s*,?`, "g");
  html = html.replace(regex, "");
});

// States to append
const newStates = `
,
{
  "state": "Tripura",
  "website": "https://tripura.gov.in",
  "major_cities": ["Agartala"],
  "emergency_numbers": {
    "police": "100",
    "ambulance": "108",
    "fire": "101",
    "unified": "112",
    "state_disaster_control": "1070"
  },
  "districts": [
    {
      "district": "West Tripura",
      "major_city": "Agartala",
      "control_room": {
        "disaster_control": "1077",
        "police": "100",
        "ambulance": "108",
        "fire": "101",
        "women_helpline": "1091",
        "cyber_crime": "1930"
      },
      "website": "https://westtripura.nic.in"
    }
  ]
},
{
  "state": "Meghalaya",
  "website": "https://meghalaya.gov.in",
  "major_cities": ["Shillong"],
  "emergency_numbers": {
    "police": "100",
    "ambulance": "108",
    "fire": "101",
    "unified": "112",
    "state_disaster_control": "1070"
  },
  "districts": [
    {
      "district": "East Khasi Hills",
      "major_city": "Shillong",
      "control_room": {
        "disaster_control": "1077",
        "police": "100",
        "ambulance": "108",
        "fire": "101",
        "women_helpline": "1091",
        "cyber_crime": "1930"
      },
      "website": "https://eastkhasihills.nic.in"
    }
  ]
},
{
  "state": "Manipur",
  "website": "https://manipur.gov.in",
  "major_cities": ["Imphal"],
  "emergency_numbers": {
    "police": "100",
    "ambulance": "108",
    "fire": "101",
    "unified": "112",
    "state_disaster_control": "1070"
  },
  "districts": [
    {
      "district": "Imphal West",
      "major_city": "Imphal",
      "control_room": {
        "disaster_control": "1077",
        "police": "100",
        "ambulance": "108",
        "fire": "101",
        "women_helpline": "1091",
        "cyber_crime": "1930"
      },
      "website": "https://imphalwest.nic.in"
    }
  ]
},
{
  "state": "Sikkim",
  "website": "https://sikkim.gov.in",
  "major_cities": ["Gangtok"],
  "emergency_numbers": {
    "police": "100",
    "ambulance": "108",
    "fire": "101",
    "unified": "112",
    "state_disaster_control": "1070"
  },
  "districts": [
    {
      "district": "East Sikkim",
      "major_city": "Gangtok",
      "control_room": {
        "disaster_control": "1077",
        "police": "100",
        "ambulance": "108",
        "fire": "101",
        "women_helpline": "1091",
        "cyber_crime": "1930"
      },
      "website": "https://eastsikkim.nic.in"
    }
  ]
},
{
  "state": "Goa",
  "website": "https://goa.gov.in",
  "major_cities": ["Panaji","Margao"],
  "emergency_numbers": {
    "police": "100",
    "ambulance": "108",
    "fire": "101",
    "unified": "112",
    "state_disaster_control": "1070"
  },
  "districts": [
    {
      "district": "North Goa",
      "major_city": "Panaji",
      "control_room": {
        "disaster_control": "1077",
        "police": "100",
        "ambulance": "108",
        "fire": "101",
        "women_helpline": "1091",
        "cyber_crime": "1930"
      },
      "website": "https://northgoa.nic.in"
    }
  ]
},
{
  "state": "Punjab",
  "website": "https://punjab.gov.in",
  "major_cities": ["Chandigarh","Ludhiana","Amritsar","Jalandhar"],
  "emergency_numbers": {
    "police": "100",
    "ambulance": "108",
    "fire": "101",
    "unified": "112",
    "state_disaster_control": "1070"
  },
  "districts": [
    {
      "district": "Amritsar",
      "major_city": "Amritsar",
      "control_room": {
        "disaster_control": "1077",
        "police": "100",
        "ambulance": "108",
        "fire": "101",
        "women_helpline": "1091",
        "cyber_crime": "1930"
      },
      "website": "https://amritsar.nic.in"
    }
  ]
}
`;

const insertPosition = html.lastIndexOf("]");
html = html.slice(0, insertPosition) + newStates + html.slice(insertPosition);

fs.writeFileSync(filePath, html);

console.log("Duplicates removed and new states appended successfully.");