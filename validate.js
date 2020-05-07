const scripts = require('./validation.json')
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})
const util = require('util')
const exec = util.promisify(require('child_process').exec)

// console.log(scripts)

const readInput = q => {
    return new Promise((resolve) => {
        readline.question(q, answer => resolve(answer))
    })
}



const launch = async () => {
    if (typeof (scripts['build-script']) != 'string') {
        console.log('build-script is not defined as string.')
        process.exit()
    }
    if (Array.isArray(scripts.checks)) {
        if (!scripts.checks.every(i => typeof (i) == 'string')) {
            console.log('checks should only contain strings.')
            process.exit()
        }
        for (var q of scripts.checks) {
            const answer = await readInput(`${q} [y/N]`)
            if (answer.toLowerCase() != 'y') {
                console.log('Please take necessary actions before I run the build command.')
                process.exit()
            }
        }
        try {
            const {err, stdout, stderr} = await exec(scripts['build-script'])
            if (stderr) {
                console.log('Error!')
                console.log(stderr)
                process.exit()
            }
            console.log(stdout)
            process.exit()
        } catch (err) {
            console.log('Error!')
            console.log(err.message)
            process.exit()
        }
    } else {
        console.log('checks should be an array of strings.')
        process.exit()
    }
}

launch()