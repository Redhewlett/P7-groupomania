import styled from 'styled-components'

export const StyledCard = styled.div`
  background-color: ${(props) => props.color};
  display: flex;
  flex-direction: column;
  padding: 2em;
  gap: 0.2em;
  border-radius: 15px;
  width: max-content;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  & input {
    width: 60vw;
    border-style: none;
    border-radius: 5px;
    padding: 0.5em 0em 0.5em 1em;
    width: 20em;
    margin-bottom: 1em;
    transition: all ease-in-out 190ms;
  }

  & input::placeholder {
    color: #bdbcc7;
  }

  & input:focus {
    outline: double #f53029;
    border-radius: 0px;
  }

  @media screen and (max-width: 480px) {
    width: 70vw;
    padding: 1em;
    align-items: center;
    text-align: center;

    & input {
      width: 60vw;
    }
    & hr {
      width: 95%;
    }
  }

  @media screen and (min-width: 481px) and (max-width: 768px) {
    width: 80vw;
    padding: 2em;
    align-items: center;
    text-align: center;

    & input {
      width: 60vw;
    }
    & hr {
      width: 95%;
    }
  }

  @media screen and (min-width: 769px) and (max-width: 1200px) {
    width: 80vw;
    padding: 2em;
    align-items: center;
    text-align: center;

    & input {
      width: 60vw;
    }
  }
`
