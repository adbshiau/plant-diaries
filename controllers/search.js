const { redirect } = require('express/lib/response');

module.exports = {
    search
}

function search(req, res) {
    res.render('plants/search', {
        title: 'Plant Search'
    });
}