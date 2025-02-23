import { Link } from 'react-router-dom';

export function Header () {
    return(
        <>
             <header className="p-4 bg-gray-800 text-white">
                <nav>
                    <Link to="/" className="px-4">Dashboard</Link>
                </nav>
            </header>
        </>
    )
}