import Link from 'next/link';
import Nav from '@/app/ui/admin/nav';
import './sleeve.css';

export default function Sleeve() {
  return (
    <div className="sleeve-container">
      <div className="sleeve-header"></div>
      <div className="sleeve-nav">
        <Nav />
        <div className="sleeve-spacer"></div>
      </div>
    </div>
  );
}
