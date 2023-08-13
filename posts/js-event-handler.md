---
title: JS event handler
description: Summarized from JS 25th day of Wes Bos regarding event handler.
date: 2023-08-13T14:23:39.404Z
tags:
  - js
  - event-handler
  - snippet
---
Normally, when the element are within another elements, any event will trigger from the inner most until outer part. Depend on circumstance or use, you can change how it works by:
`element.addEventListener('eventName', functionName, {capture: true})`

This will reverse the order of the trigger instead, instead of the inner most when you click on the center, it begins from the outer most instead. By default without adding the {capture: true}, the capture's default value is false
`event.stopPropagation();`

This helps the function to run just on the element that is trigger, the nit will not run the outer layer or nest.
`element.addEventListener('eventName', functionName, {once: true})`

Once property within this object argument here make the event listener to remove its binding. So it will run just once