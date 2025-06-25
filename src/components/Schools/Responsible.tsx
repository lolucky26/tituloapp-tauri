
import SchoolsResponsibleForm from './ResponsibleForm.tsx';
import SchoolsResponsibleTable from './ResponsibleTable.tsx';
import Loading from '../Loading.tsx';
import { useState, useEffect } from 'react';
import {ResponsibleForm, DeleteResponsibleForm, ResponsibleType} from '../../types';
import {getResponsibles,insertResponsible,deleteResponsible} from '../../api.ts';
import {FormikHelpers} from 'formik';

interface Props {
    showPopupMessage: (title:string,body:string) => void;
}

function SchoolsResponsible ({showPopupMessage}: Props): JSX.Element | null {
    let [responsibles, setResponsibles] = useState<ResponsibleType[]>([{
            id: '',
            nombre: '',
            primerApellido: '',
            segundoApellido: '',
            curp: '',
            cargo: '',
            titulo: '',
            certificado: '',
            certificadoOriginal: '',
            clavePrivada: '',
            password: '',
            numeroCertificado: '',
            observaciones: '',
        }]);
    let [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getResponsibles().then(currResponsibles => setResponsibles(currResponsibles));
    }, []);

    const submitFormResponsible = async (values:ResponsibleForm, _formikBag:FormikHelpers<ResponsibleForm>) => {
        setIsLoading(true);
        insertResponsible(
            values.nombre,
            values.primerApellido,
            values.segundoApellido,
            values.curp,
            values.cargo,
            values.titulo,
            values.certificado,
            values.certificadoOriginal,
            values.clavePrivada,
            values.password).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Registro agregado con éxito.");
            }else{
                showPopupMessage("Error", result);
            }
            getResponsibles().then(currResponsibles => setResponsibles(currResponsibles));
        }).finally(()=>setIsLoading(false));
    }

    const submitFormDeleteResponsible = async (values: DeleteResponsibleForm, _formikBag: FormikHelpers<DeleteResponsibleForm>) => {
        setIsLoading(true);
        deleteResponsible(Number(values.responsibleID)).then((result: string) => {
            if (result === ""){
                showPopupMessage("Aviso","Registro eliminado con éxito.");
            }else{
                showPopupMessage("Error", result);
            }
            getResponsibles().then(currResponsibles => setResponsibles(currResponsibles));
        }).finally(()=>setIsLoading(false));
    }
    
    return (
        <>
        <Loading isVisible={isLoading}/>
        <SchoolsResponsibleForm submitFormResponsible= {submitFormResponsible} />
        <hr></hr>
        <SchoolsResponsibleTable responsibles= {responsibles} submitFormDeleteResponsible = {submitFormDeleteResponsible}/>
        </>
    )
}
export default SchoolsResponsible