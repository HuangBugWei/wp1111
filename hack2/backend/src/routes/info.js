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
    const finalFilter = []
    if (priceFilter) {
        const filterArr = []
        for (let i = 0; i < priceFilter.length; i++) {
            filterArr.push({price: priceFilter[i].length})
        }
        // filterArr = [{price: 1}, ...]
        // https://www.mongodb.com/docs/manual/reference/operator/query/and/
        finalFilter.push( { $or: filterArr } )
    }

    if (mealFilter) {
        const filterArr = []
        for (let i = 0; i < mealFilter.length; i++) {
            filterArr.push({tag: mealFilter[i]})
        }
        finalFilter.push( { $or: filterArr } )
        // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    }

    if (typeFilter) {
        const filterArr = []
        for (let i = 0; i < typeFilter.length; i++) {
            filterArr.push({tag: typeFilter[i]})
        }
        finalFilter.push( { $or: filterArr } )
        // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    }

    // const rtnPriceFilter = async (priceFilter) => {
    //     if (priceFilter) {
    //         const filterArr = []
    //         for (let i = 0; i < priceFilter.length; i++) {
    //             filterArr.push({price: priceFilter[i].length})
    //         }
    //         // filterArr = [{price: 1}, ...]
    //         const afterPriceFilter = await Info.find( { $or: filterArr } )
    //         // https://www.mongodb.com/docs/manual/reference/operator/query/and/
    //         return afterPriceFilter
    //     } else {
    //         const afterPriceFilter = await Info.find()
    //         return afterPriceFilter    
    //     }
    // }

    // const afterPriceFilter = await rtnPriceFilter(priceFilter)

    // const rtnMealFilter = async (mealFilter) => {
    //     if (mealFilter) {
    //         const filterArr = []
    //         for (let i = 0; i < mealFilter.length; i++) {
    //             filterArr.push({tag: mealFilter[i]})
    //         }
    //         const afterMealFilter = await Info.find( { $or: filterArr } )
    //         return afterMealFilter
    //         // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    //     } else {
    //         const afterMealFilter = await Info.find()
    //         return afterMealFilter    
    //     }
    // }

    // const afterMealFilter = await rtnMealFilter(mealFilter)

    // const rtnTypeFilter = async (typeFilter) => {
    //     if (typeFilter) {
    //         const filterArr = []
    //         for (let i = 0; i < typeFilter.length; i++) {
    //             filterArr.push({tag: typeFilter[i]})
    //         }
    //         const afterTypeFilter = await Info.find( { $or: filterArr } )
    //         return afterTypeFilter
    //         // https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    //     } else {
    //         const afterTypeFilter = await Info.find()
    //         return afterTypeFilter    
    //     }
    // }

    // const afterTypeFilter = await rtnTypeFilter(typeFilter)
    // const existing = await Info.find( { $and: finalFilter } )
    // console.log(existing.length)

    try {
        // const existing = await Info.find({price: priceFilter})
        const existing = await Info.find( finalFilter.length === 0 ? {} : { $and: finalFilter } )
        // console.log(existing.length)
        if (sortBy === 'price') {
            existing.sort(function(a, b){
                // https://stackoverflow.com/questions/8837454/sort-array-of-objects-by-single-key-with-date-value
                // Compare the 2 dates
                if(a.price < b.price) return -1;
                if(a.price > b.price) return 1;
                return 0;
            });
        } else {
            existing.sort(function(a, b){
                if(a.distance < b.distance) return -1;
                if(a.distance > b.distance) return 1;
                return 0;
            });
        }
        
        // if (existing.length) {
            // console.log(existing)
            // console.log('sssssspriceFilter')
            res.status(200).send(
                {
                    message: 'success',
                    contents: existing
                }
            )
        // }
        // else {
        //     throw new Error('Something Wrong !')
        // }

    } catch (error) {
        console.error(error.name + ' ' + error.message)
        res.status(403).send(
            {
                message: 'error',
                contents: []
            }
        )
    }
}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    // const existing = await Info.find( {id : id} )
    // if (existing){
    //     {
    //         message: 'success'
    //         contents: existing
    //     }
    // }else{

    // }
    try {
        const existing = await Info.find( {id : id} )
            res.status(200).send(
                {
                    message: 'success',
                    contents: existing
                }
            )
    } catch (error) {
        console.error(error.name + ' ' + error.message)
        res.status(403).send(
            {
                message: 'error',
                contents: []
            }
        )
    }

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