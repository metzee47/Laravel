import Dropdown from "./Dropdown";
import NavLink from "./NavLink";

export default function DashbordNav(){
    return (
        <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
            <NavLink href={route('dashboard')} active={route().current('dashboard')}>
                Dashboard
            </NavLink>
            <NavLink href={route('dashboarduser.index')} active={route().current('dashboarduser.index')}>
                Users
            </NavLink>
            <NavLink href={route('dashboardcourse.index')} active={route().current('dashboardcourse.index')}>
                Courses
            </NavLink>
            <NavLink href={route('dashboardfilliere.index')} active={route().current('dashboardfilliere.index')}>
                Fillieres
            </NavLink>
            <NavLink href={route('dashboardmessage.index')} active={route().current('dashboardmessage.index')}>
                Messages                    
           </NavLink>
        </div>
    )
}