module.exports = class viewController {

    async mainPageView(req, res) {
        res.render('index')
    }

    async planPageView(req, res) {
        res.render('pages/result')
    }
}