import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Formik, FormikHelpers} from 'formik';
import {SchoolType, SchoolForm} from '../../types';
import * as yup from 'yup';

interface Props {
    submitFormSchool: (values: SchoolForm, formikBag: FormikHelpers<SchoolForm>) => void;
    school: SchoolType;
}

const dataSchema = {
    nombre: yup.string().required(),
};

function SchoolsForm ({submitFormSchool,school}: Props): JSX.Element | null {

    const basePrefilledValues = {
        nombre: "",
        estado: "",
        claveInstitucion: "",
        cuenta: "",
        password: "",
    }

    const schoolValues={
        nombre: school?.nombre,
        estado: school?.estado,
        claveInstitucion: school?.claveInstitucion,
        cuenta: school?.cuenta,
        password: school?.password,
    }


    const submitFormSchoolWrapped = (values: SchoolForm, formikBag: FormikHelpers<SchoolForm>) => {
        submitFormSchool (values, formikBag)
    }


    return (
        <Formik
            validationSchema={yup.object(dataSchema)}
            onSubmit={submitFormSchoolWrapped}
            initialValues={{...basePrefilledValues, ...schoolValues}}
            enableReinitialize={true}
            >
            {(formProps) => (
            <Form onSubmit={formProps.handleSubmit}>
            <h3>Datos Generales</h3>
            <Form.Group as={Row} className="mb-3" controlId="nombre" >
                <Form.Label column sm="2">
                Nombre
                </Form.Label>
                <Col sm="10">
                <Form.Control required type="text" name="nombre" placeholder="" value ={formProps.values.nombre} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="estado" >
                <Form.Label column sm="2">
                Estado
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name="estado" placeholder="" value ={formProps.values.estado} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="claveInstitucion" >
                <Form.Label column sm="2">
                Clave de Institución
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name="claveInstitucion" placeholder="" value ={formProps.values.claveInstitucion} onChange={(e)=>{
                        e.target.value = e.target.value.toUpperCase()
                        formProps.handleChange(e)}}/>
                </Col>
            </Form.Group>
            <h3>Datos de Acceso de Plataforma</h3>
            <Form.Group as={Row} className="mb-3" controlId="cuenta" >
                <Form.Label column sm="2">
                Cuenta
                </Form.Label>
                <Col sm="10">
                <Form.Control type="text" name="cuenta" placeholder="" value ={formProps.values.cuenta} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="platform-password" >
                <Form.Label column sm="2">
                Contraseña
                </Form.Label>
                <Col sm="10">
                <Form.Control type="password" name="password" placeholder="" value ={formProps.values.password} onChange={formProps.handleChange}/>
                </Col>
            </Form.Group>
            <Button variant="primary" type="submit" name="submit">
            Guardar
            </Button>
            </Form>
            )}
        </Formik>
    )
}
export default SchoolsForm;