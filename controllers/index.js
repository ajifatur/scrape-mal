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
        {path: '/top/manga/favorite', title: 'Most Favorited Manga'}
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
                        image: $(elem).find('.title img').attr('data-src'),
                        permalink: $(elem).find('.title .detail h3 a').attr('href'),
                        information: $(elem).find('.title .detail .information').text().trim(),
                        score: $(elem).find('.score .score-label').text()
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