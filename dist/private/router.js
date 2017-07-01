module.exports = {
    route: function Route(application, links) {
        const pages = {
            "home": "./Routing/homeRouting",
            "login": "./Routing/loginRouting",
            "register": "./Routing/signupRouting"
        };
        links.map(n => {
            const routing = require(pages[n]);
            routing.link(application);
        });
    }
};
//# sourceMappingURL=router.js.map