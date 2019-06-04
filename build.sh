#!/bin/bash

if [ $1 ]
then
   ENV=$1
else
   ENV='test'
fi
if [ $2 ]
then
   SERVAR_NAME=$2
else
   SERVAR_NAME='spa-web'
fi
pm2 stop $SERVAR_NAME
yarn
node build/build.js --env $ENV
pm2 restart $SERVAR_NAME
