import { ChangeEvent} from "react"

export default function FormField({
    id,label,type="text",value,onChange,placeholder,as="input", options
}:{
    id:string,
    label : string,
    type?:string,
    value:string,
    as?:string,
    onChange : (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>void
    placeholder? : string,
    options? : {label:string,value:string}[]
}){
    return(
        <div className="form-field">
            <label htmlFor={id}>{label}</label>
            {as==="input"?
            <input type={type} name={id} placeholder={placeholder} value={value} onChange={onChange}/>:
            as==="textarea"?
            <textarea placeholder={placeholder} cols={50} name={id} value={value} onChange={onChange}/>
            :<select name={id} >
                {
                    options?.map((o)=><option key={o.value} value={o.value}>{o.label}</option>)
                }
            </select>
        }
        </div>
    )
}