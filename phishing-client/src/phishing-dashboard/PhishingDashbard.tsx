import React, { useEffect, useState } from 'react';


export type DashboardRecord = {
  email: string;
  status: 'sent' | 'clicked' | 'failed';
};

interface DashboardProps {
  token: string; 
  }

const Dashboard: React.FC<DashboardProps> = ({token}) => {
  const [link, setLink] = useState('');
  const [email, setEmail] = useState('');
  const [data, setData] = useState<DashboardRecord[]>([]);

      const fetchEmails = async () => {
        try {
          const response = await fetch('http://localhost:3000/phishingAttempts',{headers:{
            Authorization: `Bearer ${token}`,
          }});
          const json = await response.json();
          setData(json);
        } catch (error) {
          console.error('Failed to fetch emails', error);
        }
      };

  useEffect(() => {

    fetchEmails();
  }, []);

 const handleSend = async () => {
    try {
      const response = await fetch('http://localhost:3000/phishing/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          email,
          link
        }),
      });

      if (!response.ok) {
        throw new Error('API call failed');
      }

      alert('Emails sent!');
      await fetchEmails(); // refresh the table data
    } catch (error) {
      alert('Failed to trigger backend: ' + error);
    }
  };

  return (
    <div>
     <div style={{ display: 'flex', marginBottom: '20px', gap: '10px' }}>
        <input
          type="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            flex: 1,
            padding: '10px',
            fontSize: '16px',
            borderRadius: '4px',
            border: '1px solid #ccc',
          }}
        />
        <input
        type="text"
        placeholder="Enter phishing link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        style={{ display: 'block', marginBottom: '10px', width: '100%', padding: '8px' }}
      />
        <button
          onClick={handleSend}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2563eb',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Send
        </button>
      </div>
    <div className="overflow-x-auto p-4">
      <table className="min-w-full border-collapse border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Status</th>
          </tr>
        </thead>
        <tbody>
          {data.map((record, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{record.email}</td>
              <td className="border border-gray-300 px-4 py-2 capitalize">
                <span
                  className={`inline-block px-2 py-1 rounded text-white text-sm ${
                    record.status === 'sent'
                      ? 'bg-blue-500'
                      : record.status === 'clicked'
                      ? 'bg-green-500'
                      : 'bg-red-500'
                  }`}
                >
                  {record.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>

  );
};

export default Dashboard;
