// max page = 10
export const homePageAPI = (page) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=${page}`,
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const movieDataAPI = ({ id, category }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`,
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const movieMediaAPI = ({ category, contentId, episodeId, definition }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${contentId}&episodeId=${episodeId}&definition=${definition}`,
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const TVDetailAPI = ({ id, category }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`,
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const TVEpisodeMediaAPI = ({ category, contentId, episodeId, definition }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${contentId}&episodeId=${episodeId}&definition=${definition}`,
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const topSearchKeywordsAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/searchLenovo',
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    },
    data
})

export const searchWithKeywordAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord',
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    },
    data
})

export const searchLeaderBoardAPI = () => ({
    method: 'get',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchLeaderboard',
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const searchConfigAPI = () => ({
    method: 'get',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/list',
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    }
})

export const advancedSearchAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/v1/search',
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    },
    data
})

export const previewVideosAPI = (page) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/recommendPool/getVideoFromRecommondPool?page=${page}`,
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default',
        'deviceid': ''
    }
})

export const previewVideoMediaAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/media/bathGetplayInfo',
    headers: {
        'lang': 'en',
        'versioncode': '11',
        'clienttype': 'ios_jike_default'
    },
    data
})