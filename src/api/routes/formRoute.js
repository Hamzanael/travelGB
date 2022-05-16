const SearchController = require('../controller/searchController')
const searchController = new SearchController()
const formsRoute = (apiRoute) => {
    apiRoute.post('/search', searchController.getSearchResults)
}

module.exports = formsRoute
