import { Link } from "@inertiajs/react"

export default function Pagination({links}){
    return <nav className="mt-4 text-center">
            {links.map(link=>
                <Link
                    key={link.label}
                    href={link.url}
                    className={"inline-block px-3 py-2 mx-1 rounded-lg text-gray-200 text-xs " + (link.active ? "bg-gray-950 " : ' ') + (link.url ? 'hover:bg-gray-950' : 'cursor-not-allowed !bg-gray-500')}
                    dangerouslySetInnerHTML={{__html: link.label}}
                    >
                    
                    
                </Link>
            )}
        </nav>
    
}