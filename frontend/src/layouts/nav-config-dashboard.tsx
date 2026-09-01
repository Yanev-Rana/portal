import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} />
);

export type NavItem = {
  title: string;
  path: string;
  icon: React.ReactNode;
  info?: React.ReactNode;
};

export const navData = (role: 'user' | 'admin'): NavItem[] => {
  if (role === 'admin') {
    return [
      {
        title: 'Admin Dashboard',
        path: '/admin',
        icon: icon('ic-analytics'),
      },
      {
        title: 'User Management',
        path: '/user',
        icon: icon('ic-user'),
      },
      {
        title: 'Product',
        path: '/products',
        icon: icon('ic-cart'),
        info: (
          <Label color="error" variant="inverted">
            +3
          </Label>
        ),
      },
      {
        title: 'Blog',
        path: '/blog',
        icon: icon('ic-blog'),
      },
    ];
  }

  return [
    {
      title: 'User Dashboard',
      path: '/user',
      icon: icon('ic-analytics'),
    },
    {
      title: 'My Profile',
      path: '/user',
      icon: icon('ic-user'),
    },
  ];
};