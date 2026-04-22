import { useState } from "react";
import Status from "../component/Status";

function StatusPage() {
  const [statuses, setStatuses] = useState([]);

  return <Status statuses={statuses} setStatuses={setStatuses} />;
}

export default StatusPage;