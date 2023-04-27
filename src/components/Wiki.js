import { useQuery } from 'react-query';
import Error from './Error';
import { Link } from 'react-router-dom';

const Wiki = () => {
  const { isLoading, error, data } = useQuery('/pages');

  if (isLoading) {
    return <p>Loading..</p>
  }
  if (error) {
    return <Error msg={error.message} />
  }

  if (data.titles) {
    return (
      <>
        <h1>Wiki Application</h1>
        <h2>List of Documents:</h2>
        <ul>
          {data.titles.map(title => (
            <li key={title}>
              <Link to={`/${title}`}>{title}</Link>
            </li>
          ))}
        </ul>
      </>
    )
  }

  return null;
}

export default Wiki;