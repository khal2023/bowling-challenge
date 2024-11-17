Frame = require('./frame')

describe('Frame', () => {
    it("validates the first ball if below 10", () => {
        frame = new Frame(6, 2)
        expect(frame.firstBall).toBe(6)
    })
    it('refuses first ball if above 10', () => {
        expect(() => new Frame(11, 5)).toThrow("Scores must be between 0 and 10 for the first roll")
    })
    it('correctly sets strike to true if firstBall is 10', () => {
        frame = new Frame(10, 0)
        expect(frame.isStrike).toBe(true)
    })
    it('validates second ball if total pins for frame below 10', () => {
        frame = new Frame(1, 6)
        expect(frame.secondBall).toBe(6)
    })
    it('validates second ball if total pins for frame exactly 10', () => {
        frame = new Frame(3, 7)
        expect(frame.secondBall).toBe(7)
    })
    it('refuses second ball if total over frame now exceeds 10', () => {
        expect(() => new Frame(6, 8)).toThrow("The total across both rolls cannot exceed 10. Current total: 14")
    })
    it('sets spare to true if 10 is reached over the frame', () => {
        frame = new Frame(8, 2)
        expect(frame.isSpare).toBe(true)
    })
    it('correctly calculates the total over the frame', () => {
        frame = new Frame(3, 5)
        expect(frame.getFrameTotal()).toBe(8)
    })
    it("handles an extra ball in the final frame", () => {
        frame = new Frame(10, 3, 5)
        expect(frame.getFrameTotal()).toBe(18)
    })
    it("gives correct score for a perfect final frame", () => {
        frame = new Frame(10, 10, 10)
        expect(frame.getFrameTotal()).toBe(30)
    })
    it("refuses rolls over 10 on the final frame", () => {
        expect(() => new Frame(10, 10, 11)).toThrow("Pins knocked down must be between 0 and 10")
    })
})