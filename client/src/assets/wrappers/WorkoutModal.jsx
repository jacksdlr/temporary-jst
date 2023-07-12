import { styled, Box } from '@mui/material';

const Wrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  min-width: 300;
  max-width: 800;
  width: 80%;
  background-color: white;
  border-radius: var(--borderRadius);
  box-shadow: 24;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  .btn-container {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
  .clear-btn {
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  p {
    margin: 0;
  }
  .form {
    margin: 0;
    border-radius: 0;
    box-shadow: none;
    padding: 0;
    max-width: 100%;
    width: 100%;
    padding-bottom: 1rem;
    margin-bottom: 1rem;
  }
  .form-center {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .select-reps,
  .select-sets {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 5px;
  }
  .select-reps .form-label,
  .select-sets .form-label {
    margin: 0;
    display: inline-block;
    white-space: nowrap;
  }
  .exercise-container {
    border-radius: 10px;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  h5 {
    margin-bottom: 0.5rem;
  }
  .form-row {
    margin: 0;
  }
  @media (min-width: 992px) {
    .form-center {
      display: grid;
      grid-template-areas:
        'exercise exercise'
        'reps sets'
        'notes notes';
      row-gap: 0.5rem;
    }
    .select-exercise {
      grid-area: exercise;
    }
    .select-reps {
      grid-area: reps;
      justify-content: flex-start;
    }
    .select-sets {
      grid-area: sets;
      justify-content: flex-start;
    }
    .exercise-notes {
      grid-area: notes;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-areas:
        'exercise reps sets'
        'notes notes notes';
    }
  }
`;

export default Wrapper;
