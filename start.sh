#!/bin/bash
pip install wisp-python --break-system-packages
python3 -m wisp.server --host 127.0.0.1 --port 5001 --proxy socks5://tlaqdnkf-rotate:7gehk0l6v9li@p.webshare.io:80 &
sleep 2
npm start
