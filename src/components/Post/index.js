import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

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

let scrollIntervalId;

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
      // console.log(this.mediaEl.scrollTop, 'SB');

      const prevScrollTop = this.mediaEl.scrollTop;
      this.mediaEl.scrollTop += 1;
      // console.log(this.mediaEl.scrollTop, 'SBI');
      if(this.mediaEl.scrollTop === prevScrollTop) {
        clearInterval(scrollIntervalId);
        setTimeout(this.scrollToTop, 2000);
      }
    }, 500)
  }

  scrollToTop = () => {
    scrollIntervalId = setInterval(() => {
      // console.log(this.mediaEl.scrollTop, 'ST')
      this.mediaEl.scrollTop -= 1;
      // console.log(this.mediaEl.scrollTop, 'SBD');

      if(this.mediaEl.scrollTop === 0) {
        clearInterval(scrollIntervalId);
        setTimeout(this.scrollToBottom, 2000);
      }
    }, 500)
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentWillUpdate(nextProps) {
    clearInterval(scrollIntervalId);
    console.log('updated');
    this.scrollToBottom();
  }

  render() {
    const classes = this.props.classes;
    const postData = this.props.post.data;
    const media = postData.preview? util.isGIF(postData.preview.images[0]): undefined;
    
    return (
        <div className={classes.post} key={postData.id}>
          <div className={classes.paper}>
            <Typography type='title' className={classes.title}>{postData.title}</Typography>
            <div className={classes.content} ref={e => this.mediaEl = e}>
              {media && 
                <img 
                  style={{
                    height: media.height, 
                    width: media.width, 
                    maxWidth: '90%', 
                    borderRadius: 2 
                  }} 
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
          </div>   
        </div>
    )
  }
} 

export default withStyles(styles)(Post);