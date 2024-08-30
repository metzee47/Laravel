import FormMessage from '@/Components/FormMessage';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Body from '@/Layouts/Body';
import { Head } from '@inertiajs/react';

export default function Create({ auth, instructors, fillieres, students }) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 dark:text-gray-200 leading-tight my-3">Nouveau message</h2>}
            // msg={msg}
        >
            <Head title="Dashboard"/>

            <Body
            >
                <FormMessage 
                    instructors={instructors.data} 
                    students={students.data} 
                    fillieres={fillieres.data}
                />
            </Body>
        </AuthenticatedLayout>
    );
}
