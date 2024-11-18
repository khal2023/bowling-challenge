// Imports
const Scorecard = require('./scorecard')
const Frame = require('./frame')
const {frames, strikeMessages, spareMessages} = require('./bowlingLookups')
const prompt = require("prompt-sync")();
const Table = require('cli-table');

// Functions
const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
const checkExitGame = score => {
    if (score.toLowerCase() === 'exit') {
        process.exit(0)
    }
}
const getUserScores = async (scorecard, i) => {
    while (true) {
        try {
            score1 = prompt(`Roll 1: `)
            checkExitGame(score1)
            if (parseInt(score1) === 10) {
                await formatStrikeMessage("strike")
                scorecard.addFrame(10, 0)
                break;
            }
            score2 = prompt(`Roll 2: `)
            checkExitGame(score2)
            scorecard.addFrame(parseInt(score1), parseInt(score2))
            if (scorecard.framesPlayed[i].isSpare) {
                await formatStrikeMessage("spare")
            }
            break
            }
        catch (error) {
            console.log(`\n${error.message}\n`)
        }
    }
}
const getFinalFrameScore = async (scorecard, i) => {
    while (true) {
        try {
            score1 = prompt('Roll 1: ')
            checkExitGame(score1)
            if (parseInt(score1) === 10) {
                await formatStrikeMessage("strike")
                score2 = prompt('Roll 2: ')
                checkExitGame(score2)
                if (parseInt(score2) === 10) {
                await formatStrikeMessage("strike")
                    score3 = prompt('Roll 3: ')
                    checkExitGame(score3)
                    if (parseInt(score3) === 10) {
                        await formatStrikeMessage("strike")
                    }
                    scorecard.addFrame(parseInt(score1), parseInt(score2), parseInt(score3))
                    break;
                }
                else {
                    scorecard.addFrame(parseInt(score1), parseInt(score2), 0)
                    break;
                }
            }
            else if (parseInt(score1) != 10) {
                score2 = prompt("Roll 2: ")
                checkExitGame(score2)
                if (parseInt(score1) + parseInt(score2) === 10) {
                    await formatStrikeMessage("spare")
                    score3 = prompt('Roll 3: ')
                    checkExitGame(score3)
                    scorecard.addFrame(parseInt(score1), parseInt(score2), parseInt(score3))
                    break;
                }
                else {
                    scorecard.addFrame(parseInt(score1), parseInt(score2))
                    break;
                }
            }
        }
        catch (error) {
            console.log(`\n${error.message}\n`)
        }
    }
}
const getRandomStrikeMessage = (strikeDetails) => {
    if (strikeDetails === "strike") {
        return strikeMessages[Math.floor(Math.random() * strikeMessages.length)]
    }
    else if (strikeDetails === "spare") {
        return spareMessages[Math.floor(Math.random() * spareMessages.length)]
    }
}
const displayScore = (frames, scorecard, i) => {
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
}
const formatStrikeMessage = async (strike) => {
    await sleep(200)
    console.log(`\n\x1b[31m${strike.toUpperCase()}: ${getRandomStrikeMessage(strike)}\x1b[0m`);
    await sleep(200)
}
const createSummaryTable = (scorecard) => {
    const table = new Table({
        head: ['Frame', 'Roll 1', 'Roll 2', 'Roll 3', 'Score'], 
        colWidths: [10, 10, 10, 10, 10], 
        });
    for (let i = 0; i <= 9; i++) {
        if (i < 9 || scorecard.framesPlayed[i].thirdBall == null) {
            table.push([i + 1, scorecard.framesPlayed[i].firstBall, scorecard.framesPlayed[i].secondBall, "-", scorecard.calculateScoreToIndex(i)])
        }
        else {
            table.push([i + 1, scorecard.framesPlayed[i].firstBall, scorecard.framesPlayed[i].secondBall, scorecard.framesPlayed[i].thirdBall, scorecard.calculateScoreToIndex(i)])
        }   
        
    }
    return table
}

module.exports = {sleep, getUserScores, getRandomStrikeMessage, displayScore, getFinalFrameScore, createSummaryTable}