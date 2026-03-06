#!/usr/bin/env bash

# register WARP
./wgcf register --accept-tos

# generate config
./wgcf generate

# start wireguard userspace tunnel
./wgcf serve &

# start proxy
npm start
