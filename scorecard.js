Frame = require('./frame')

class Scorecard {
    constructor() {
        this.score = 0;
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
        for (let i = 0; i < this.framesPlayed.length; i++) {
            // Edge frame checks
            let finalFrame = false;
            let penultimateFrame = false;
            if (i === 8){
                penultimateFrame = true
            }
            else if (i === 9) {
                finalFrame = true
            }
            // Assigniments
            let currentFrame = this.framesPlayed[i]
            let nextFrame = this.framesPlayed[i + 1]
            let nextNextFrame = this.framesPlayed[i + 2]

            // Logic
            // Nested if, get into sepearate function
            if (currentFrame.isStrike) {
                if (finalFrame) {
                    this.score += currentFrame.getFrameTotal()
                }
                else if (penultimateFrame) {
                    this.score += 10 + nextFrame.firstBall + nextFrame.secondBall
                }
                else if (nextFrame.isStrike) {
                    this.score += 10 + 10 + nextNextFrame.firstBall
                }
                else {
                    this.score += 10 + nextFrame.getFrameTotal()
                }
            }
            else if (currentFrame.isSpare && !finalFrame) {
                this.score += 10 + nextFrame.firstBall

            }
            else { 
                this.score += currentFrame.getFrameTotal()
            }
        }
        return this.score
    }
}

scorecard = new Scorecard
for (let i = 0; i < 9; i++) {
    scorecard.addFrame(10, 0)
}
scorecard.addFrame(10, 10, 10)
console.log(scorecard.calculateScore())

module.exports = Scorecard