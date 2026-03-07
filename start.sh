#!/bin/bash
pip install wisp-python --break-system-packages
./wireproxy -c wgcf-profile.conf &
sleep 8
python3 -m wisp.server --host 127.0.0.1 --port 5001 --proxy socks5://127.0.0.1:40000 &
sleep 2
node src/index.js
