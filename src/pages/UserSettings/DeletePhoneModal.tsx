import { AuthContext } from 'contexts/AuthContext';
import { FC, useContext } from 'react';
import { removePhoneNumber } from 'services/user/phone';
import $ from 'tools/$selector';

const DeletePhoneModal: FC<{ onClose: () => void }> = ({ onClose }) => {
  const { userData, fetchData } = useContext(AuthContext);
  const handleDelete = async () => {
    $('.delete-button')?.setAttribute('disabled', 'true');
    if (userData) {
      const response = await removePhoneNumber(userData._id);
      if (response && response.status === 200) {
        onClose();
        fetchData();
      }
    }

    $('.delete-button')?.removeAttribute('disabled');
  };

  return (
    <div className="delete-modal">
      <div className="modal-content">
        <h2>Are you sure you want to delete your phone number?</h2>
        <div className="modal-buttons">
          <button
            className="delete-button"
            onClick={handleDelete}
          >
            Delete
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeletePhoneModal;
