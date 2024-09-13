import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getShowById } from '../api/tvmaze';
const Show = () => {
  const [showData, setShowData] = useState(null);
  const [showError, setShowError] = useState(null);

  const { showId } = useParams();
  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getShowById(showId);
        setShowData(data);
      } catch (err) {
        setShowError(err);
      }
    }
    fetchData();
  }, [showId]);

  if (showError) {
    return <div>We have an Error...{showError.message}</div>;
  }

  if (showData) {
    return <div>Got show data {showData.name}!</div>;
  }

  return <div>loading...</div>;
};

export default Show;
