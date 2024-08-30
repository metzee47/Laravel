import InputError from "./InputError";
import InputLabel from "./InputLabel";
import SelectInput from "./SelectInput";

export function Related({data, name, related_data, setData, errors}){

    const label = name.charAt(0).toUpperCase() + name.slice(1) 
    const Add = (e, data) =>{
        if(!data.includes(e.target.value))
            setData(name, [...data, e.target.value]);
       
    }

    const find = id =>{
        return related_data.filter(data => data.id == id)
    }

    const remove = (id, data )=>{
        const related_data = data.filter(d => d != id)
        
        setData(name, related_data);

    }

    return (
        <div className="flex-1 flex flex-col gap-2 mb-4">
            {
                        
            data.length > 0 &&
            <>
                <InputLabel value={`Related ${label}`}/>

                <div className="flex flex-wrap gap-x-28 gap-y-3 mb-4">
                    {
                        data.map(d => 
                            <div key={d} className="px-3 py-1 rounded-sm bg-slate-700 relative hover:cursor-pointer">
                                <span className="text-sm font-bold">{find(d)[0].name}</span>
                                <span onClick={e => remove(d, data)} className="bg-red-500 p-2 font-bold absolute -top-2 rounded-xl text-xs hover:bg-red-900 duration-150">remove</span>
                            </div>
                        )
                    }
                </div>
            

            </>

            }
            <InputLabel htmlFor = {name} value={`New ${label}`}/>

            <SelectInput
                id = {name}
                name = '{name}[]'
                multiple
                // value = {data}
                className='w-full'
                onChange= {e=> Add(e, data)}
            >
                {
                    related_data.map(data => <option className={`my-1 text-sm p-1 `} key={data.id} value={data.id}>{data.name}</option>)
                }
            </SelectInput>
            <InputError message={errors}/>
        </div>
    )
}