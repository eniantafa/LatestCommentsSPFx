import * as React from "react";
import { ICommentProps } from "./ICommentProps";
import styles from "./Comment.module.scss";
// import { sp } from "@pnp/sp/presets/all";
import $ from "jquery";
import Moment from "react-moment";
import { CommentFilled } from "@fluentui/react-icons";
import * as moment from "moment";

export default class Comment extends React.Component<
  ICommentProps,
  {
    open: boolean;
  }
> {
  constructor(props) {
    super(props);
    this.state = { open: false };
  }



  public render(): React.ReactElement<ICommentProps> {

    return (
      <div className={styles.itemNewsContainer}>
        <div className={styles.itemNews}>
          <div style={{position: 'relative', paddingRight: '75px'}}>
            <div className={styles.dateNewsContainer} style={{paddingBottom: '15px'}} >
            <Moment className={styles.dateNews} format="DD">
              {this.props.listItemNews.response.dateSubmitted}
            </Moment>
            <Moment className={styles.dateNews} format="MMM">
              {this.props.listItemNews.response.dateSubmitted}
            </Moment>

            <Moment className={styles.dateNews} format="YYYY">
              {this.props.listItemNews.response.dateSubmitted}
            </Moment>
            </div>
          </div>
          
          
          <div>
            <div style={{position: 'fixed', display: 'absolute', paddingLeft: '370px', paddingTop: '9px'}}>
            <CommentFilled style={{color: '#f6a737', width: '45px', height: '45px'}}/>
          </div>
            <h1 className={styles.titleNews} style={{display: 'absolute'}}>
              {this.props.listItemNews.comment.title}
            </h1>
            <h4 className={styles.subtitleNews} >
              {this.props.listItemNews.response.commentText}
            </h4>

          </div>
        </div>


      </div>

    );
  }
}