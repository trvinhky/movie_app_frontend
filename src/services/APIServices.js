import axios from 'axios'
import {
    homePageAPI,
    movieDataAPI,
    movieMediaAPI,
    TVDetailAPI,
    TVEpisodeMediaAPI,
    topSearchKeywordsAPI,
    searchWithKeywordAPI,
    searchLeaderBoardAPI,
    searchConfigAPI,
    advancedSearchAPI,
    previewVideosAPI,
    previewVideoMediaAPI
} from '../config/configAPI'

export const getDataHome = async (page) => {
    let data = {}
    const config = homePageAPI(page)
    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })

    return data
}

export const getMoviesDetail = async (obj) => {
    let data = {}
    const config = movieDataAPI(obj)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const getMovieMedia = async (obj) => {
    let data = {}
    const config = movieMediaAPI(obj)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const getTVDetail = async (obj) => {
    let data = {}
    const config = TVDetailAPI(obj)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const getTVEpisodeMedia = async (obj) => {
    let data = {}
    const config = TVEpisodeMediaAPI(obj)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const postTopSearchKeywords = async (dataBody) => {
    let data = {}
    const config = topSearchKeywordsAPI(dataBody)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const postSearchWithKeyword = async (dataBody) => {
    let data = {}
    const config = searchWithKeywordAPI(dataBody)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const getSearchLeaderBoard = async () => {
    let data = {}
    const config = searchLeaderBoardAPI()
    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })

    return data
}

export const getSearchConfig = async () => {
    let data = {}
    const config = searchConfigAPI()
    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })

    return data
}

export const postAdvancedSearch = async (dataBody) => {
    let data = {}
    const config = advancedSearchAPI(dataBody)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}

export const getPreviewVideos = async (page) => {
    let data = {}
    const config = previewVideosAPI(page)
    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })

    return data
}

export const postPreviewVideoMedia = async (dataBody) => {
    let data = {}
    const config = previewVideoMediaAPI(dataBody)

    await axios(config)
        .then(function (res) {
            data = res.data
        })
        .catch(function (error) {
            console.log(error)
        })
    return data
}