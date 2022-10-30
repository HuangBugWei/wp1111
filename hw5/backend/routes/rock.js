import express from 'express'

const router = express.Router()

router.get('/shoot', (req, res) => {
    const compueterState = Math.floor(Math.random() * 3) 
    const withStatement = Number(req.query.rockstatus)
    console.log(compueterState)
    console.log(withStatement)
    if (compueterState === withStatement) {
        res.json({ msg: "Tie."})
    }

    else if ((compueterState-withStatement) === (1 || -2) {
        res.json({ msg: "You Lose."})
    }else {
        res.json({ msg: "You won!"})
    }
})

export default router