const http = require('http');
const auth = Buffer.from('neo4j:India@7507535622').toString('base64');
const body = JSON.stringify({statements:[{statement:'MATCH (n)-[r]->(m) RETURN n,r,m LIMIT 25'}]});
const opts = {
  hostname: '127.0.0.1',
  port: 7474,
  path: '/db/neo4j/tx/commit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Basic ' + auth,
    'Content-Length': Buffer.byteLength(body)
  }
};

const req = http.request(opts, res => {
  console.log('STATUS', res.statusCode);
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      const fs = require('fs');
      fs.writeFileSync('react-frontend/public/neo4j_export.json', JSON.stringify(parsed, null, 2));
      console.log('WROTE react-frontend/public/neo4j_export.json');
    } catch (e) {
      console.log(data);
    }
  });
});
req.on('error', e => console.error('ERR', e));
req.write(body);
req.end();
