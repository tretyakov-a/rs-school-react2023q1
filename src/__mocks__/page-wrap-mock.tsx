jest.mock('@components/PageWrap', () => (props: React.PropsWithChildren) => (
  <div data-testid="page-wrap-testid">{props.children}</div>
));
