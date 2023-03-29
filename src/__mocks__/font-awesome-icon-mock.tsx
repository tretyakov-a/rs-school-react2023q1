jest.mock('@fortawesome/react-fontawesome', () => {
  return {
    FontAwesomeIcon: () => <div data-testid="faicon-testid"></div>,
  };
});
