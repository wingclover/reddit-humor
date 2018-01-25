import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CSSTransition } from 'react-transition-group';

import * as util from '../../utils';

const styles = theme => ({
  post: {
    margin: 5,
    padding: 20,
    height: '100%',
    position: 'relative',
  },
  paper: {
    padding: 20,
    height: '100%',
    boxShadow: '0px 0px 83px -8px rgba(0,0,0,0.75)',
    borderRadius: '5px 5px 5px 5px'
  },
  title: {
    margin: 5,
    padding: '10px 20px',
    height: '6%'
  },
  content: {
    marginTop: 15,
    padding: 20,
    height: '90%',
    overflow: 'hidden'
  },
  btns: {
    display: 'flex',
    flexDirection: 'column',
    position: 'absolute',
    right: 50,
    top: '45%'
  }
})

let scrollIntervalId, setTimeoutIdToTop, setTimeoutIdToBottom;

class Post extends Component {

  mediaEl = null;

  handleClickNext = () => {
    this.props.onClickNext();
  }

  handleClickNSFW = () => {
    this.props.onClickNSFW(this.props.post.data.id);
  }

  scrollToBottom = () => {
    scrollIntervalId = setInterval(() => {
      let prevScrollTop = this.mediaEl.scrollTop;
      this.mediaEl.scrollTop += 1;
      if(this.mediaEl.scrollTop === prevScrollTop) {
        clearInterval(scrollIntervalId);
        setTimeoutIdToTop = setTimeout(this.scrollToTop, 2000);
      }
    }, 20)
  }

  scrollToTop = () => {
    scrollIntervalId = setInterval(() => {
      this.mediaEl.scrollTop -= 1;
      if(this.mediaEl.scrollTop === 0) {
        clearInterval(scrollIntervalId);
        setTimeoutIdToBottom = setTimeout(this.scrollToBottom, 2000);
      }
    }, 20)
  }

  setImageStyles = (image) => {
    let h, w

    if(this.mediaEl){
      if (image.height * 0.7 > image.width && image.height > this.mediaEl.clientHeight * 0.9 * 1.5){
        w = Math.min(image.width, this.mediaEl.clientWidth * 0.9)
      } else {
        h = Math.min(image.height, this.mediaEl.clientHeight * 0.9)
      }
    }

    return {
      margin: 2,
      height: h, 
      width: w,
      borderRadius: 2 
    }
  }

  handleClickFullScreen = () => {
    document.documentElement.webkitRequestFullscreen()
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillReceiveProps(nextProps) {
    clearInterval(scrollIntervalId);
    if(setTimeoutIdToTop) clearTimeout(setTimeoutIdToTop);
    if(setTimeoutIdToBottom) clearTimeout(setTimeoutIdToBottom);
    this.scrollToBottom();
  }

  render() {
    const classes = this.props.classes;
    const postData = this.props.post.data;
    const media = postData.preview? util.isGIF(postData.preview.images[0]): undefined;
    
    return (
        <CSSTransition
          timeout={1000}
          classNames='fade'
          in={this.props.in}
          appear={true}
        >
          <div className={classes.post} key={postData.id}>
            <div className={classes.paper}>
              <Typography type='title' className={classes.title}>{postData.title}</Typography>
              <div className={classes.content} ref={e => this.mediaEl = e}>
                {media && 
                  <img 
                    style={this.setImageStyles(media)} 
                    key={media.url} 
                    src={media.url} 
                    alt='lol' 
                  />
                }
                {postData.selftext_html && <div dangerouslySetInnerHTML={{__html: postData.selftext_html}}></div>}
              </div>             
            </div>
            <div className={classes.btns}>
              <Button raised onClick={this.handleClickNext}>NEXT</Button>
              <Button raised style={{marginTop: 15}} onClick={this.handleClickNSFW}>NSFW?</Button>
              <Button raised style={{marginTop: 15, display: document.webkitIsFullScreen? 'none': 'block'}} onClick={this.handleClickFullScreen}>FullScreen</Button>
            </div>   
          </div>
        </CSSTransition>         
    )
  }
} 

export default withStyles(styles)(Post);