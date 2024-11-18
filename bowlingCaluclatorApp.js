// Imports
const Scorecard = require('./scorecard')
const Frame = require('./frame')
const {frames, strikeMessages, spareMessages} = require('./bowlingLookups')
const {sleep, getUserScores, getRandomStrikeMessage, displayScore, getFinalFrameScore, createSummaryTable} = require('./helperFunctions')
const prompt = require("prompt-sync")();


const main = async () => {
    let name = prompt("What is your name? ");
    let consent = prompt(`Hello, ${name}! Would you like to bowl with me, today? (Y/N) `)
    if (consent.toLowerCase() != "y") {
        console.log(`\n \x1b[31mI'm sorry ${name} but you must bowl with me today...\x1b[0m`)
        await sleep(500);
    }
    await sleep(200);
    console.log(`
#  #  ####  #      ##    ##   #  #  ####        ###    ##         ###    ##   #  #  #     ###   #  #   ##     #   
#  #  #     #     #  #  #  #  ####  #            #    #  #        #  #  #  #  #  #  #      #    ## #  #  #    #   
#  #  ###   #     #     #  #  ####  ###          #    #  #        ###   #  #  #  #  #      #    ## #  #       #   
####  #     #     #     #  #  #  #  #            #    #  #        #  #  #  #  ####  #      #    # ##  # ##    #   
####  #     #     #  #  #  #  #  #  #            #    #  #        #  #  #  #  ####  #      #    # ##  #  #        
#  #  ####  ####   ##    ##   #  #  ####         #     ##         ###    ##   #  #  ####  ###   #  #   ###    #
`)
    await sleep(200);
    console.log(`(Type 'exit' at anytime to leave the program.)`)
    await sleep(200);
    scorecard = new Scorecard
    for (let i = 0; i < 10; i++){
        displayScore(frames, scorecard, i)
        if (i < 9) {
            await getUserScores(scorecard, i)
        }
        else {
            await getFinalFrameScore(scorecard, i)
        }
    }
    await sleep(200);
    console.log(`\nFINAL SCORE: ${scorecard.calculateScore()}`)
    await sleep(1500);
    console.log("\nGAME SUMMARY: ")
    console.log((createSummaryTable(scorecard)).toString())
}
main()