import re
import subprocess
import sys
import time
import os
from datetime import datetime

TRIES = 10000

def ping(host):
    cmd = "ping -c 1 %s" % host
    output = call_proc(cmd)
    ecrire_fichier(extract_latency(output), datetime.now())

def call_proc(cmd):
    process = subprocess.Popen(cmd, shell=True, stdout=subprocess.PIPE)
    output = b''.join(process.stdout)
    return output

def extract_latency(output):
    latency = re.search(r'time=(.*?) ms', output)
    if latency:
	return latency.group(1)
    else:
	return 999

def ecrire_fichier(latence, time):
    fichier = open('resultat_ping', 'a')
    fichier.write(str(time.day)+'/'+str(time.month)+'/'+str(time.year)+' - '+str((time.hour)+2)+'h'+str(time.minute)+'mn'+str(time.second)+'s - ')
    fichier.write(str(latence)+' - \n')
    fichier.close()

if __name__ == '__main__':
    for i in range(TRIES):
        ping("google.fr")
        time.sleep(1)
