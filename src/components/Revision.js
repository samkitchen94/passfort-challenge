import Markdown from 'markdown-to-jsx';
import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Error from './Error';

const Revision = () => {
  const { document, revision } = useParams();
  const { data, error, isLoading } = useQuery(`/page/${document}/${revision}`);

  if (isLoading) {
    return <p>Loading..</p>
  }
  if (error) {
    return <Error msg="This revision does not exist" />
  }

  if (data) {
    return (
      <>
        <Link to={`/${document}`}>Back to all revisions</Link>
        <h3>{data.title}</h3>
        <h4>Revision: {revision}</h4>
        <Markdown>{data.data}</Markdown>
      </>
    );
  }
  return null;
}

export default Revision;