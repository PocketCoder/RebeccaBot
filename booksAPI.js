const fetch = require('node-fetch');

module.exports = async function(t, a) {
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
        if (a.charAt(c) === ' ') {
            author += '%20';
        } else {
            author += a.charAt(c);
        }
    }
    const url = `https://www.googleapis.com/books/v1/volumes?q="${title}"+"${author}"&maxResults=1&key=${process.env.bookKey}`;

    const data = await fetch(url).catch(e => console.log(e));
    const json = await data.json();
    retInf.url = json.items[0].volumeInfo.infoLink;
    retInf.title = t;
    retInf.author = a;
    retInf.desc = json.items[0].volumeInfo.description;
    retInf.cover = json.items[0].volumeInfo.imageLinks.thumbnail;
    return retInf;
}