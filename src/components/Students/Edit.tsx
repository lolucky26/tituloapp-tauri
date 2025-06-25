import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import StudentsEditFollowup from '../Students/EditFollowup.tsx';
import StudentsEditForm from '../Students/EditForm.tsx';
import StudentsEditChain from '../Students/EditChain.tsx';
import {StudentType, EditStudentForm,ResponsibleType, SchoolType, DegreeType} from '../../types';
import { FormikHelpers} from 'formik';
import { useState } from 'react';

interface Props {
    student : StudentType;
    school: SchoolType
    responsibles: ResponsibleType[];
    degrees: DegreeType[];
    visible: boolean;
    submitFormEditStudent: (values:EditStudentForm, formikBag:FormikHelpers<EditStudentForm>) => void;
    downloadXMLButtonClicked: ()=> void;
    sendXMLButtonClicked: ()=> void;
    checkStatusXMLButtonClicked: ()=> void;
    downloadValidatedXMLButtonClicked: ()=> void;
}

function StudentsEdit ({
    student,
    school,
    responsibles,
    degrees,
    visible,
    submitFormEditStudent,
    downloadXMLButtonClicked,
    sendXMLButtonClicked,
    checkStatusXMLButtonClicked,
    downloadValidatedXMLButtonClicked}: Props): JSX.Element | null {

    let [isSendDisabled, setIsSendDisabled] = useState<boolean>(false);

    const onFormEdit = () => {
        setIsSendDisabled(true);
    }
    const onFormSave = () => {
        setIsSendDisabled(false);
    } 

    if (visible){
        return (
        <Container>
            {student.id !== '' ?
            <>
            <Col>
            <StudentsEditFollowup
            student = {student}
            downloadXMLButtonClicked={downloadXMLButtonClicked}
            sendXMLButtonClicked={sendXMLButtonClicked}
            checkStatusXMLButtonClicked={checkStatusXMLButtonClicked}
            downloadValidatedXMLButtonClicked={downloadValidatedXMLButtonClicked}
            buttonsDisabled={isSendDisabled}
            />
            </Col>
            <hr></hr>
            </>
            :
            <></>
            }
            <Col>
            <StudentsEditForm
            submitFormEditStudent= {submitFormEditStudent}
            student = {student}
            school={school}
            responsibles={responsibles}
            degrees={degrees}
            onFormEdit = {onFormEdit}
            onFormSave = {onFormSave}
            />
            </Col>
            {student.id !== '' ?
            <>
            <hr></hr>
            <Col>
            <StudentsEditChain
            student = {student}
            />
            </Col>
            </>
            :
            <></>
            }
            </Container>
        )
    }else{
        return (<></>)
    }
}
export default StudentsEdit