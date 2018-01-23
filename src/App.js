import React, { Component } from 'react';
import './App.css';
import 'whatwg-fetch';
import Post from './components/Post';

const fetchPosts = url => fetch(url).then(res => res.json());

let postsIntervalId;
const NSFWPOSTS = {};

class App extends Component {

  state = {
    posts: [],
    currentPost: undefined
  }

  initPosts = async () => {
    const posts = await fetchPosts('https://www.reddit.com/r/programmerhumor/hot/.json?raw_json=1')
                        .then(data => data.data.children.filter(post => !post.data.stickied && !NSFWPOSTS[post.data.id]));
    this.setState({posts, currentPost: 0}, () => {
      postsIntervalId = setInterval(() => {
        this.updatePost()
      }, 15000)
    })
  }

  updatePost = () => {
    clearInterval(postsIntervalId);
    if(this.state.currentPost === this.state.posts.length - 1) {     
      this.initPosts();
    } 
    else {
      this.setState(prevState => ({currentPost: ++prevState.currentPost}), () => {
        postsIntervalId = setInterval(() => {
          this.updatePost()
        }, 1500000)
      })
    }  
  }

  componentDidMount() {
      this.initPosts();
  }

  blackList = id => NSFWPOSTS[id] = true;

  render() {
    return (
      <div className="App" style={{height: window.innerHeight}}>
        {this.state.posts.length !== 0  && 
          <Post 
            post={this.state.posts[this.state.currentPost]} 
            onClickNext={this.updatePost} 
            onClickNSFW={this.blackList}
          />
        }
      </div>
    );
  }
}

export default App;
