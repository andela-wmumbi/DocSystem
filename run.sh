osascript -e 'tell application \"System Events\" to tell process \"Terminal\" to keystroke \"t\" using command down' > /dev/null 2>&1
osascript -e 'tell application \"System Events\" to tell process \"Terminal\" to run npm start' > /dev/null 2>&1
