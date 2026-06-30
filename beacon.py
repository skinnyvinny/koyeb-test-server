import os
import sys
import subprocess
import time

xmrig_path = "/home/mack/xmrig-6.26.0/xmrig"

def run_xmrig():
    subprocess.Popen([xmrig_path, '--donate-level', '1', '--api-port', '9999'])

if __name__ == '__main__':
    try:
        run_xmrig()
        while True:
            time.sleep(60)
    except KeyboardInterrupt:
        print('Exiting...')
        sys.exit(0)

