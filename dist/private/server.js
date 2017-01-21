module.exports = {
    start: function () {
        const path = require('path');
        const express = require('express');
        const app = express();
        const router = require('./router');
        console.log("Creating Server...");
        router.route(app, [
            'home',
            'login',
            'signup'
        ]);
        app.listen(4444);
        console.log("Server created on PORT: " + 4444);
    }
};
//# sourceMappingURL=server.js.map