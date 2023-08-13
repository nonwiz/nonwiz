---
title: JS application
description: Some of the cool JS implementation.
date: 2023-08-13T14:26:43.455Z
tags:
  - js
  - snippet
  - event-handler
---
## **Keyboard event listener**

**JS Implementation of secret code**

Below is code sample for window event handler to listen to "key typed". In this case, when user type dark, it would replace the css var.

```javascript
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



## Text to speech

First, there's should be an text ("textarea/input") and voices("select")

```javascript

  const text = document.querySelector('#text');
  const select = document.querySelector('#voices');
  const msg = new SpeechSynthesisUtterance();
  msg.text = text.value;

  function play() {
    msg.text = text.value;
    speechSynthesis.speak(msg);
  }

  function stop() {
    speechSynthesis.cancel();
  }

  function addOptions() {
    const voiceList = speechSynthesis.getVoices()
      .filter(voice => voice.lang.includes('en'))
      .map(voice => `<option value="${voice.name}">${voice.name}</option>`)
      .join('');
    select.innerHTML = voiceList;
  }

  function setVoice() {
    const selection = speechSynthesis.getVoices()
      .find(voice => voice.name === `${this.value}`);
    msg.voice = selection;
    console.log(msg.voice, selection);
  }

  document.addEventListener('DOMContentLoaded', addOptions)
  select.addEventListener('change', setVoice);


```

## Speech Recognition

```javascript

        window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 
        const recognition = new SpeechRecognition();
        recognition.interimResults = true;
        const text = document.querySelector('#text');
        let p = document.createElement('p');
        text.appendChild(p);

        recognition.addEventListener('result', e => {
          const transcript = [...e.results]
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');
          console.log(e.results, e.results[0]);
          p.textContent = transcript;
          if (e.results[0].isFinal) {
            p = document.createElement('p');
            text.appendChild(p);
          }
          if (transcript.includes('enable dark mode')) {
            document.documentElement.style.setProperty('--black', 'white');
            document.documentElement.style.setProperty('--white', '#342E37');
          }
          if (transcript.includes('reset')) {
            document.documentElement.style.setProperty('--black', '#342E37');
            document.documentElement.style.setProperty('--white', 'white');
          }
        })

        recognition.addEventListener('end', recognition.start);
        recognition.start();

    
```



## Unreal webcam

```javascript
const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo() {
  navigator.mediaDevices.getUserMedia({video: true, audio: false})
    .then(localMediaStream => {
      console.log(localMediaStream);
      video.srcObject = localMediaStream;
      video.play();
    })
    .catch(error => {
      console.log(error);
    })
};

function redEffect(pixels) {
  console.log(pixels, "red effect", pixels.data);
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] += 200;
    pixels.data[i + 1] -= 50;
    pixels.data[i + 2] *= 0.5;
  }
  return pixels;
}
function greenEffect(pixels) {
  console.log(pixels, "red effect", pixels.data);
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] -= 50;
    pixels.data[i + 1] += 150;
    pixels.data[i + 2] *= 0.8;
  }
  return pixels;
}

function randomEffect(pixels) {
  console.log(pixels, "red effect", pixels.data);
  for (let i = 0; i < pixels.data.length; i+=4) {
    pixels.data[i + 0] -= Math.random() * Math.random();
    pixels.data[i + 1] += Math.random() * Math.random();
    pixels.data[i + 2] *= Math.random() * Math.random();
  }
  return pixels;
}


function paintToCanvas() {
  const [width, height] = [video.videoWidth, video.videoHeight];
  [canvas.width, canvas.height] = [width, height];
  [video.width, video.height] = ["300", "300"]
  console.log("paint");

  return setInterval(() => {
    ctx.drawImage(video, 0, 0, width, height);
    let pixels = ctx.getImageData(0, 0, width, height);
    let filter = document.querySelector("#filter");
    if (filter.value == "Red")
      pixels = redEffect(pixels);
    else if (filter.value == 'Green')
      pixels = greenEffect(pixels);
    else
      pixels = randomEffect(pixels);
    ctx.putImageData(pixels, 0, 0);
  }, 500);

}

function takePhoto() {
  snap.currentTime = 0;
  snap.play();

  const data = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = data;
  link.setAttribute('download', '001');
  link.innerHTML = `<img src="${data}" alt="handsomeboi" class="thumb" />`;
  strip.insertBefore(link, strip.firstChild);

}

getVideo();

video.addEventListener('canplay', paintToCanvas)


```