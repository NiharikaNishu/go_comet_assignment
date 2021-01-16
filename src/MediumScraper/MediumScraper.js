import React, { Component } from 'react';
import axios from 'axios'


let mediumObject = []
let sortedObject = []
let sortedCaseSensitiveObject = []
let filteredOutGapObject = []
let newSortedObjectByCase = []
let newSortedObjectFilterOutBrands = []


class MediumScraper extends Component {
    
userEntersValidQuery = (showPosts, query) => showPosts && query.length > 0

tweetsExistFromQuery = (error,posts) => !error &&posts.statuses.length > 0

sortByFavoritesDescending = (a,b) => -1*((a.favorite_count > b.favorite_count) ? 1 : ((b.favorite_count > a.favorite_count) ? -1 : 0))

soryByFollowersDesending = (a,b) => -1*((a.user.followers_count > b.user.followers_count) ? 1 : ((b.user.followers_count > a.user.followers_count) ? -1 : 0))

sortByfavoritesOrFollowers = (mediumObject) => !this.props.sortByFavorites ? (mediumObject.sort((a,b) => this.sortByFavoritesDescending(a,b))) : (mediumObject.sort((a,b) =>  this.soryByFollowersDesending(a,b)))

sendTwitterData = (sortedObject, queryData,posts) => sortedObject.map((i) => queryData(i.full_text, i.user.name,posts.statuses.length, i.favorite_count, i.user.followers_count))

returnCaseSensitivePosts = (sortedObject, query) => {
    sortedCaseSensitiveObject = sortedObject
    let regex = new RegExp(query);
    return (
        sortedCaseSensitiveObject.filter((i) => (i.full_text.search(regex) >= 0 && this.returnFilteredOutBrands(i)))
    )}



filterGapPosts = (sortedObject, query) => {
    filteredOutGapObject = sortedObject
    return filteredOutGapObject.filter((i) => this.returnFilteredOutBrands(i))
}



mediumSearch = (query, showPosts, queryData,resultType) => {
    return (showPosts ? (axios.get(`http://localhost:3000/?id=${query}&resultType=${resultType}`)
        .then((response) => {
            console.log(response.data.statuses)
                        response.data.statuses.map((i, index) => {
                        mediumObject.push(i)
                        sortedObject = this.sortByfavoritesOrFollowers(mediumObject)
                        return mediumObject
                        })
                    newSortedObjectByCase = this.returnCaseSensitivePosts(sortedObject, query)
                    newSortedObjectFilterOutBrands = this.filterGapPosts(sortedObject, query)
                    this.sendTwitterData(this.props.caseSensitive ? newSortedObjectByCase: newSortedObjectFilterOutBrands, queryData, response.data)
                    
                    sortedObject = [] 
                    mediumObject = []
            showPosts = false
        })
        .catch( (error) => {
            console.log(error);
        })): null 
    
    )}



 render() {
    return( 
    <div>
        {this.mediumSearch(this.props.post, this.props.showpost, this.props.queryData, this.props.popularOrLatest)}
        </div>
    )}
       
}

export default MediumScraper

