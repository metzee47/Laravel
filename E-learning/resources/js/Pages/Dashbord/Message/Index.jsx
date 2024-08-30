import MessageTable from '@/Components/MessageTable';
import Pagination from '@/Components/Pagination';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import Body from '@/Layouts/Body';
import { Head, Link, router } from '@inertiajs/react';

export default function Index({ auth, msg, messages, params }) {
    const links = messages.meta.links


    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <div className="flex justify-between items-center px-5">
                    <h2 className="font-semibold text-xl shadow-inner shadow-black text-black dark:text-gray-200 leading-tight px-4 py-3 rounded-md w-fit">Tous mes messages</h2>
                    <Link
                        href={route('dashboardmessage.create')}
                        className="bg-teal-800 px-2 py-1 rounded-sm font-bold text-gray-800 hover:translate-x-2 duration-200">New Message</Link>
                </div>
            }
            // msg={msg}
        >
            <Head title="Dashboard"/>

            <Body
                msg={msg.warning}
            >

            {/* <pre>{JSON.stringify(messages.data, undefined, 2)}</pre> */}

            <div>

                {
                    msg?.danger &&
                        <div className="p-3 bg-red-800 font-bold text-gray-300 mb-3">{msg.danger}</div>
                }
                {
                    msg?.success &&
                        <div className="p-3 bg-teal-600 font-bold text-gray-800 mb-3">{msg.success}</div>
                }

                <MessageTable 
                    messages={messages.data} 
                    group_name={'dashboardmessage'} 
                    params={params}
                    user={auth.user}/>
            </div>

                {links.length > 3 && <Pagination links={links}></Pagination>}

            </Body>
        </AuthenticatedLayout>
    );
}
