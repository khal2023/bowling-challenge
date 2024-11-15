Scorecard = require('./scorecard')
Frame = require('./frame')
const prompt = require("prompt-sync")();

const frames = ["first", "second", "third", "fourth", "fifth", 'sixth', "seventh", "eigth", "ninth", "final Frame"]
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const main = async () => {
    // let name = prompt("What is your name? ");
    // let consent = prompt(`Hello, ${name}! Would you like to bowl with me, today? (Y/N) `)
    // if (consent.toLowerCase() != "y") {
    //     console.log(`I'm sorry ${name} but you must bowl with me today...`)
    // }

    await sleep(2000);

    console.log(`      
    _      _____ _     ____  ____  _      _____   _____  ____    ____  ____  _      _     _  _      _____ _ 
    / \  /|/  __// \   /   _\/  _ \/ \__/|/  __/  /__ __\/  _ \  /  __\/  _ \/ \  /|/ \   / \/ \  /|/  __// \
    | |  |||  \  | |   |  /  | / \|| |\/|||  \      / \  | / \|  | | //| / \|| |  ||| |   | || |\ ||| |  _| |
    | |/\|||  /_ | |_/\|  \_ | \_/|| |  |||  /_     | |  | \_/|  | |_\\| \_/|| |/\||| |_/\| || | \||| |_//\_/
    \_/  \|\____\\____/\____/\____/\_/  \|\____\    \_/  \____/  \____/\____/\_/  \|\____/\_/\_/  \|\____\(_)
                                                                                                         

          _______
       . '       ' .
      /             \\
     |   O       O   |
     |       O       |
      \\            /
       ' ._______.' 
    `)

    // await sleep(1000)
    scorecard = new Scorecard
    for (let i = 0; i < 9; i++){
        console.log(`\n${frames[i].toUpperCase()} FRAME:`)
        if (i === 0) {
            console.log(`Current score 0`)
        }
        else if (scorecard.framesPlayed[i - 1].isStrike || scorecard.framesPlayed[i - 1].isSpare) {
            console.log(`Current Score: Awaiting strike/spare bonus`)
        }
        else {
            console.log(`Current score: ${scorecard.calculateScore()}`)
        }
        while (true) {
            try {
                score1 = parseInt(prompt(`Roll 1: `))
                if (score1 === -1) {
                    break
                }
                score2 = parseInt(prompt(`Roll 2: `))
                scorecard.addFrame(score1, score2)
                break
                }
            catch (error) {
                console.log(`\n${error.message}\n`)

            }

        }
    }
}
main()


// To do:
// add tenth and final frame
// add summary
// test drive at least one feature with mocks
// Find fun messages to throw after strikes