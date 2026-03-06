#!/usr/bin/env bash

./wgcf register --accept-tos
./wgcf generate

./wireproxy -c wgcf-profile.conf &

npm start
