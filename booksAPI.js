const https = require('https');

module.exports = async function(t, a, cb) {
    let retInf = {};
    var title = '',
        author = '';
    for (c in t) {
        if (t.charAt(c) === ' ') {
            title += '%20';
        } else {
            title += t.charAt(c);
        }
    }
    for (c in a) {
        if (t.charAt(c) === ' ') {
            author += '%20';
        } else {
            author += a.charAt(c);
        }
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q="${title}"+"${author}"&printType=books&maxResults=1&key=${process.env.bookKey}`;

    https.get(url, (res) => {
        let body = '';

        res.on('data', (chunk) => {
            body += chunk;
        });
    
        res.on('end', () => {
            try {
                let json = JSON.parse(body);
                retInf.url = json.items[0].volumeInfo.infoLink;
                retInf.title = t;
                retInf.author = a;
                retInf.desc = json.items[0].volumeInfo.description;
                retInf.cover = json.items[0].volumeInfo.imageLinks.thumbnail;

                cb(null, retInf);
            } catch (error) {
                console.error(error.message);
                cb(error);
            };
        });
    
    }).on('error', (error) => {
        console.error(error.message);
    });
}