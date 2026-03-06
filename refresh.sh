#!/usr/bin/env bash

while true
do
    echo "Restarting VPN..."
    pkill wireproxy
    ./wireproxy -c config.conf &
    sleep 7200
done
