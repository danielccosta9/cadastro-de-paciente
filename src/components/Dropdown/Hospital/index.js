import { useEffect, useState } from "react";
import { fetchHospitais } from "utils/api";

const DropdownHospital = ({onChange = () => {} }) => {

    const [states, setStates] = useState([]);

    useEffect(() => {
        fetchHospitais().then((states) => {
            setStates(states);
        });
    }, [])

    
    return (
        <select id='hospital' name="hospital_id" onChange={onChange} className='formSelect'>
            <option value="">Selecione o Hospital...</option>
            {states.map((hospital) => {
                const { hospital_id, hospital_nome } = hospital;
                return (
                    <option key={hospital_id} value={hospital_id}> {hospital_nome}</option>
                )
            })}
        </select>
    )
}

export default DropdownHospital;