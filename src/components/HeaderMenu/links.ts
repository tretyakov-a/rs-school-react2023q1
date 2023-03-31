export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/forms', label: 'Forms' },
];

export const getLink = () => {
  return links.find(({ to }) => to === window.location.pathname) || { label: '404' };
};
