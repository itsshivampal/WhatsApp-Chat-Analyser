# WhatsApp Chat Analyser Project

This application is built on Node.JS using express framework and ejs as templat rendering

## Installing dependencies

```
npm install
```

## Running Code

```
npm run dev
```

## Code Architecture

### server.js

It is the main file, executed when we run the project.

### api.js

This file contains all our APIs

### views/index.ejs

This is our webview file rendered when we open url on browser

## Output

Active Users atleast for 4 days (from 9 days) - 33

```
[
  '+91 71 11053', '+91 16 91994', '+91 74 66087',
  '+91 19 60363', '+91 18 31033', '+91 59 91621',
  '+91 94 69277', '+91 65 58662', '+91 90 77352',
  '+91 89 56095', '+91 95 31948', '+91 46 64931',
  '+91 72 10787', '+91 00 38487', '+91 93 90991',
  '+91 41 40449', '+91 50 24920', '+91 76 88804',
  '+91 80 52800', '+91 02 44412', '+91 66 52336',
  '+91 57 88746', '+91 17 31870', '+91 75 78255',
  '+91 83 02148', '+91 23 73889', '+91 26 61274',
  '+91 57 52886', '+91 08 21318', '+91 18 00680',
  '+91 35 21720', '+91 59 59465', '+91 64 64951'
]
```

### Display Page

![alt text](https://raw.githubusercontent.com/itsshivampal/WhatsApp-Chat-Analyser/master/assets/display.png)

#### Number of Users joined and messaged on each day

```
{
  '3/30/21': { joined: 0, messaged: 20 },
  '3/31/21': { joined: 0, messaged: 14 },
  '4/1/21': { joined: 5, messaged: 18 },
  '4/2/21': { joined: 1, messaged: 5 },
  '4/3/21': { joined: 0, messaged: 13 },
  '4/4/21': { joined: 1, messaged: 1 },
  '4/5/21': { joined: 24, messaged: 2 },
  '4/6/21': { joined: 20, messaged: 36 },
  '4/7/21': { joined: 4, messaged: 29 }
}

```
