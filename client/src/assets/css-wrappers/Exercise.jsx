import styled from 'styled-components';

const Wrapper = styled.section`
  .container {
    border-radius: var(--borderRadius);
    width: 100%;
    background: var(--white);
    padding: 1rem;
    margin-bottom: 2rem;
    box-shadow: var(--shadow-2);
    display: flex;
    flex-direction: column;
  }
  .info {
    display: flex;
    /* padding-bottom: 1rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--grey-100); */
    justify-content: space-between;
  }
  .info p {
    padding: 0.2rem 0.6rem;
    margin: 0;
    margin-right: 1rem;
    border-radius: var(--borderRadius);
  }
  .links {
    display: flex;
    gap: 10px;
    align-items: center;
  }
  .options:hover {
    cursor: pointer;
    color: var(--primary-500);
  }
  h4 {
    padding: 0.3rem 0 0 0.3rem;
    margin: 0;
  }
  .equipment {
    font-size: 1rem;
    color: var(--grey-300);
  }
  p {
    margin: 0;
  }
  .sets {
    padding: 1rem 0.3rem;
    padding-bottom: 0;
  }
  .sets-header {
    display: flex;
    justify-content: space-between;
    margin: 0 0.5rem;
  }
  .sets-header p {
    width: 25%;
    text-align: center;
    padding-right: 1rem;
  }
  .sets-header p:first-of-type {
    padding: 0;
  }
  .set {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem;
  }
  .set input,
  select {
    width: 25%;
    height: 2rem;
    text-align: center;
  }
  select:invalid {
    color: var(--grey-300);
    /* -webkit-appearance: none;
    appearance: none; */
  }
  option {
    color: black;
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
  .form-center button {
    align-self: end;
    height: 35px;
    margin-top: 1rem;
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
    background: var(--grey-500);
  }
  .clear-btn:hover {
    background: var(--black);
  }
  @media (min-width: 992px) {
    h4 {
      font-size: 1.563rem;
    }
    .number {
      font-size: 1.953rem;
    }
    .sets-header p:first-of-type {
      padding-right: 1rem;
    }
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
  }
`;

export default Wrapper;
