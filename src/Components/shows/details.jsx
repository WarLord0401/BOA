const Details = props => {
  const { status, premiered, network } = props;

  return (
    <div>
      <p>
        <b>Status: </b>
        {status}
      </p>
      <p>
        <b>Premiered:</b> {premiered} {!!network && `on ${network.name}`}
      </p>
    </div>
  );
};

export default Details;
