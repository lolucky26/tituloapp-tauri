import Container from 'react-bootstrap/Container';
import Table from 'react-bootstrap/Table';
import SchoolsDegreeTableItem from './DegreeTableItem.tsx';
import { FormikHelpers} from 'formik';
import {DeleteDegreeForm, DegreeType} from '../../types.ts';

interface Props {
    degrees: DegreeType[];
    submitFormDeleteDegree: (values: DeleteDegreeForm, formikBag: FormikHelpers<DeleteDegreeForm>) => void;
}

function SchoolsDegreeTable ({degrees,submitFormDeleteDegree}: Props): JSX.Element | null {
        return (
            <Container>
                <Table >
                    <thead>
                        <tr>
                        <th>Clave</th>
                        <th>RVOE</th>
                        <th>Nombre</th>
                        <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        <SchoolsDegreeTableItem degrees ={degrees} submitFormDeleteDegree = {submitFormDeleteDegree}/>
                    </tbody>
                </Table>
            </Container>
        )
}
export default SchoolsDegreeTable