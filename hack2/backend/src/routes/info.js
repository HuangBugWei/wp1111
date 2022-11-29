// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/

    // NOTE Hint: 
    // use `db.collection.find({condition}).exec(err, data) {...}`
    // When success, 
    //   do `res.status(200).send({ message: 'success', contents: ... })`
    // When fail,
    //   do `res.status(403).send({ message: 'error', contents: ... })` 

    // TODO Part I-3-a: find the information to all restaurants
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy
    // const existing = await Info.find({condition}).sort({ timestamp: -1 })
    
    // console.log('priceFilter:backend23')
    // console.log(priceFilter)
    // const existing = await Info.find({name: "王品牛排"})

    // console.log('existing')
    // console.log(existing)
    // console.log(existing[0]["tag"])

    // console.log(existing[0]["tag"].includes("Lunch"))
    // return existing[0]

    // console.log(['joe', 'jane', 'mary'].includes('jane'))
    
    try {
        // const existing = await Info.find({price: priceFilter})
        
        const existing = await Info.find({name: "王品牛排"})
        console.log(existing)
        if (existing.length) {
            res.status(200).send(
                {
                    message: 'success',
                    contents: existing
                }
            );
        }
        else {
            throw new Error('Something Wrong !')
        }

    } catch (error) {
        console.error(error.name + ' ' + error.message)
        res.status(403).send(
            {
                message: 'error',
                contents: null
            }
        )
    }
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/

    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
}