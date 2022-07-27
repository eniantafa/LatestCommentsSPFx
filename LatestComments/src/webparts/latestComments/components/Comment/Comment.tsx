/* eslint-disable @typescript-eslint/explicit-member-accessibility */
import * as React from "react";
import { ICommentProps } from "./ICommentProps";
import styles from "./Comment.module.scss";
// import { sp } from "@pnp/sp/presets/all";
import $ from "jquery";
import Moment from "react-moment";
import { CommentFilled } from "@fluentui/react-icons";
import * as moment from "moment";
import ReactStars from "react-rating-stars-component";

export default class Comment extends React.Component<
  ICommentProps,
  {
    open: boolean;
    ratingoverall: number;
  }
> {
  constructor(props) {
    super(props);
    this.state = { open: false, ratingoverall: 0 };
  }

  componentDidMount(): void {

    console.log((this.props.listItemNews.comment.ratings.reduce((a, v) => a = a + v.rating, 0)))

    this.setState({
      ratingoverall: (this.props.listItemNews.comment.ratings.reduce((a, v) => a = a + v.rating, 0))
    });
    console.log(this.state.ratingoverall)

  }

  public render(): React.ReactElement<ICommentProps> {
    const ratingprops = {
      size: 30,
      value: (this.props.listItemNews.comment.ratings.reduce((a, v) => a = a + v.rating, 0)) / (this.props.listItemNews.comment.ratings.length),
      edit: false,
      // activeColor="#ffd700"
    };
    return (
      <div className={styles.itemNewsContainer}>
        <div className={styles.itemNews}>

          <div >  
            {/* <div>{(this.props.listItemNews.comment.ratings.reduce((a,v) =>  a = a + v.rating , 0 ))/(this.props.listItemNews.comment.ratings.length)}</div> */}
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
          <br />
          <div className={styles.screenName} > {this.props.listItemNews.comment.screenName}</div>

          <div className={styles.rating} > <ReactStars activeColor="#217bac" {...ratingprops} /> <div  className={styles.outoftext}> &nbsp; out of 5</div></div>

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