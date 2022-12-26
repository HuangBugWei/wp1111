import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const CLEAR = async (req, res) => {
    try {
    await ScoreCard.deleteMany({});
    console.log("Database deleted");
    res.json({ message: "Database cleared" });
    } catch (e) 
        { throw new Error("Database deletion failed"); }
    };

const ADD = async (req, res) => {
    const name = req.body.name;
    const subject = req.body.subject;
    const score = req.body.score;
    // const existing = await User.findOne({ name });
    const exist = await ScoreCard.findOne({ name: name, subject: subject });
    // check whether add or update
    if (!exist) {
        const newScoreCard = new ScoreCard({ name: name, subject: subject, score: score });
        await newScoreCard.save();
        console.log("Created user", newScoreCard);
        res.send({ message: `Adding (${name}, ${subject}, ${score})`, card: newScoreCard });
    } else {
        exist.score = score;
        await exist.save();
        console.log("Updated user", exist);
        res.send({ message: `Updating (${name}, ${subject}, ${score})`, card: exist });
    }
}

const QUERY = async (req, res) => {
    const queryType = req.query.type;
    const queryString = req.query.queryString;
    let queryCards;
    if (queryType === "name") {
        queryCards = await ScoreCard.find({ name: queryString }).catch(err => {
            console.log(err);
        });
    } else if (queryType === "subject") {
        queryCards = await ScoreCard.find({ subject: queryString }).catch(err => {
            console.log(err);
        });
    }

    let messages = [];
    if (queryCards.length > 0) {
        queryCards.forEach(card => messages.push(`Found card with ${queryType}: (${card.name}, ${card.subject}, ${card.score})`));
        res.send({ messages: messages});
    } else {
        res.send({ message: `${queryType} (${queryString}) not found!` });
    }
}

const router = Router();
router.delete("/cards", CLEAR);
router.post("/card", ADD);
router.get("/cards", QUERY);
export default router;