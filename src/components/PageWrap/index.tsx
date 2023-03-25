import React from 'react';
import './style.scss';

interface PageWrapProps extends React.PropsWithChildren {
  className: string;
}

export default class PageWrap extends React.Component<PageWrapProps> {
  render() {
    const { className, children } = this.props;
    const mainClasses = ['page', className];
    const containerClasses = ['container', `${className}__container`];
    return (
      <main className={mainClasses.join(' ')}>
        <div className={containerClasses.join(' ')}>{children}</div>
      </main>
    );
  }
}
