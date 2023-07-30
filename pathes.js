const sep = require('path').sep;


module.exports = {
    relative: {
        html: `${__dirname}${sep}assets${sep}html${sep}`,
        tempHtml: `${__dirname}${sep}assets${sep}tempHtml${sep}`,
        images: `${__dirname}${sep}assets${sep}images${sep}`,
        pdf: `${__dirname}${sep}assets${sep}pdf${sep}`,
        json: `${__dirname}${sep}assets${sep}json${sep}`,
        template: `${__dirname}${sep}Templates${sep}ejs${sep}`,
    },
    browser: {
        tempHtml: `file://${__dirname}/assets/tempHtml/`,
    }
};
