import React, { Component } from 'react';
import './App.css'
import MediumScraper from '../MediumScraper/MediumScraper'
import PopularLatestToggle from '../PopularLatestToggle/PopularLatestToggle'

class App extends Component {

  constructor(props){
    super(props)
      this.state = {
       tags: '',
       tag: '',
       showPosts: false,
       queryData: [],
       name: [],
       count : 0,
       nameToShow: '',
       favoriteCount: [],
       popularOrLatest: 'popular',
       sortByFavorites: false,
       likes: [],
       caseSensitive: false
      }
    }
    handleChange = (event) => {
      this.setState(
        {tags: event.target.value,
        showPosts: false})
    }

    handleSubmit = (e) => {
       this.setState({tags: this.state.tags})
       if(!this.state.showPosts){
         this.setState({showPosts:true})
       }
       else{
        this.setState({showPosts:false})
       }
       this.setState({caseSensitive: false})
    }

    handleCaseSensitiveSubmit = (e) => {
      this.setState({tags: this.state.tags})
      if(!this.state.showPosts){
        this.setState({showPosts:true})
      }
      else{
       this.setState({showPosts:false})
      }
      this.setState({caseSensitive: true})
   }

    handleClear = (e) => {
      this.setState({    
        tags: '',
        showPosts: false,
        queryData: [],
        name: [],
        count : 0,
        nameToShow: '',
        favoriteCount: [],
        caseSensitive: false
       })
    }
    

    addToQueryData = (data, name, length, favoriteCount, likes) => {
      this.setState({
        queryData: this.state.queryData.concat(data),
        name: this.state.name.concat(name), 
        count: length,
        showPosts: false,
        favoriteCount: this.state.favoriteCount.concat(favoriteCount),
        likes: this.state.likes.concat(likes)
      })
    }
  
    showResults = () => {
      return(
        <div>
         <span>{this.state.queryData.map((i, index) =>  <p className = "results"> <div key = {i} className = {`results-${i.includes('RT') ? 'rt' : 'normal'}`}>{index+1 + " : " + i} <p className = "favorites">Favorites: {this.state.favoriteCount[index]}  </p></div> <p className= "name" key = {index}> {this.state.name[index]}....Followers: {(this.state.likes[index])}</p> </p>)} </span>
         <br />
         <span> The Count is: {this.state.count} </span>
        </div>
      )
    }

    updatePopularOrLatest = (popularOrLatest) => {
      this.setState({ popularOrLatest })
    }

    sortByFavorites = () => {
      this.setState({sortByFavorites : (!this.state.sortByFavorites ? true : false)})
    }

    

  render() {
    return (
      
    <div className = 'wrapper'>
      <div className = "main-title">
        <h1>Medium-Scraper</h1>
      </div>
      <p> Please Enter your tags </p>
        <div className = "user-input">Search For: <input id="user-input-value" value = {this.state.tags} onChange = {this.handleChange}/> </div>
      <div className = "buttons">
        <button className = 'submit-button' onClick ={this.handleSubmit}>Submit</button>
        <button className = 'clear-button' onClick ={this.handleClear}>Clear</button>
        <button className = 'likes-button' onClick ={this.sortByFavorites}>Sort By Likes</button>
      </div>  
      <PopularLatestToggle onChange={this.updatePopularOrLatest} popularOrLatest={this.state.popularOrLatest} />
      <MediumScraper tags={this.state.tags} showPosts={this.state.showPosts} sortByFavorites = {this.state.sortByFavorites} queryData={this.addToQueryData} popularOrLatest={this.state.popularOrLatest} caseSensitive = {this.state.caseSensitive} />
         {this.showResults()}
    </div>
    );  
  }
}

export default App;


