import ListGroup from 'react-bootstrap/ListGroup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Formik } from 'formik';
import { ReactElement} from 'react';
//const levenshtein = require('js-levenshtein');
import {distance as levenshtein} from 'fastest-levenshtein';
import {StudentType, SelectStudentForm, DeleteStudentForm, DisableStudentForm} from '../../types';
import { FormikHelpers} from 'formik';

interface Props {
    students: StudentType[];
    submitFormSelectStudent:(values:SelectStudentForm, formikBag:FormikHelpers<SelectStudentForm>) => void;
    submitFormDeleteStudent:(values:DeleteStudentForm, formikBag:FormikHelpers<DeleteStudentForm>) => void;
    submitFormDisableStudent:(values:DisableStudentForm, formikBag:FormikHelpers<DisableStudentForm>) => void;
    sortBy: string;
    searchString: string;
    showHidden: boolean;
}

function StudentsSearchStudentItem ({students,submitFormSelectStudent,submitFormDeleteStudent,submitFormDisableStudent,sortBy,searchString,showHidden}: Props): JSX.Element | null {

    let studentItem: ReactElement[] = [];

    const submitFormSelectStudentWrapped = (values:SelectStudentForm, formikBag:FormikHelpers<SelectStudentForm>) => {
        submitFormSelectStudent (values, formikBag);
    }

    const submitFormDeleteStudentWrapped = (values:DeleteStudentForm, formikBag:FormikHelpers<DeleteStudentForm>) => {
        submitFormDeleteStudent (values, formikBag);
    }
    const submitFormDisableStudentWrapped = (values:DisableStudentForm, formikBag:FormikHelpers<DisableStudentForm>) => {
        submitFormDisableStudent (values, formikBag);
    }

    if(Symbol.iterator in Object(students)){

        let dict = students
        var studentsDict = Object.keys(dict).map(
            (key:any) => {
                const currStudent = dict[key];
                const fullName = currStudent.nombre + " " + currStudent.primerApellido + " " + currStudent.segundoApellido
                if (searchString){
                    let levenshteinArr: number[] = []
                    currStudent.nombre.split(" ").forEach((item)=>levenshteinArr.push(
                        levenshtein(searchString.toUpperCase(),item)
                        ));
                    levenshteinArr.push(levenshtein(searchString.toUpperCase(),currStudent.primerApellido));
                    levenshteinArr.push(levenshtein(searchString.toUpperCase(),currStudent.segundoApellido));
                    levenshteinArr.push(levenshtein(searchString.toUpperCase(),currStudent.nombre));
                    levenshteinArr.push(levenshtein(searchString.toUpperCase(),fullName));
                }
                return {
                "id" : currStudent.id,
                "isActive": currStudent.isActive,
                "folio" : currStudent.folio,
                "carrera" : currStudent.carrera.split(" -- ")[2],
                "nombre" : fullName,
                "levenshtein" : (searchString?
                    Math.min(
                        levenshtein(searchString.toUpperCase(), currStudent.nombre.split(" ")[0]),
                        levenshtein(searchString.toUpperCase(), currStudent.primerApellido),
                        levenshtein(searchString.toUpperCase(), currStudent.segundoApellido)
                    ):0),
                "fechaCreado":currStudent.fechaCreado,
                "fechaEditado":currStudent.fechaEditado,
            } });
        studentsDict.sort((a, b) =>{
            if (searchString){
                let aString: number | Date | string = a.levenshtein
                let bString: number | Date | string = b.levenshtein
                if (aString<bString)return -1;
                if (aString>bString)return 1;
                return 0;
            }else{
                let aString: number | Date | string  = a.folio.toUpperCase()
                let bString: number | Date | string  = b.folio.toUpperCase()
                if (sortBy.split(" ")[0] === "CARRERA"){
                    aString = a.carrera?.toUpperCase()??'';
                    bString = b.carrera?.toUpperCase()??'';
                }
                if (sortBy.split(" ")[0] === "NOMBRE"){
                    aString = a.carrera?.toUpperCase()??'';
                    bString = b.carrera?.toUpperCase()??'';
                }
                if (sortBy.split(" ")[0] === "CREADO"){
                    aString = new Date(a.fechaCreado.replace(' ', 'T'));
                    bString = new Date(b.fechaCreado.replace(' ', 'T'));
                }
                if (sortBy.split(" ")[0] === "EDITADO"){
                    aString = new Date(a.fechaEditado.replace(' ', 'T'));
                    bString = new Date(b.fechaEditado.replace(' ', 'T'));
                }
                if(sortBy.split(" ")[1] === "+"){
                    if (aString<bString)return -1;
                    if (aString>bString)return 1;
                } else{
                    if (aString>bString)return -1;
                    if (aString<bString)return 1;
                }
                return 0;
            }
        })
        studentsDict.map((student)=>{
            if (!showHidden && student.isActive){
                studentItem.push (
                    <tr key= {student.id} >
                        <td>
                        <Formik
                            onSubmit={submitFormSelectStudentWrapped}
                            initialValues={{id: student.id}}
                            >
                            {(formikProps) => (
                            <Form noValidate onSubmit={formikProps.handleSubmit}>
                            <ListGroup variant="flush">
                                <ListGroup.Item key ={student.id} action type="submit" data-name="submit">
                                {student.folio}
                                </ListGroup.Item>
                            </ListGroup>
                            </Form>
                            )}
                        </Formik>
                        </td>
                        <td>
                        <Formik
                            onSubmit={submitFormSelectStudentWrapped}
                            initialValues={{id: student.id}}
                            >
                            {(formikProps) => (
                            <Form noValidate onSubmit={formikProps.handleSubmit}>
                            <ListGroup variant="flush">
                                <ListGroup.Item key ={student.id} action type="submit" data-name="submit">
                                {student.nombre}
                                </ListGroup.Item>
                            </ListGroup>
                            </Form>
                            )}
                        </Formik>
                        </td>
                        <td>{student.carrera}</td>
                        <td>{student.fechaCreado}</td>
                        <td>{student.fechaEditado}</td>
                        <td>
                        <Formik
                            onSubmit={submitFormDisableStudentWrapped}
                            initialValues={{
                                id:student.id,
                                enabled:true

                            }}
                            >
                            {(formikProps) => (
                            <Form noValidate onSubmit={formikProps.handleSubmit}>
                            <Button variant="outline-secondary" key ={student.id} type="submit">
                                Deshabilitar
                            </Button>
                            </Form>
                            )}
                        </Formik>
                        </td>
                    </tr>
                )
            }
            if (showHidden && !student.isActive){
                studentItem.push (
                    //<ListGroup.Item key ={school._id} action >{school.datosGenerales.nombre}</ListGroup.Item>
                    <tr key= {student.id} >
                        <td>
                        {student.folio}
                        </td>
                        <td>
                        {student.nombre}
                        </td>
                        <td>{student.carrera}</td>
                        <td>{student.fechaCreado}</td>
                        <td>{student.fechaEditado}</td>
                        <td>
                        <Formik
                            onSubmit={submitFormDisableStudentWrapped}
                            initialValues={{
                                id:student.id,
                                enabled:false
                            }}
                            >
                            {(formikProps) => (
                            <Form noValidate onSubmit={formikProps.handleSubmit}>
                            <Button variant="outline-secondary" key ={student.id} type="submit">
                                Restaurar
                            </Button>
                            </Form>
                            )}
                        </Formik>
                        </td>
                        <td>
                        <Formik
                            onSubmit={submitFormDeleteStudentWrapped}
                            initialValues={{
                                id:student.id
                            }}
                            >
                            {(formikProps) => (
                            <Form noValidate onSubmit={formikProps.handleSubmit}>
                            <Button variant="outline-danger" key ={student.id} type="submit">
                                Eliminar
                            </Button>
                            </Form>
                            )}
                        </Formik>
                        </td>
                    </tr>
                )
            }
        })
    }
    
    
    return (
        <>
        {studentItem}
        </>
        )

}
export default StudentsSearchStudentItem

