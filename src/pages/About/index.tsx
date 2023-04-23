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
        <li>
          <a href="https://github.com/rolling-scopes-school/tasks/tree/master/react/modules/module03">
            React.Hooks
          </a>
        </li>
        <li>
          <a href="https://github.com/rolling-scopes-school/tasks/tree/master/react/modules/module04">
            React.API
          </a>
        </li>
        <li>
          <a href="https://github.com/rolling-scopes-school/tasks/tree/master/react/modules/module05">
            React.Redux
          </a>
        </li>
      </ul>
    </PageWrap>
  );
};

export default About;
