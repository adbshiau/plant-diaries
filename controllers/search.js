const { redirect } = require('express/lib/response');

module.exports = {
    search
}

// renders plant search view
function search(req, res) {
    res.render('plants/search', {
        title: 'Plant Search'
    });
}