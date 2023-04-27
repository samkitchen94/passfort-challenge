import { Routes, Route } from "react-router-dom";
import Wiki from "./Wiki";
import Document from "./Document";
import Revision from "./Revision";

const Router = () => (
  <Routes>
    <Route path="/" element={<Wiki />} />
    <Route path="/:document" element={<Document />} />
    <Route path="/:document/:revision" element={<Revision />} />
  </Routes>
);

export default Router;