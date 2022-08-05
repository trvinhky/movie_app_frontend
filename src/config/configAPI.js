// max page = 10
const headers = {
    'lang': 'en',
    'versioncode': '11',
    'clienttype': 'ios_jike_default'
}

export const homePageAPI = (page) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/homePage/getHome?page=${page}`,
    headers
})

export const movieDataAPI = ({ id, category }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`,
    headers
})

export const movieMediaAPI = ({ category, contentId, episodeId, definition }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${contentId}&episodeId=${episodeId}&definition=${definition}`,
    headers
})

export const TVDetailAPI = ({ id, category }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/movieDrama/get?id=${id}&category=${category}`,
    headers
})

export const TVEpisodeMediaAPI = ({ category, contentId, episodeId, definition }) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/media/previewInfo?category=${category}&contentId=${contentId}&episodeId=${episodeId}&definition=${definition}`,
    headers
})

export const topSearchKeywordsAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/searchLenovo',
    headers,
    data
})

export const searchWithKeywordAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchWithKeyWord',
    headers,
    data
})

export const searchLeaderBoardAPI = () => ({
    method: 'get',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/v1/searchLeaderboard',
    headers
})

export const searchConfigAPI = () => ({
    method: 'get',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/list',
    headers
})

export const advancedSearchAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/search/v1/search',
    headers,
    data
})

export const previewVideosAPI = (page) => ({
    method: 'get',
    url: `https://ga-mobile-api.loklok.tv/cms/app/recommendPool/getVideoFromRecommondPool?page=${page}`,
    headers
})

export const previewVideoMediaAPI = (data) => ({
    method: 'post',
    url: 'https://ga-mobile-api.loklok.tv/cms/app/media/bathGetplayInfo',
    headers,
    data
})