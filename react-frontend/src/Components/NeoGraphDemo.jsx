import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

export default function NeoGraphDemo(){
  const [data, setData] = useState(null);
  useEffect(()=>{
    fetch('/neo4j_export.json')
      .then(r=>r.json())
      .then(j=>setData(j))
      .catch(e=>console.error(e));
  },[]);

  if(!data) return <div className="p-4">Loading Neo4j export...</div>;

  const rows = data.results[0].data;

  return (
    <div className="p-4">
      <div className="mb-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">Neo4j Export (Sample)</h2>
          <p className="text-sm text-gray-600">
            This page shows a sample export. The live graph is available from the main navigation.
          </p>
        </div>
      </div>
      <ul>
        {rows.map((r, idx)=>{
          const [n, rel, m] = r.row;
          return (
            <li key={idx} className="mb-3">
              <div><strong>From:</strong> {JSON.stringify(n)}</div>
              <div><strong>Rel:</strong> {JSON.stringify(rel)}</div>
              <div><strong>To:</strong> {JSON.stringify(m)}</div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
