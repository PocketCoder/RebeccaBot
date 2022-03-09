const fetch = require('node-fetch');

function similarity(s1, s2) {
    var longer = s1;
    var shorter = s2;
    if (s1.length < s2.length) {
        longer = s2;
        shorter = s1;
    }
    var longerLength = longer.length;
    if (longerLength == 0) {
        return 1.0;
    }
    return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
}

function editDistance(s1, s2) {
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();

    var costs = new Array();
    for (var i = 0; i <= s1.length; i++) {
        var lastValue = i;
        for (var j = 0; j <= s2.length; j++) {
            if (i == 0)
                costs[j] = j;
            else {
                if (j > 0) {
                    var newValue = costs[j - 1];
                    if (s1.charAt(i - 1) != s2.charAt(j - 1))
                        newValue = Math.min(Math.min(newValue, lastValue),
                            costs[j]) + 1;
                    costs[j - 1] = lastValue;
                    lastValue = newValue;
                }
            }
        }
        if (i > 0)
            costs[s2.length] = lastValue;
    }
    return costs[s2.length];
}

module.exports = {
    async Synopsis(t, a) {
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
        retInf.pubDate = json.items[0].volumeInfo.publishedDate;
        retInf.pages = json.items[0].volumeInfo.pageCount.toString();
        retInf.isbn = `13: ${json.items[0].volumeInfo.industryIdentifiers[0].identifier}\n 10: ${json.items[0].volumeInfo.industryIdentifiers[1].identifier}`;

        return retInf;
    },

    async Author(a) {
        let author = '';
        for (c in a) {
            if (a.charAt(c) === ' ') {
                author += '%20';
            } else {
                author += a.charAt(c);
            }
        }

        const url = `https://www.googleapis.com/books/v1/volumes?q="${author}"&maxResults=5&key=${process.env.bookKey}`;
        const data = await fetch(url).catch(e => console.log(e));
        const json = await data.json();
        for (z in json.items) {
            console.log(`${json.items[z].volumeInfo.title}: ${json.items[z].volumeInfo.authors}`);
        }
        let books = [];
        for (i in json.items) {
            for (au in json.items[i].volumeInfo.authors) {
                const sim = similarity(json.items[i].volumeInfo.authors[au], a);
                if (sim >= 0.7) {
                    let subtitle = '';
                    if (json.items[i].volumeInfo.subtitle != undefined) {
                        subtitle = ': ' + json.items[i].volumeInfo.subtitle;
                    }
                    books.push({
                        title: `${json.items[i].volumeInfo.title}${subtitle}`,
                        published: `Published: ${json.items[i].volumeInfo.publishedDate.toString()}`
                    });
                }
            }
        }
        return books;
    }
}