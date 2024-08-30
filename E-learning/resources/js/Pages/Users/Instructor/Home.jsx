import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import Body from "@/Layouts/Body";
import { Head } from "@inertiajs/react";

export default function Home({auth, msg}){
    return (
        <AuthenticatedLayout
            user={auth.user}
           
        >
            <Head title={`Student | ${auth.user.name}`}  />


            <Body msg={msg.warning}>
                I am Professor Men
            </Body>
        </AuthenticatedLayout>
    )
}