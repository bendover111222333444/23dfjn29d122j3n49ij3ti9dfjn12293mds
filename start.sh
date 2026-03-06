#!/bin/bash
./wireproxy -c wgcf-profile.conf &
sleep 3
npm start
