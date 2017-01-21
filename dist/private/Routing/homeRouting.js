module.exports = {
    link: function homeRouting(app) {
        const path = require('path');
        app.get('/', (req, res) => {
            res.sendFile(path.join(__dirname, "../../public/views", "home.view.html"));
        });
    }
};
//# sourceMappingURL=homeRouting.js.map