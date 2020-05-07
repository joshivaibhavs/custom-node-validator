# custom-node-validator
A customizable validator CL script to confirm a checklist before running a deploy/build command

`validation.json` to be changed as required.

`checks contains` the questions to be asked.

`build-script` is the final script to run (e.g. `vue-cli-service build` for a vue.js project)

run `npm run start-build` to start.

This is what I am using for most of my projects which require a basic checklist to be implemented before deploy.
Would like to make it into an npm module for others to use as well.
Collaborations welcome.
