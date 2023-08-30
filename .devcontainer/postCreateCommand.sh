#!/bin/sh
# postCreateCommand.sh

echo "START Install"

sudo chown -R vscode:vscode .


echo "First of all, please execute the following command"
echo "-----------------------------------------------"
echo "git config --global user.name \"Your Name\""
echo "git config --global user.email \"Your Email\""
echo "-----------------------------------------------"

# cp -n .env.local.example .env.local
npm ci
./build.sh

echo "FINISH Install"