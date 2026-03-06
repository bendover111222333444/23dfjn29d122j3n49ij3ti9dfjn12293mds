bash#!/bin/bash
./wireproxy -c wgcf-profile.conf &
sleep 3
export ALL_PROXY="socks5://127.0.0.1:40000"
export PROXY="socks5://127.0.0.1:40000"
npm start
