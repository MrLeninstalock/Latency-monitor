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
    # Maybe put the datatime.now() before the ping call ?
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
    # Filename is just the date, in order to get one log file a day
    filename = "logs/" + time.strftime("%d-%m-%Y")+'.log'
    if not os.path.exists(os.path.dirname(filename)):
        try :
            os.makedirs(os.path.dirname(filename))
        except OSError as exc:
            if exc.errno != errno.EEXIST:
                raise
    fichier = open(filename, 'a+')
    timestamp = str(timing.hour)+':'+str(timing.second)+':'+str(timing.microsecond/1000)
    fichier.write(timestamp+'||')
    """ nowtuple = timing.timetuple()
    nowtimestamp = time.mktime(nowtuple)
    fichier.write(utils.formatdate(nowtimestamp)+'||') """
    fichier.write(str(latence)+'||\n')
    fichier.close()

if __name__ == '__main__':
    while True:
        ping(Config.get('Ping', 'Destination'))
        time.sleep(int(Config.get('Ping', 'Interval'))) #Interval is in second
