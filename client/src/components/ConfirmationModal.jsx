import Wrapper from '../assets/wrappers/ConfirmationModal';

const ConfirmationModal = ({ action, type, handleCancel, handleConfirm }) => {
  return (
    <Wrapper>
      <aside className='modal-container'>
        <div className='modal'>
          {action == 'delete' && (
            <h3>Are you sure you want to delete this {type}?</h3>
          )}
          {type == 'mesocycle' && (
            <p>
              This will delete all workouts for this mesocycle. You will not be
              able to recover them.
            </p>
          )}
          <div className='btn-container'>
            <button className='btn exit-btn' onClick={handleCancel}>
              Cancel
            </button>
            <button className='btn confirm-btn' onClick={handleConfirm}>
              Confirm
            </button>
          </div>
        </div>
      </aside>
    </Wrapper>
  );
};
export default ConfirmationModal;
