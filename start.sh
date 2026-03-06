#!/usr/bin/env bash

./wireproxy -c config.conf &
node src/index.js
