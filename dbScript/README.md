Some CLI for managing the firebase data

usage:
  nvm use
  npm install (once)
  node import.js

  this uploads the data-clean/firebase/demoRoutine.json into firebase (adds, rather than overwrites, so we do get doubles)

TODO:
  git hide the serviceAccount.json and rotate the keys (config.js is fine)
  improve the script to make it easier to upload new templates
  separate the API key used by this script from the UI one
    (this script needs write, ui only needs read)