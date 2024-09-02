'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './nav.css';

// Map of links to display in the side navigation.
const links = [
  { name: 'Admin', href: '/admin' },
  { name: 'Data', href: '/data'},
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`link ${pathname === link.href ? ' active' : ''}`}
          >
            <span className="link-text">{link.name}</span>
          </Link>
        );
      })}
    </>
  );
}
