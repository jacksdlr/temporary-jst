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
  }
  .add-session:active {
    background-color: var(--grey-100);
    color: var(--primary-500);
    margin: 0.2rem 0 0 0.2rem;
  }
  .session-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1.38rem;
  }
  .session-label input:first-of-type {
    background: none;
    border: none;
    font-size: 1.75rem;
    color: var(--textColor);
    letter-spacing: var(--letterSpacing);
    padding-left: 0;
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
    display: grid;
    row-gap: 0.5rem;
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
  @media (min-width: 992px) {
    .form-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
      column-gap: 1rem;
    }
    .btn-container {
      margin-top: 0;
    }
  }
  @media (min-width: 1120px) {
    .form-center {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .form-center button {
      margin-top: 0;
    }
  }
`;

export default Wrapper;
