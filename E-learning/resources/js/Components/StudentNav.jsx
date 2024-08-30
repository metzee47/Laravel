import NavLink from "./NavLink";

export default function StudentNav(){
    return (
        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink href={route('student.home')} active={route().current('student.home')}>
                Actualités
            </NavLink>
            <NavLink href={route('student.assessment.index')} active={route().current('student.assessment.index')}>
                Devoirs & Notes
            </NavLink>
            <NavLink href={route('student.course.index')} active={route().current('student.course.index')}>
                Cours
            </NavLink>
            <NavLink href={route('student.message.index')} active={route().current('student.message.index')}>
                Messages
            </NavLink>
        </div>
    )
}