---
title: JS array tips
description: JS's example of sorting and reducing
date: 2023-08-13T14:29:48.806Z
tags:
  - js
  - snippet
  - array
---
**Some of the useful array methods**:

```javascript

const students = [{
  "first_name": "Gerhard",
  "last_name": "Gent",
  "email": "ggent0@vimeo.com",
  "gender": "Agender",
  "born": 1973,
  "dies": 2039
}, {
  "first_name": "Halsey",
  "last_name": "Doumic",
  "email": "hdoumic1@hc360.com",
  "gender": "Male",
  "born": 1984,
  "dies": 2087
}, {
  "first_name": "Shelly",
  "last_name": "Dast",
  "email": "sdast2@tumblr.com",
  "gender": "Bigender",
  "born": 2011,
  "dies": 2028
}, {
  "first_name": "Sansone",
  "last_name": "Youd",
  "email": "syoud3@businessweek.com",
  "gender": "Genderqueer",
  "born": 1991,
  "dies": 2054
}, {
  "first_name": "Rickie",
  "last_name": "Giuron",
  "email": "rgiuron4@flickr.com",
  "gender": "Female",
  "born": 1989,
  "dies": 2097
}, {
  "first_name": "Wandie",
  "last_name": "Chipps",
  "email": "wchipps5@theglobeandmail.com",
  "gender": "Agender",
  "born": 1953,
  "dies": 2070
}, {
  "first_name": "Link",
  "last_name": "Pionter",
  "email": "lpionter6@1und1.de",
  "gender": "Agender",
  "born": 1981,
  "dies": 2046
}, {
  "first_name": "Vidovik",
  "last_name": "Klausewitz",
  "email": "vklausewitz7@prlog.org",
  "gender": "Non-binary",
  "born": 1990,
  "dies": 2083
}, {
  "first_name": "Abe",
  "last_name": "Sudell",
  "email": "asudell8@slideshare.net",
  "gender": "Genderfluid",
  "born": 1967,
  "dies": 2076
}, {
  "first_name": "Kakalina",
  "last_name": "Joney",
  "email": "kjoney9@tripadvisor.com",
  "gender": "Polygender",
  "born": 1991,
  "dies": 2026
}]

    
```

**Sorting with console.table**

```javascript
console.log("Sort the students with birth year from recently to oldest");
console.table(students.sort((curr, next) => {return next.born > curr.born ? 1: -1}))
```

**Count students with reduce**

```javascript

console.log("Count how many students that born before 1980")
const countTotal = students.reduce((total, student) => {return total += student.born < 1980 ? 1 : 0}, 0)
console.log("total", countTotal);
```

```javascript

console.log("Count how many female and male");
const countGender = students.reduce((obj, student) => {
  if (!obj[student.gender]) {
    obj[student.gender] = 0;
  }
  console.log(student.gender, obj);
  obj[student.gender]++;
  return obj;
}, {})
console.table(countGender);
```