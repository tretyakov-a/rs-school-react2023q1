export const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/forms', label: 'Forms' },
];

export const getLabel = (pathname: string) => {
  return links.find(({ to }) => to === pathname)?.label || '404';
};
