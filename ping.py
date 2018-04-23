import re
import subprocess
import sys
import time
import os
import platform
from datetime import datetime
import ConfigParser
import time
from email import utils

TRIES = 10000
Config = ConfigParser.ConfigParser()
Config.read("CONFIGURATION")

def ping(host):
    os = platform.system()
    if os == "Linux":
        cmd = "ping -c 1 %s" % host
    elif os == "Windows":
        cmd = "ping -n 1 %s" % host
    output = call_proc(cmd)
    ecrire_fichier(extract_latency(output), datetime.now())

def call_proc(cmd):
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    output = b''.join(process.stdout)
    return output

def extract_latency(output):
    if platform.system() == "Linux":
        latency = re.search(r'time=(.*?) ms', output)
    elif platform.system() == "Windows":
        latency = re.search(r'Minimum = (.*?)ms', output)
    if latency:
	return latency.group(1)
    else:
	return 999

def ecrire_fichier(latence, timing):
    fichier = open(Config.get('Ping', 'Outfile'), 'a')
    nowtuple = timing.timetuple()
    nowtimestamp = time.mktime(nowtuple)
    fichier.write(utils.formatdate(nowtimestamp)+'||')
    fichier.write(str(latence)+'||\n')
    fichier.close()

if __name__ == '__main__':
    for i in range(int(Config.get('Ping', 'Tries'))):
        ping(Config.get('Ping', 'Destination'))
        time.sleep(1)
