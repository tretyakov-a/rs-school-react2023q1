export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/registration', label: 'Registration' },
];

export const getLink = () => {
  return links.find(({ to }) => to === window.location.pathname) || { label: '404' };
};
