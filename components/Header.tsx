import Link from 'next/link';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white">
      <nav className="container mx-auto flex items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold">
          BeeStrong
        </Link>
        <ul className="flex space-x-4">
          <li>
            <Link href="/mentor-registration" className="hover:underline">
              Become a Mentor
            </Link>
          </li>
          <li>
            <Link href="/mentee-registration" className="hover:underline">
              Become a Mentee
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
