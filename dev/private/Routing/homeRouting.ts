/** home */

module.exports = {
  link: function homeRouting(app: Object) {
    const path = require('path');

    app.get('/', (req, res) => {
      res.sendFile(path.join(__dirname, "../../public/views", "home.view.html"));
    });
  }
};
