import React, { Component } from 'react';

const loadImage = () => {
  return fetch('https://www.reddit.com/r/programmerhumor/hot/.json?raw_json=1').then(data => data.json())
}

class App extends Component {
  state = {posts: []}
  
  createPosts = (posts) => {
    return posts.map(post => {
      const item = post.data
      return {
        type: item.preview? 'image': 'text', 
        content: item.preview? this.selectImage(item.preview.images[0]): item.selftext_html, 
        id: item.id, 
        title: item.title
      }
    })
  }

  selectImage = (image) => (
    image.variants.gif? image.variants.gif.source: image.source
  )
  
  fillState = () => {
    loadImage().then(data => {
      const posts = this.createPosts(data.data.children.filter(post => !post.data.stickied))
      this.setState({posts: this.state.posts.concat(posts)})
    })
  }
  
  
  nextSlide = () => {
    clearInterval(this.interval)
    
    if (this.state.posts.length > 5){
       this.setState({posts: this.state.posts.slice(1)}) 
    } else {
      this.fillState()   
    }
    
    this.setupInterval()
  }
  
  setupInterval = () => {
    this.interval = setInterval(() => {
      this.nextSlide()
    }, 20000)
  }
  
  generateView = () => {
    const nextButton = (<button id='next-button' onClick={this.nextSlide}>next</button>)
    
    if(this.state.posts.length > 0){
      
      const post = this.state.posts[0]

      if (post.type === 'image'){
        return (
          <div>
            <h2>{post.title}</h2>
            {nextButton}            
            <div id='image-container'>
              <img src={post.content.url} height={Math.min(post.content.height, 460)} alt={post.title}/>
            </div>
          </div>
        )
      }
      else {
        return (        
         <div>
          <h2>{post.title}</h2>
          {nextButton}
          <div id='text-container' dangerouslySetInnerHTML={{__html: 
        post.content}}></div>         
         </div>
        )
      }
    } else {
      return <div></div>
    }  
  }
  
  componentDidMount(){
    this.fillState()
    this.setupInterval()
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render(){
    return this.generateView()
  }
}


export default App;
