import styled from 'styled-components';

const Wrapper = styled.section`
  margin-top: 4rem;
  h2 {
    text-transform: none;
  }
  & > h5 {
    font-weight: 700;
  }
  .mesocycles {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 2rem;
    @media (min-width: 658px) {
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    @media (min-width: 1600px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    @media (min-width: 1920px) {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
`;
export default Wrapper;
