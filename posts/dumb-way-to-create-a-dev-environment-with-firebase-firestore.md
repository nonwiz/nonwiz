---
title: Dumb way to clone firestore collections.
description: This tutorial mainly for lazyass people who doesn't want to spend
  much time reading firebase documentation. This show way to export firestore
  project to a new firebase project.
date: 2023-08-14T02:18:23.582Z
tags:
  - firebase
  - firestore
  - backup
  - testing
draft: false
---
## Background

I had one Firebase project using Firestore. But then I wanted to clone my current project so I can use it as the testing environment and futher development.

## Prerequisite

You have to enable the billing account and set both new/old Firebase project as "Blaze plan". (It won't charge you much unless, you have very huge collections or documents).

## Steps

1. Open the old Firebase project you want to clone.
2. Click on Firestore Database (on the left side).
3. At the top right corner of the table, select "More in Google Cloud"
4. Click on Import/Export
5. Click on export to any bucket like staging.*
6. After done, on the top left corner, you can see Google Cloud console
7. Click on the navigation menu > Cloud Storage > Buckets
8. Select on the bucket that you just export to.
9. Click on the three dots at the action menu. "Transfer data out"
10. Click on destination, select the bucket that belong to the Firebase-testing environment you want to clone to.
11. Click "Create" and wait for a while.
12. After done you can open the new Firebase project, and click on Firestore Database
13. Click on "More in Google Cloud" > "Import/Export"
14. Import the destination bucket and files that you transferred out with.
15. Once it's done, you can see the success message.

\*\* above is the guide for cloning Firestore database.