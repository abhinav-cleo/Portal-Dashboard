#!/usr/bin/env bash
sudo apt-get update --fix-missing
sudo apt-get install git-all
curl -sL https://deb.nodesource.com/setup_7.x | sudo -E bash -
sudo apt-get install nodejs
npm install
npm start
