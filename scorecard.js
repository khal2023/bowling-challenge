Frame = require('./frame')

class Scorecard {
    constructor() {
        this.framesPlayed = [];
    }
    addFrame = (score1, score2, score3 = null) => {
        score3 == null ? this.framesPlayed.push(new Frame(score1, score2)):
        this.framesPlayed.push(new Frame(score1, score2, score3))       
    }
    showFramesPlayed = () => {
        return this.framesPlayed
    }

    calculateScore = () => {
        let score = 0;
        for (let i = 0; i < this.framesPlayed.length; i++) {
            // Edge frame checks
            const finalFrame = this.finalFrameCheck(i)
            const penultimateFrame = this.penultimateFrameCheck(i)

            // Assigniments
            let currentFrame = this.framesPlayed[i]
            let nextFrame = this.framesPlayed[i + 1]
            let nextNextFrame = this.framesPlayed[i + 2]

            // Logic
            if (currentFrame.isStrike) {
                score = this.getStrikeScore(currentFrame, nextFrame, nextNextFrame, finalFrame, penultimateFrame, score)
            }
            else if (currentFrame.isSpare && !finalFrame) {
                score = this.getSpareScore(nextFrame, score)
            }
            else { 
                score += currentFrame.getFrameTotal()
            }
        }
        return score
    }
    getStrikeScore = (currentFrame, nextFrame, nextNextFrame, finalFrame, penultimateFrame, score) => {
        if (finalFrame) {
            score += currentFrame.getFrameTotal()
        }
        else if (penultimateFrame) {
            score += 10 + nextFrame.firstBall + nextFrame.secondBall
        }
        else if (nextFrame.isStrike) {
            score += 10 + 10 + nextNextFrame.firstBall
        }
        else {
            score += 10 + nextFrame.getFrameTotal()
        }
        return score;
    }
    getSpareScore = (nextFrame, score) => {
        return score += 10 + nextFrame.firstBall
    }
    finalFrameCheck = i => i === 9;
    penultimateFrameCheck = i => i === 8;
}

module.exports = Scorecard