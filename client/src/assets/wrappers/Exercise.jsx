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
  .exercise-title {
    padding: 0.3rem 0 0 0.3rem;
    margin: 0;
    padding-bottom: 0.5rem;
    margin-bottom: 1rem;
    border-bottom: 1px solid var(--grey-100);
  }
  .equipment {
    font-size: 1rem;
    color: var(--grey-300);
  }
  p {
    margin: 0;
  }
  .notes {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .note {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 0.25rem;
    padding: 0.5rem;
    background: #fcfbc7;
  }
  .note p {
    flex: 1 0 20%;
    margin: 0;
    line-height: 1rem;
  }
  .sets {
    padding: 0 0.3rem;
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
  .input-container {
    width: 25%;
  }
  .target {
    height: 2rem;
    color: var(--primary-500);
  }
  .increase,
  .decrease {
    height: 1rem;
    margin: 0.5rem 0;
    border-radius: var(--borderRadius);
  }
  .increase {
    background-color: var(--green-light);
    color: var(--green-dark);
  }
  .decrease {
    background-color: var(--red-light);
    color: var(--red-dark);
  }
  .target,
  .increase,
  .decrease {
    position: absolute;
    margin-left: 0.15rem;
  }
  input {
    width: 100%;
    height: 2rem;
    text-align: center;
  }
  select {
    width: 100%;
    height: 2rem;
    text-align: center;
  }
  select:invalid {
    color: var(--grey-300);
    /* -webkit-appearance: none;
    appearance: none; */
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    /* margin: 0; */
  }
  input[type='number'] {
    -moz-appearance: textfield;
  }
  input:focus,
  select:focus {
    border: 1px solid var(--primary-500);
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
