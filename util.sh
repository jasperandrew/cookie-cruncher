#!/bin/bash

#--------------------------------------------#
#               Some variables               #
#--------------------------------------------#

# packages to install
babel="@babel/core @babel/cli @babel/preset-env"
react="react react-dom @babel/preset-react"
sass="sass"
pug="pug-cli" # https://github.com/pugjs/babel-plugin-transform-react-pug
http_server="http-server"


# babel config file
babel_config='{
	"presets": [
		"@babel/preset-env",
		"@babel/preset-react"
	]
}'

# basic pug file
pug_file='doctype html
html(lang="en")
	head
		meta(charset="UTF-8")
		meta(name="viewport", content="width=device-width, initial-scale=1.0")
		meta(http-equiv="X-UA-Compatible", content="ie=edge")
		link(rel="stylesheet", href="css/style.css")
		title 
	body
		script(src="https://unpkg.com/react@16/umd/react.production.min.js", crossorigin)
		script(src="https://unpkg.com/react-dom@16/umd/react-dom.production.min.js", crossorigin)
		script(src="js/main.js")'


#--------------------------------------------#
#               Some functions               #
#--------------------------------------------#

build () {
	echo "[Util] Building files..."
	npx babel src/ -d docs/
	npx sass src/:docs/
	npx pug src/ -o docs/
}

help () {
	echo "usage stuff"
}

start () {
	echo "[Util] Starting server..."
	npx http-server
}

watch () {
	echo "[Util] Watching files for updates..."
	trap "kill 0" EXIT
	npx babel --verbose -w src/ -d docs/ &
	npx sass --watch src/:docs/ &
	npx pug -w src/ -o docs/ &
	wait
}


#--------------------------------------------#
#          Actually doing stuff now          #
#--------------------------------------------#

if [[ $# -eq 0 ]]; then help
elif [[ $# -eq 1 ]]; then

	if [[ $1 == "build" ]]; then build
	elif [[ $1 == "help" ]]; then help
	elif [[ $1 == "start" ]]; then start
	elif [[ $1 == "watch" ]]; then watch
	else echo "[Error] Invalid argument"; help
	fi

else echo "[Error] Too many arguments"; help
fi