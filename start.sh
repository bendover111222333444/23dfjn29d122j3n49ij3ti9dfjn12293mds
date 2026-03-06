#!/bin/bash
./wireproxy -c wgcf-profile.conf &
sleep 8
npm start
