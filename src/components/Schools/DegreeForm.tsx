import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, FormikHelpers} from 'formik';
import * as yup from 'yup';
import {EditDegreeForm} from '../../types';

const degreeSchema = {
    nombre_carrera: yup.string().required(),
    rvoe_carrera: yup.string().required(),
    clave_carrera: yup.string().required(),
}

interface Props {
    submitFormDegree: (values:EditDegreeForm, formikBag:FormikHelpers<EditDegreeForm>) => void;
}

function SchoolsDegreeForm ({submitFormDegree}: Props): JSX.Element | null {

    const basePrefilledValues = {
        nombre_carrera: "",
        rvoe_carrera: "",
        clave_carrera: "",
        nombre: "",
        rvoe: "",
        clave: "",
    };

    const submitFormDegreeWrapped = (values:EditDegreeForm, formikBag:FormikHelpers<EditDegreeForm>) => {
        values.nombre = values.nombre_carrera
        values.rvoe = values.rvoe_carrera
        values.clave = values.clave_carrera
        //submitFormDegree ({...values,...{id:school.id}}, formikBag);
        submitFormDegree (values, formikBag)
        formikBag.resetForm()
    }
    
    return (
        <>
        <h3>Carreras</h3>
        <Formik
            validationSchema={yup.object(degreeSchema)}
            onSubmit={submitFormDegreeWrapped}
            initialValues={basePrefilledValues}
            >
            {(formProps) => (
            <Form onSubmit={formProps.handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="nombre_carrera" >
                <Form.Label column sm="2">
                Nombre
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="nombre_carrera" placeholder="" value ={formProps.values.nombre_carrera} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="rvoe_carrera" >
                <Form.Label column sm="2">
                Número de RVOE
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="rvoe_carrera" placeholder="" value ={formProps.values.rvoe_carrera} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="clave_carrera" >
                <Form.Label column sm="2">
                Clave de Carrera
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="clave_carrera" placeholder="" value ={formProps.values.clave_carrera} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit" name="submit">
            Agregar
            </Button>
            </Form>
            )}
        </Formik>
        </>
    )
}
export default SchoolsDegreeForm