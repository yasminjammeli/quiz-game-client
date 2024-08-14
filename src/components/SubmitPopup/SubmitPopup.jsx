import './SubmitPopup.css';

const SubmitPopup = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className='modal-overlay'>
      <div className="modal-content">
        <div className="modal-header">
          <div className="modal-icon">
            ?
          </div>
        </div>
        <div className="modal-body">
          <p>Are you sure you want to submit the quiz?</p>
        </div>
        <div className="modal-footer">
          <button onClick={onClose}>No</button>
          <button onClick={onConfirm}>Yes</button>
        </div>
      </div>
    </div>
  );
};

export default SubmitPopup;
