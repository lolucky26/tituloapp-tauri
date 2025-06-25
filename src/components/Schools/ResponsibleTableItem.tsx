import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {ReactElement} from 'react';
import { Formik, FormikHelpers } from 'formik';
import {ResponsibleType, DeleteResponsibleForm} from '../../types';


interface Props {
    responsibles: ResponsibleType[];
    submitFormDeleteResponsible: (values: DeleteResponsibleForm, formikBag: FormikHelpers<DeleteResponsibleForm>) => void;
}

function SchoolsResponsibleTableItem ({responsibles, submitFormDeleteResponsible}: Props): JSX.Element | null {

    let responsibleItem: ReactElement[] = [];

    const submitFormDeleteResponsibleWrapped = (values: DeleteResponsibleForm, formikBag: FormikHelpers<DeleteResponsibleForm>) => {
        submitFormDeleteResponsible (values, formikBag);
    }

    responsibles.map((responsible)=>{
        responsibleItem.push (
            //<ListGroup.Item key ={school._id} action >{school.datosGenerales.nombre}</ListGroup.Item>
            <tr key={responsible.id} >
                <td>{`${responsible.nombre} ${responsible.primerApellido} ${responsible.segundoApellido}`}</td>
                <td>{responsible.curp}</td>
                <td>{responsible.cargo.split(" -- ")[1]}</td>
                <td>{responsible.numeroCertificado}</td>
                <td>{responsible.observaciones}</td>
                <td>
                <Formik
                    onSubmit={submitFormDeleteResponsibleWrapped}
                    initialValues={{
                        responsibleID: responsible.id
                    }}
                    >
                    {(formikProps) => (
                    <Form noValidate onSubmit={formikProps.handleSubmit}>
                    <Button variant="outline-danger" key ={responsible.id} type="submit">
                        Eliminar
                    </Button>
                    </Form>
                    )}
                </Formik>
                </td>
            </tr>
        )
    })
        
    
    
    return (
        <>
        {responsibleItem}
        </>
        )

}
export default SchoolsResponsibleTableItem

