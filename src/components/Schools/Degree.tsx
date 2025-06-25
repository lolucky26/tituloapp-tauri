
import SchoolsDegreeForm from './DegreeForm.tsx';
import SchoolsDegreeTable from './DegreeTable.tsx';
import Loading from '../Loading.tsx';
import {EditDegreeForm, DeleteDegreeForm,DegreeType} from '../../types';
import {getDegrees,insertDegree,deleteDegree} from '../../api.ts';
import { FormikHelpers} from 'formik';
import { useState, useEffect} from 'react';

interface Props {
    showPopupMessage: (title:string,body:string) => void;
}

function SchoolsDegree ({showPopupMessage}: Props): JSX.Element | null {

    let [degrees, setDegrees] = useState<DegreeType[]>([{
        id: '',
        clave: '',
        rvoe: '',
        nombre: '',
    }]);
    let [isLoading, setIsLoading] = useState<boolean>(false);
    useEffect(() => {
        getDegrees().then(currDegrees => setDegrees(currDegrees));
    }, []);

    const submitFormDegree = async (values:EditDegreeForm, _formikBag:FormikHelpers<EditDegreeForm>) => {
        setIsLoading(true);
        insertDegree(
            values.nombre,
            values.rvoe,
            values.clave).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Registro agregado con éxito.");
            }else{
                showPopupMessage("Error", result);
            }
            getDegrees().then(currDegrees => setDegrees(currDegrees));
        }).finally(()=>setIsLoading(false));
    }

    const submitFormDeleteDegree = async (values: DeleteDegreeForm, _formikBag: FormikHelpers<DeleteDegreeForm>) => {
        setIsLoading(true);
        deleteDegree(Number(values.degreeID)).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Registro eliminado con éxito.");
            }else{
                showPopupMessage("Error", result);
            }
            getDegrees().then(currDegrees => setDegrees(currDegrees));
        }).finally(()=>setIsLoading(false));
    }

    
    return (
        <>
        <Loading isVisible={isLoading}/>
        <SchoolsDegreeForm submitFormDegree = {submitFormDegree} />
        <hr></hr>
        <SchoolsDegreeTable degrees = {degrees} submitFormDeleteDegree = {submitFormDeleteDegree}/>
        </>
    )
}
export default SchoolsDegree