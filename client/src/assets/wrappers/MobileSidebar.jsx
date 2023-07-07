import styled from 'styled-components';

const Wrapper = styled.aside`
  @media (min-width: 992px) {
    display: none;
  }
  display: block;
  box-shadow: 0px 1px 0px 0px rgba(0, 0, 0, 0.1);
  .sidebar-container {
    background: var(--white);
    height: 0px;
    width: 100%;
    overflow: hidden;
    margin-top: -100%;
    transition: var(--transition);
  }
  .show-sidebar {
    height: 100%;
    margin-top: 0;
  }
  .nav-links {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
  }
  .nav-link {
    display: flex;
    align-items: center;
    color: var(--grey-500);
    padding: 1rem 0;
    padding-left: 2.5rem;
    text-transform: capitalize;
    transition: var(--transition);
  }
  .nav-link:hover {
    background: var(--grey-50);
    padding-left: 3rem;
    color: var(--grey-900);
  }
  .nav-link:hover .icon {
    color: var(--primary-500);
  }
  .icon {
    font-size: 1.5rem;
    margin-right: 1rem;
    display: grid;
    place-items: center;
    transition: var(--transition);
  }
  .active {
    color: var(--grey-900);
  }
  .active .icon {
    color: var(--primary-500);
  }
`;
export default Wrapper;
