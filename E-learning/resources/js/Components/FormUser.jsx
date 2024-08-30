import { Link, useForm } from "@inertiajs/react";
import InputError from "./InputError";
import InputLabel from "./InputLabel";
import TextInput from "./TextInput";
import SelectInput from "./SelectInput";
import { Related } from "./Related";


export default function FormUser({user = {}, msg = null, fillieres, related_fillieres = null}){
    // console.log(user.length)
    const {data, setData, post, put, errors, reset} = useForm({
        name: user.name || '',
        email: user.email || '',
        fillieres: related_fillieres || '',
        password: '',
        password_confirmation: '',
        address: user.address || '',
        role: user.role || '',
        profil_image: '',
        _method: user.id ? 'PUT' : 'POST'
    })

    const handleSubmit = e => {
        e.preventDefault()
    // console.log(data)
        if(user.id)
            post(route('dashboarduser.update', user.id))

        
        else
            post(route('dashboarduser.store'))
        // user.id ?  : 
        // href={user.length ? route('user.update') : route('user.create')}       

    }

    // console.log(data)

    return(
        <form className="p-4 rounded-md">

            {
                msg.success &&
                <div className="p-3 bg-teal-800 font-bold text-gray-800 mb-3">{msg.success}</div>
            }

            {
                user.profil_image && <img src={user.profil_image} alt="Profil Utilisateur" className="h-80 object-cover mb-3"/>
            }
            
            <div className="flex gap-3">

                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor= 'name' value={'Full Name'} />
                    <TextInput 
                        id = 'name'
                        name = 'name'
                        value = {data.name}
                        isFocused = {true}
                        onChange= {e=> setData('name', e.target.value)} 
                    />
                    <InputError message={errors.name}/>
                </div>
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor= 'email' value={'Email'} />
                    <TextInput 
                        type = 'email'
                        id = 'email'
                        name = 'email'
                        value = {data.email}
                        onChange= {e=> setData('email', e.target.value)} 
                    />
                    <InputError message={errors.email}/>
                </div>
            </div>

            
            <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor = 'password' value={'Password'}/>
                    <TextInput
                        id = 'password'
                        type = 'password'
                        name = 'password'
                        className = 'text-white'
                        value = {data.password}
                        onChange= {e=> setData('password', e.target.value)} 
                    />
                    
                    <InputError message={errors.password}/>
                </div>
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor = 'password_confirmation' value={'Password Confirmation'}/>
                    <TextInput
                        id = 'password_confirmation'
                        type = 'password'
                        name = 'password_confirmation'
                        className = 'text-white'
                        value = {data.password_confirmation}
                        onChange= {e=> setData('password_confirmation', e.target.value)} 
                    />
                    
                    <InputError message={errors.password_confirmation}/>
                </div>
            </div>

            <div className="flex gap-3">
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor = 'address' value={'Address'}/>
                    <TextInput
                        id = 'address'
                        name = 'address'
                        className = 'text-white'
                        value = {data.address}
                        onChange= {e=> setData('address', e.target.value)} 
                    />
                    
                    <InputError message={errors.address}/>
                </div>
                <div className="flex-1 flex flex-col gap-2 mb-4">
                    <InputLabel htmlFor = 'role' value={'Role'}/>
                    <SelectInput
                        id = 'role'
                        name = 'role'
                        value = {data.role}
                        className='w-full'
                        onChange= {e=> setData('role', e.target.value)} 
                    >
                        <option value="">Select role</option>
                        <option value="admin">Admin</option>
                        <option value="etudiant">Etudiant</option>
                        <option value="professeur">Professor</option>
                    </SelectInput>
                    <InputError message={errors.role}/>
                </div>
            </div>

            <div className="flex flex-col gap-2 mb-4">
                <InputLabel htmlFor = 'profil_image' value={'Image du profil'}/>
                <TextInput
                    id = 'profil_image'
                    type = 'file'
                    name = 'profil_image'
                    className = 'text-white'
                    // value = {data.profil_image}
                    onChange= {e=> setData('profil_image', e.target.files[0])} 
                />
                
                <InputError message={errors.profil_image}/>
            </div>

            <Related
                    data={data.fillieres}
                    name='fillieres'
                    related_data={fillieres}
                    setData={setData}
                    errors={errors.fillieres}
                />
            

            <div className="flex gap-3 justify-end">
                
                <Link
                    onClick={e=> handleSubmit(e)}
                    // href={route('user.store')}
                    className="bg-teal-600 text-gray-800 font-semibold px-2 py-1 rounded-md"
                >
                    {user.id ? 'Update' : 'Create'} 
                </Link>
            </div>
        </form>
    )
}