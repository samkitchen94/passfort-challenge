import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Error from "./Error";
import Markdown from 'markdown-to-jsx';

const Document = () => {
  const { document } = useParams();
  const revisions = useQuery(`/page/${document}`);
  const latestRevision = useQuery(`/page/${document}/latest`);

  if (revisions.isLoading || latestRevision.isLoading) {
    return <p>Loading..</p>
  }
  if (revisions.error || latestRevision.error) {
    return <Error msg={revisions.error.message || latestRevision.error.isLoading} />
  }

  if (latestRevision.data) {
    return (
      <>
        <Link to="/">Back to all documents</Link>
        <h4>Latest Revision for {latestRevision.data.title}:</h4>
        <Markdown>{latestRevision.data.data}</Markdown>
        {revisions.data && (
          <>
            <h4>Previous Revisions:</h4>
            <ul>
              {revisions.data.revisions.map(title => (
                <li key={title}>
                  <Link to={`/${document}/${title}`}>{title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </>
    )
  }

  return null;
}

export default Document;