/* eslint-disable @typescript-eslint/explicit-member-accessibility */
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
          <div >
            <div className={styles.dateNewsContainer} >
            <Moment className={styles.dateNews} format="DD">
              {this.props.listItemNews.comment.dateSubmitted}
            </Moment>
            <Moment className={styles.dateNews} format="MMM">
              {this.props.listItemNews.comment.dateSubmitted}
            </Moment>

            <Moment className={styles.dateNews} format="YYYY">
              {this.props.listItemNews.comment.dateSubmitted}
            </Moment>
            </div>
          </div>
          <br/>
          
          <div>
          
            <h1 className={styles.titleNews}>
              {this.props.listItemNews.comment.title}
            </h1>
            <h4 className={styles.subtitleNews} >
              {this.props.listItemNews.comment.commentText}
            </h4>

          </div>
        </div>


      </div>

    );
  }
}