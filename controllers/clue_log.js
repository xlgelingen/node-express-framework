const ClueLogModel = require('../models/clue_log');
const ClueLog = new ClueLogModel();
const ClueModel = require('../models/clue');
const Clue = new ClueModel();
const moment = require('moment');

const clueLog = {
    index: async function (req, res, next) {
        try {
            const clueId = req.body.clueId;

            // const clue = await Clue.select({id});
            // clue[0].create_time = moment(clue[0].create_time).format('YYYY-MM-DD HH:mm:ss');
            // res.locals.clue = clue[0];

            var clueLogs = await ClueLog.select({clue_id: clueId});
            logsInfo = clueLogs.map(data=>{
                data.create_time = moment(data.create_time).format('YYYY-MM-DD HH:mm:ss');
                return data;
            });
            res.json({ code: 200, data: {code: 200, logsInfo} });
        } catch (e) {
            res.json({ code: 0, data: {code: 0,e} });
        }
    },

    insert: async function (req, res, next) {
        let clue_id = req.body.clueId;
        let content = req.body.content;
        if (!content || !clue_id) {
            res.json({ code: 0, data: { code: 0, msg:'params empty!'} });
            return
        }
        try {
            const clueLog = await ClueLog.insert({ clue_id, content });
            res.json({ code: 200, data: {code: 200, clueLog} });
            console.log(clueLog);
        } catch (e) {
            res.json({ code: 0, data: {code: 0,e} });
        }
    },

}

module.exports = clueLog;