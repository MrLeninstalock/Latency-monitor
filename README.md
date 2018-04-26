# Latency monitor

## Why ?

I was having lag problem in my parent's house. It was really sudden and won't last long. So I had to have a tool monitoring this, and the visualisation was a must, to eventually detect a pattern.

Moreover I was starting an internship in which I have to use flask and maybe Chart.js, so it was like an introduction to my internship.

## How to install

`pip install -r requirements`

`python ping.py` will start pinging google

`python main.py` will launch the web interface

## How it works

Ping.py juste ping google.fr continuously and print the result in resultat_ping.
When you load the localhost:5000/ping page, the server will just load files's value in two divs, so our Chart.js will be able to read it.

You can zoom on the graph, but it can be very laggy due to the massive amout of point

## TO DO

- Get rif of the data_div and labels_div.
- Package it
- Make it fully Windows compatible

