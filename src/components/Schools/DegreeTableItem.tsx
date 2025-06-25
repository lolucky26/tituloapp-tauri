import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {ReactElement} from 'react';
import { Formik, FormikHelpers} from 'formik';
import {DeleteDegreeForm, DegreeType} from '../../types';

interface Props {
    degrees: DegreeType[];
    submitFormDeleteDegree: (values: DeleteDegreeForm, formikBag: FormikHelpers<DeleteDegreeForm>) => void;
}

function SchoolsDegreeTableItem ({degrees,submitFormDeleteDegree}: Props): JSX.Element | null {

    let degreeItem: ReactElement[] = [];

    const submitFormDeleteDegreeWrapped = (values: DeleteDegreeForm, formikBag: FormikHelpers<DeleteDegreeForm>) => {
        submitFormDeleteDegree (values, formikBag);
    }
    degrees.map((degree)=>{
        degreeItem.push (
            //<ListGroup.Item key ={school._id} action >{school.datosGenerales.nombre}</ListGroup.Item>
            <tr key={degree.id} >
                <td>{degree.clave}</td>
                <td>{degree.rvoe}</td>
                <td>{degree.nombre}</td>
                <td>
                <Formik
                    onSubmit={submitFormDeleteDegreeWrapped}
                    initialValues={{
                        degreeID: degree.id
                    }}
                    >
                    {(formikProps) => (
                    <Form noValidate onSubmit={formikProps.handleSubmit}>
                    <Button variant="outline-danger" key ={degree.id} type="submit">
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
        {degreeItem}
        </>
        )

}
export default SchoolsDegreeTableItem

