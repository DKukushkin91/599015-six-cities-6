import React from 'react';
import ReviewProp from './review.prop';
import dayjs from "dayjs";
import {getRatingPercent} from "../../util";

const Review = ({comments}) => {
  const {comment, date, rating, user: {avatarUrl, name}} = comments;
  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img className="reviews__avatar user__avatar" src={avatarUrl} width={54} height={54} alt="Review avatar" />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${getRatingPercent(rating)}%`}} />
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime="2019-04-24">{`${dayjs(date).format(`MMMM YYYY`)}`}</time>
      </div>
    </li>
  );
};

Review.propTypes = {
  comments: ReviewProp
};

export default Review;
