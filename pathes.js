const sep = require('path').sep;


module.exports = {
    relative: {
        html: `${__dirname}${sep}assets${sep}html${sep}`,
        tempHtml: `${__dirname}${sep}assets${sep}tempHtml${sep}`,
        images: `${__dirname}${sep}assets${sep}images${sep}`,
        pdf: `${__dirname}${sep}assets${sep}pdf${sep}`,
        json: `${__dirname}${sep}assets${sep}json${sep}`,
    },
    browser: {
        tempHtml: 'file://C:/Users/Anton/Home/apps/Warhammer/assets/tempHtml/',
    }
};
