import React from 'react';
import './style.scss';

interface PageWrapProps extends React.PropsWithChildren {
  className: string;
}

const PageWrap = (props: PageWrapProps) => {
  const { className, children } = props;
  const mainClasses = ['page', className];
  const containerClasses = ['container', `${className}__container`];
  return (
    <main className={mainClasses.join(' ')}>
      <div className={containerClasses.join(' ')}>{children}</div>
    </main>
  );
};

export default PageWrap;
