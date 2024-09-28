import styled from 'styled-components';

const Details = props => {
  const { status, premiered, network } = props;

  return (
    <DetailsWrapper>
      <p>
        <b>Status: </b>
        {status}
      </p>
      <p>
        <b>Premiered:</b> {premiered} {!!network && `on ${network.name}`}
      </p>
    </DetailsWrapper>
  );
};

export default Details;

const DetailsWrapper = styled.div`
  p {
    margin: 5px 0;
  }
`;
