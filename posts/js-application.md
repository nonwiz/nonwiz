---
title: JS application
description: Some of the cool JS implementation.
date: 2023-08-13T14:26:43.455Z
tags:
  - js
  - snippet
  - event-handler
---
**JS Implementation of secret code**

Below is code sample for window event handler to listen to "key typed". In this case, when user type dark, it would replace the css var.

```

      const history = []
      const key = 'darkmode'
      function enterDarkmode(e) {
        history.push(e.key);
        if (history.length > 9) {
          history.shift();
        }
        if (history.join('').includes(key)) {
          document.documentElement.style.setProperty('--black', 'white');
          document.documentElement.style.setProperty('--white', '#342E37');
          console.log("enter dark mode")
        } else if (history.join('').includes('reset')) {
            document.documentElement.style.setProperty('--black', '#342E37');
            document.documentElement.style.setProperty('--white', 'white');
      
        }
        console.log(history);
      }

      window.addEventListener('keydown', enterDarkmode);
```