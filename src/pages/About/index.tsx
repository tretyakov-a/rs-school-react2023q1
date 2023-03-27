import './style.scss';
import PageWrap from '@components/PageWrap';

const About = () => {
  return (
    <PageWrap className="about">
      <ul>
        <li>
          <a href="https://github.com/rolling-scopes-school/tasks/tree/master/react/modules/module01">
            React.Components
          </a>
        </li>
        <li>
          <a href="https://github.com/rolling-scopes-school/tasks/tree/master/react/modules/module02">
            React.Forms
          </a>
        </li>
      </ul>
    </PageWrap>
  );
};

export default About;
