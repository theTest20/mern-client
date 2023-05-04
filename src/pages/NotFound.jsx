import {MDBTypography, MDBBtn,MDBIcon} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <div>
      <MDBTypography className="text-center mt-10 mb-0 tag-h2">
        Something went wrong
    </MDBTypography>
    </div>
  );
};

export default NotFound;
