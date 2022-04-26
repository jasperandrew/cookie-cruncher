function server {
    "Starting server"
    npx http-server docs/
}

function build {
    "Building files"
    npx babel src/ -d docs/
    npx sass src/:docs/
    npx pug3 src/ -o docs/
}

switch ($args[0]) {
    "b" { build }
    "build" { build }
    "s" { server }
    "server" { server }
    Default { "Invalid command" }
}