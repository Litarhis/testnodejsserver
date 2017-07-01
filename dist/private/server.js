module.exports = {
    start: function () {
        const path = require('path');
        const express = require('express');
        const app = express();
        app.set('json spaces', 2);
        const router = require('./router');
        console.log((new Date()) + " Creating Server...");
        router.route(app, [
            'home',
            'login',
            'register'
        ]);
        app.listen(4444);
        console.log((new Date()) + " Server now listening on port: " + 4444 + " (by default)");
        console.log((new Date()) + " APIs are ready to serve")
        console.log("If you want to terminate the server press Ctrl+C")
        console.log("--------------------------------------------------\nShowing status and transactions:\n");
    }
};
//# sourceMappingURL=server.js.map