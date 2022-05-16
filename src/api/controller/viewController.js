const PlanService = require('../../services/PlanService')
let planService = new PlanService()
module.exports = class viewController {

    async mainPageView(req, res) {
        let plans = await planService.getAll()
        res.render('index', { plans: plans })
    }

    async planPageView(req, res) {
        res.render('pages/result')
    }
}