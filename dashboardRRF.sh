#!/bin/sh


case "$1" in
    start)
        nohup node server.js > /tmp/dashboardRRF_test.log 2>&1 & echo $! > /tmp/dashboardRRF_test.pid
        ;;
    stop) 
        kill `cat /tmp/dashboardRRF_test.pid`
        ;;
    *)
    echo "\nUsage :"
    echo "$0 [start|stop]"
    echo "start: Démarre le serveur /opt/dashboard_TEST/dashboardRRF.js"
    echo "stop : Arrête le serveur /opt/dashboard_TEST/dashboardRRF.js\n"
    ;;
    esac