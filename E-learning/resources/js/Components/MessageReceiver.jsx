import InputError from "./InputError"
import { Related } from "./Related"
import SelectInput from "./SelectInput"

export default function MessageReceiver(
    {receiver, fillieres, students, instructors, setData, data, errors}){

    const render = () =>{
        switch(receiver){
            case 'fillieres':
                return(
                    
                    <Related
                        data={data.sent_to}
                        name='sent_to'
                        related_data={fillieres}
                        setData={setData}
                        errors={errors}
                    />
                )
            case 'etudiants':
                return(
                    
                    <Related
                        data={data.sent_to}
                        name='sent_to'
                        related_data={students}
                        setData={setData}
                        errors={errors}
                    />
                )
            case 'professeurs':
                return(
                    
                    <Related
                        data={data.sent_to}
                        name='sent_to'
                        related_data={instructors}
                        setData={setData}
                        errors={errors}
                    />
                )
            case 'professeur':
                return(
                    <>
                        <SelectInput
                            id = 'sent_to'
                            name = 'sent_to'
                            value = {data.sent_to}
                            className='w-full'
                            onChange= {e=> setData('sent_to', [...data.sent_to, e.target.value])}
                        >
                            <option value="">Select instructor</option>
                            {
                                instructors.map(instructor=>
                                    <option key={instructor.id} value={instructor.id}>{instructor.name}</option>
                                )
                            }
                        </SelectInput>
                        <InputError message={errors}/>
                    </>

                )
            case 'etudiant':
                return(
                    <>
                        <SelectInput
                            id = 'sent_to'
                            name = 'sent_to'
                            value = {data.sent_to}
                            className='w-full'
                            onChange= {e=> setData('sent_to', [...data.sent_to, e.target.value])}
                        >
                            <option value="">Select student</option>
                            {
                                students.map(student=>
                                    <option key={student.id} value={student.id}>{student.name}</option>
                                )
                            }
                        </SelectInput>
                        <InputError message={errors}/>
                    </>

                )
            default:
                return null;
        }
    }
    return(
        <div className=" flex flex-col gap-2 mb-4">
            {render()}
        </div>
    )
}