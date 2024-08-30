import Dropdown from "./Dropdown";
import NavLink from "./NavLink";

export default function InstructorNav(){

    
    return (
        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink href={route('instructor.home')} active={route().current('instructor.home')}>
                Planning
            </NavLink>
            <NavLink href={route('instructor.assessment.index')} active={route().current('instructor.assessment.index')}>
                Devoirs
            </NavLink>
            
            <NavLink href={route('instructor.course.index')} active={route().current('instructor.course.index')}>
                Mes Cours
            </NavLink>
            <NavLink href={route('instructor.message.index')} active={route().current('instructor.message.index')}>
                Messages
            </NavLink>
        </div>
    )
}