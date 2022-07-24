/* eslint-disable @typescript-eslint/explicit-member-accessibility */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/typedef */
/* eslint-disable no-var */
import * as React from 'react';
//import styles from './LatestComments.module.scss';
import { ILatestCommentsProps } from './ILatestCommentsProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { ILatestCommentsState } from "./ILatestCommentsState";
import { ListItem } from "../../services/ListItem";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { DefaultButton } from "@fluentui/react";

import Comment from "./Comment/Comment";
import styles from "./Comment/Comment.module.scss";
export default class LatestComments extends React.Component<ILatestCommentsProps, ILatestCommentsState> {

  constructor(props: ILatestCommentsProps) {
    super(props);
    this.state = {
      listItems: [],
      noslides: 0,
    };
  }


  public componentDidMount(): void {
    console.log(this.props.slideNumber)
    console.log(this.props.itemNumber)
    console.log(this.props.slideTimer)

    this.props.listService.getAll()
      //.then((res) => res.json())
      .then((json) => {
        this.setState({
          listItems: json.comments.slice(0, this.props.itemNumber)
        });
        console.log(json);
        console.log(json.comments.slice(0, this.props.itemNumber));

      })
  };


  public render(): React.ReactElement<ILatestCommentsProps> {
    const {
      description,
      isDarkTheme,
      environmentMessage,
      hasTeamsContext,
      userDisplayName
    } = this.props;



    var slidersettings = {
      dots: false,
      // initialSlide: firstSlide,
      arrows: true,
      infinite: true,
      speed: this.props.slideTimer,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className={styles.breakingNews}>
        <div className={styles.container}>
         <div className={styles.webpartName}>{this.props.webpartName}</div>
            <Slider className={styles.sliderNews} {...slidersettings}>
              {this.state.listItems.length &&
                this.state.listItems.map((listItemNews, i) => {
                  return (
                    <div key={i}>
                      <Comment listItemNews={listItemNews} key={i} />
                    </div>
                  );
                })}
            </Slider>
            <div className={styles.allReviewsButton}>
              <DefaultButton className={styles.buttonColor} href='https://www.nhs.uk/services/independent-provider/community-health-and-eyecare-limited/X93609/ratings-and-reviews'  type="button">
                See all reviews
              </DefaultButton>
            </div>
          
        </div>
      </div>
    );
  }
}
