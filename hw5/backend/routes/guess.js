import express from 'express'
import { getNumber, genNumber, genRockNumber } from '../core/getNumber'

const router = express.Router()
router.post('/start', (_, res) => {
    genNumber() // ⽤亂數產⽣⼀個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})

router.get('/guess', (req, res) => {
    // 去 (memory) DB 拿答案的數字
    // ⽤ req.query.number 拿到前端輸入的數字
    // check if NOT a num or not in range [1,100]
    // 如果有問題 => 
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 status
    const number = getNumber()
    const guessed = Number(req.query.number)

    if(!guessed || guessed < 1 || guessed > 100){
      res.status(406).send({ msg: 'Not a legal number.' })
    }
    else if (guessed < number){
      res.json({ msg: "Higher"})
    }
    else if( guessed > number){
      res.json({ msg: "Lower"})
    }
    else if (number === guessed){
      res.json({ msg: "Bang!!!"})
    }
})

router.post('/restart', (_, res) => {
    genNumber() // should remember re-generate number
    res.json({ msg: 'Play again.' })
})

router.get('/shoot', (req, res) => {
  const compueterState = genRockNumber()
  const withStatement = Number(req.query.rockstatus)
  
  if (compueterState === withStatement) {
      if (compueterState === 0) {
        res.json({ msg: "Tie!", oppon: "Rock"})
      }else if (compueterState === 1) {
        res.json({ msg: "Tie!", oppon: "Paper"})
      }else {
        res.json({ msg: "Tie!", oppon: "Scissors"})
      }
  }
  else if ((compueterState-withStatement === 1) || (compueterState-withStatement === -2)) {
      // res.json({ msg: "You Lose."})
      if (compueterState === 0) {
        res.json({ msg: "You lose.", oppon: "Rock"})
      }else if (compueterState === 1) {
        res.json({ msg: "You lose.", oppon: "Paper"})
      }else {
        res.json({ msg: "You lose.", oppon: "Scissors"})
      }
      
  }else {
      // res.json({ msg: "You won!"})
      if (compueterState === 0) {
        res.json({ msg: "You won.", oppon: "Rock"})
      }else if (compueterState === 1) {
        res.json({ msg: "You won.", oppon: "Paper"})
      }else {
        res.json({ msg: "You won.", oppon: "Scissors"})
      }
  }
})

export default router
   