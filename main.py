#/usr/bin/env python
# -*- coding:utf-8 -*-

from flask import Flask
from flask import request
from flask import render_template
import argparse
import platform
import re
import subprocess
import sys
import time


app = Flask(__name__)

@app.route('/coucou')
def dire_coucou():
    return 'Coucou !'

@app.route('/ajax')
def return_ping():
    return str(10)

@app.route('/ping')
def effectuer_le_ping():
    #latence = ping("google.fr")
    labels = []
    values = []
    fichier = open('resultat_ping', 'r')
    data = fichier.read()
    fichier.close()
    tab = data.split('\n')
    for line in tab:
        if line is not '':
            donnee = line.split('||')
            values.append(donnee[1])
            labels.append(donnee[0])
    return render_template('ping.html', values=values, labels=labels)

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
