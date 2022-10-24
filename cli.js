#!/usr/bin/env node
import minimist from 'minimist';
import moment from 'moment-timezone';
import fetch from 'node-fetch';

const args = minimist(process.argv.slice(2));
let timezone = moment.tz.guess();
var day = args.d ? args.d : 1; 

if(args.h){
    console.log(` 
        Usage: galosh.js [options] -[n|s] LATITUDE -[e|w] LONGITUDE -z TIME_ZONE
            -h            Show this help message and exit.
            -n, -s        Latitude: N positive; S negative.
            -e, -w        Longitude: E positive; W negative.
            -z            Time zone: uses tz.guess() from moment-timezone by default.
            -d 0-6        Day to retrieve weather: 0 is today; defaults to 1.
            -j            Echo pretty JSON from open-meteo API and exit.
    `)
}
    

let latitude = '39.92'
if(args.n){
    latitude = args.n
}
if(args.s){
    latitude = args.s
}

let longitude = '-79'
if(args.e){
    longitude = args.e
}
if(args.w){
    longitude = args.w
}

if(args.t){
    timezone = args.t
}

// Make a request
const response = await fetch('https://api.open-meteo.com/v1/forecast?latitude=' + latitude + '&longitude=' + longitude + '&hourly=temperature_2m&current_weather=true&timezone=' + timezone);

const data = await response.json();

const days = args.d 

if (days == 0) {
  console.log("today.")
} else if (day >= 2 && days <= 6) {
  console.log("in " + days + " days.")
} else {
  console.log("tomorrow.")
}
