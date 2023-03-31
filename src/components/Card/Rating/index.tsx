import React from 'react';
import './style.scss';

export interface RatingPropsType {
  value: number;
}

export class Rating extends React.Component<RatingPropsType> {
  static NumOfStars = 5;

  private getStarStyle(colorStop: number) {
    if (colorStop === 100) return {};
    const colorStopOut = `${colorStop}%`;
    return {
      background: `linear-gradient(90deg, #ffa500 ${colorStopOut}, #ffffff ${colorStopOut})`,
    };
  }

  private renderStars(rating: number) {
    const starColorStops = Array(Rating.NumOfStars)
      .fill(0)
      .map((_, i) => {
        if (i + 1 <= rating) return 100;
        const colorStop = Math.trunc((1 - (i + 1 - rating)) * 100);
        return colorStop < 0 ? 0 : colorStop;
      });
    return starColorStops.map((colorStop, index) => (
      <span className="product-rating__star" key={index} role="star">
        <span className="product-rating__star-inner" style={this.getStarStyle(colorStop)}></span>
      </span>
    ));
  }

  render() {
    const { value } = this.props;
    return (
      <div className="product-rating">
        <span className="product-rating__stars" title={`rating ${String(value)}`}>
          {this.renderStars(value)}
        </span>
      </div>
    );
  }
}
