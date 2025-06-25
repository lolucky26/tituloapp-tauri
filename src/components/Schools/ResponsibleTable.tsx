import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import SchoolsResponsibleTableItem from './ResponsibleTableItem.tsx'
import {DeleteResponsibleForm, ResponsibleType} from '../../types.ts';
import {FormikHelpers} from 'formik';

interface Props {
    responsibles: ResponsibleType[];
    submitFormDeleteResponsible: (values: DeleteResponsibleForm, formikBag: FormikHelpers<DeleteResponsibleForm>) => void;
}

function SchoolsResponsibleTable ({responsibles, submitFormDeleteResponsible}: Props): JSX.Element | null {

        return (
            <Container>
                <Table >
                    <thead>
                        <tr>
                        <th>Responsable</th>
                        <th>CURP</th>
                        <th>Cargo</th>
                        <th>No. Certificado</th>
                        <th>Observaciones</th>
                        <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <SchoolsResponsibleTableItem responsibles = {responsibles} submitFormDeleteResponsible = {submitFormDeleteResponsible}/>
                    </tbody>
                </Table>
            </Container>
        )
}
export default SchoolsResponsibleTable