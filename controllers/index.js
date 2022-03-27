import axios from 'axios';
import cheerio from 'cheerio';

export const Endpoints = (req, res) => {
    const paths = [
        {path: '/top/anime/all', title: 'Top All Anime'},
        {path: '/top/anime/airing', title: 'Top Airing Anime'},
        {path: '/top/anime/upcoming', title: 'Top Upcoming Anime'},
        {path: '/top/anime/tv', title: 'Top TV Series'},
        {path: '/top/anime/movie', title: 'Top Movies'},
        {path: '/top/anime/ova', title: 'Top OVAs'},
        {path: '/top/anime/ona', title: 'Top ONAs'},
        {path: '/top/anime/special', title: 'Top Specials'},
        {path: '/top/anime/bypopularity', title: 'Most Popular Anime'},
        {path: '/top/anime/favorite', title: 'Most Favorited Anime'},
        {path: '/top/manga/all', title: 'Top All Manga'},
        {path: '/top/manga/manga', title: 'Top Manga'},
        {path: '/top/manga/oneshots', title: 'Top One-shots'},
        {path: '/top/manga/doujin', title: 'Top Doujinshi'},
        {path: '/top/manga/lightnovels', title: 'Top Light Novels'},
        {path: '/top/manga/novels', title: 'Top Novels'},
        {path: '/top/manga/manhwa', title: 'Top Manhwa'},
        {path: '/top/manga/manhua', title: 'Top Manhua'},
        {path: '/top/manga/bypopularity', title: 'Most Popular Manga'},
        {path: '/top/manga/favorite', title: 'Most Favorited Manga'},
        {path: '/people', title: 'People'},
        {path: '/characters', title: 'Characters'},
        {path: '/companies', title: 'Companies'}
    ];
    res.send(paths);
}

export const Top = (req, res) => {
    const params = req.params;
    let url = (params.type === 'all') ? `https://myanimelist.net/top${params.category}.php` : `https://myanimelist.net/top${params.category}.php?type=${params.type}`;

    axios
        .get(url)
        .then(response => {
            if(response.status === 200) {
                const $ = cheerio.load(response.data);
                let lists = [];
                $('.top-ranking-table .ranking-list').each(function(i, elem) {
                    lists[i] = {
                        rank: $(elem).find('.rank .top-anime-rank-text').text(),
                        title: $(elem).find('.title .detail h3 a').text(),
                        information: $(elem).find('.title .detail .information').text().replace(/  +/g, '').split('\n').filter(n => n != ''),
                        score: $(elem).find('.score .score-label').text(),
                        permalink: $(elem).find('.title .detail h3 a').attr('href'),
                        image: $(elem).find('.title img').attr('data-src')
                    }
                });
                lists = lists.filter(n => n !== undefined);
                res.send(lists);
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export const People = (req, res) => {
    let url = 'https://myanimelist.net/people.php';

    axios
        .get(url)
        .then(response => {
            if(response.status === 200) {
                const $ = cheerio.load(response.data);
                let lists = [];
                $('.people-favorites-ranking-table .ranking-list').each(function(i, elem) {
                    lists[i] = {
                        rank: $(elem).find('.rank span').text(),
                        name: $(elem).find('.people .information a').text(),
                        alias: $(elem).find('.people .information span').text(),
                        birthday: $(elem).find('.birthday').text().replace(/\s\s+/g, ' ').trim(),
                        favorites: $(elem).find('.favorites').text().replace(/\s\s+/g, ' ').trim(),
                        permalink: $(elem).find('.people .information a').attr('href'),
                        image: $(elem).find('.people img').attr('data-src')
                    }
                });
                lists = lists.filter(n => n !== undefined);
                res.send(lists);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export const Characters = (req, res) => {
    let url = 'https://myanimelist.net/character.php';

    axios
        .get(url)
        .then(response => {
            if(response.status === 200) {
                const $ = cheerio.load(response.data);
                let lists = [];
                $('.characters-favorites-ranking-table .ranking-list').each(function(i, elem) {
                    let animeography = [];
                    $(elem).find('.animeography .title').each(function(j, elem2) {
                        animeography[j] = {
                            name: $(elem2).find('a').text(),
                            permalink: $(elem2).find('a').attr('href')
                        }
                    });

                    let mangaography = [];
                    $(elem).find('.mangaography .title').each(function(j, elem2) {
                        mangaography[j] = {
                            name: $(elem2).find('a').text(),
                            permalink: $(elem2).find('a').attr('href')
                        }
                    });

                    lists[i] = {
                        rank: $(elem).find('.rank span').text(),
                        name: $(elem).find('.people .information a').text(),
                        alias: $(elem).find('.people .information span').text(),
                        animeography: animeography,
                        mangaography: mangaography,
                        favorites: $(elem).find('.favorites').text().replace(/\s\s+/g, ' ').trim(),
                        permalink: $(elem).find('.people .information a').attr('href'),
                        image: $(elem).find('.people img').attr('data-src')
                    }
                });
                lists = lists.filter(n => n !== undefined);
                res.send(lists);
            }
        })
        .catch(error => {
            console.log(error);
        })
}

export const Companies = (req, res) => {
    let url = 'https://myanimelist.net/company';

    axios
        .get(url)
        .then(response => {
            if(response.status === 200) {
                const $ = cheerio.load(response.data);
                let lists = [];
                $('.company-favorites-ranking-table .ranking-list').each(function(i, elem) {
                    let mostPopulars = [];
                    $(elem).find('.popularity p').each(function(j, elem2) {
                        mostPopulars[j] = {
                            name: $(elem2).find('a').text(),
                            permalink: $(elem2).find('a').attr('href')
                        }
                    });

                    let topScorers = [];
                    $(elem).find('.score p').each(function(j, elem2) {
                        topScorers[j] = {
                            name: $(elem2).find('a').text(),
                            permalink: $(elem2).find('a').attr('href')
                        }
                    });

                    lists[i] = {
                        rank: $(elem).find('.rank span').text(),
                        name: $(elem).find('.company .information a').text(),
                        alias: $(elem).find('.company .information small').text(),
                        amount: $(elem).find('.numofanime').text().replace(/\s\s+/g, ' ').trim(),
                        mostPopulars: mostPopulars,
                        topScorers: topScorers,
                        favorites: $(elem).find('.favorites').text().replace(/\s\s+/g, ' ').trim(),
                        permalink: $(elem).find('.company .information a').attr('href'),
                        image: $(elem).find('.company img').attr('data-src')
                    }
                });
                lists = lists.filter(n => n !== undefined);
                res.send(lists);
            }
        })
        .catch(error => {
            console.log(error);
        })
}