import styled from 'styled-components';

const Wrapper = styled.section`
  .session {
    border-radius: var(--borderRadius);
    width: 100%;
    background: var(--white);
    padding: 2rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-2);
  }
  .add-session {
    padding: 1rem;
    display: flex;
    justify-content: center;
  }
  .add-session:hover {
    color: var(--primary-500);
    cursor: pointer;
  }
  .add-session:active {
    background-color: var(--grey-100);
    color: var(--primary-500);
    /* margin: 0.2rem 0 0 0.2rem; */
  }
  .session-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.38rem;
  }
  .session-name {
    width: calc(100% - 25px);
  }
  .session-label input {
    max-width: 75%;
    background: none;
    border: none;
    font-size: 1.75rem;
    color: var(--textColor);
    letter-spacing: var(--letterSpacing);
    padding-left: 0.2rem;
  }
  h3 {
    margin-top: 0;
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
  }
  .form-row {
    margin-bottom: 0;
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
  .select-reps select {
    max-width: 25rem;
  }
  .select-sets input {
    max-width: 5rem;
  }
  .form-center button,
  .add-exercise {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
  }
  .exercise-container {
    border-radius: 10px;
    padding: 0.5rem;
    margin-bottom: 1rem;
  }
  .label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }
  h5 {
    margin: 0;
  }
  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1rem;
    align-self: flex-end;
    margin-top: 0.5rem;
    button {
      height: 35px;
    }
  }
  .clear-btn {
    width: 2.5rem;
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  .icon:hover {
    color: var(--primary-500);
    cursor: pointer;
  }
  .info-container {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .info-container svg:hover {
    color: var(--primary-500);
  }
  /*   .info {
    max-height: 0;
    overflow: hidden;
    max-width: 100%;
    padding: 0;
    border-radius: var(--borderRadius);
    background-color: var(--primary-100);
    transition: var(--slow-transition);
  }
  .show-info {
    max-height: 500px;
  } */
  @media (max-width: 992px) {
    .session {
      padding: 1rem;
    }
    .session-label {
      margin: 1rem;
    }
    .session-notes {
      width: 90%;
      margin: 0 1rem 1.38rem 1rem;
    }
  }
  @media (min-width: 992px) {
    /* .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 0.5rem;
    } */
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
      justify-content: flex-end;
    }
    .exercise-notes {
      grid-area: notes;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-areas:
        'exercise reps sets'
        'notes notes notes';
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
