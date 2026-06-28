import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

const STEPS = [
  'Collecting faculty and subject data...',
  'Checking scheduling constraints...',
  'AI is generating the best possible timetable...',
  'Timetable generated successfully!',
];

export default function GeneratePage() {
  const navigate = useNavigate();
  const [depts, setDepts] = useState([]);
  const [form, setForm] = useState({ department_id: '', semester: '', academic_year: '2024-2025' });
  const [status, setStatus] = useState('idle'); // idle | running | done | error
  const [step, setStep] = useState(-1);
  const [errMsg, setErrMsg] = useState('');
  const [generatedId, setGeneratedId] = useState(null);

  useEffect(() => {
    api.get('/departments').then(r => {
      setDepts(r.data);
      if (r.data.length) setForm(f => ({ ...f, department_id: r.data[0].id }));
    });
  }, []);

  const handleGenerate = async () => {
    if (!form.department_id || !form.semester || !form.academic_year) {
      setErrMsg('Please fill all fields'); return;
    }
    setErrMsg('');
    setStatus('running');
    setStep(0);

    // Animate steps
    for (let i = 0; i < STEPS.length - 1; i++) {
      await new Promise(r => setTimeout(r, 900));
      setStep(i + 1);
    }

    try {
      const res = await api.post('/timetables/generate', {
        department_id: parseInt(form.department_id),
        semester: parseInt(form.semester),
        academic_year: form.academic_year,
      });
      setGeneratedId(res.data.timetable_id);
      setStatus('done');
    } catch (err) {
      setErrMsg(err.response?.data?.error || 'Generation failed');
      setStatus('error');
      setStep(-1);
    }
  };

  const years = ['2023-2024', '2024-2025', '2025-2026'];

  return (
    <div>
      <div className="card">
        <div className="card-title">Configure Timetable</div>

        {errMsg && <div className="alert alert-error">{errMsg}</div>}

        <div className="form-grid">
          <div className="form-group">
            <label>Select Department</label>
            <select value={form.department_id} onChange={e => setForm({ ...form, department_id: e.target.value })} disabled={status === 'running'}>
              <option value="">Select Department</option>
              {depts.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Select Semester</label>
            <select value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} disabled={status === 'running'}>
              <option value="">Select Semester</option>
              {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
            </select>
          </div>
          <div className="form-group">
            <label>Academic Year</label>
            <select value={form.academic_year} onChange={e => setForm({ ...form, academic_year: e.target.value })} disabled={status === 'running'}>
              {years.map(y => <option key={y}>{y}</option>)}
            </select>
          </div>
        </div>

        <button
          className="btn btn-primary btn-full"
          onClick={handleGenerate}
          disabled={status === 'running'}
          style={{ marginTop: 8 }}
        >
          {status === 'running' ? <><span className="spinner" /> Generating...</> : '✨ Generate Timetable'}
        </button>
      </div>

      {(status === 'running' || status === 'done') && (
        <div className="card">
          <div className="card-title" style={{ color: '#15803d' }}>🤖 AI Generation Status</div>
          <div className="status-steps">
            {STEPS.map((s, i) => (
              <div key={i} className="status-step">
                <div className={`step-check${i > step ? ' step-pending' : ''}`}>
                  {i <= step ? '✓' : ''}
                </div>
                <span style={{ color: i > step ? '#94a3b8' : '#1e293b' }}>{s}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {status === 'done' && (
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 48, marginBottom: 10 }}>✅</div>
          <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 6 }}>Timetable Generated Successfully!</div>
          <div style={{ fontSize: 13, color: '#64748b', marginBottom: 20 }}>
            {depts.find(d => d.id == form.department_id)?.name} · Semester {form.semester} · {form.academic_year}
          </div>
          <button className="btn btn-primary" onClick={() => navigate('/view')}>
            View Timetable →
          </button>
        </div>
      )}
    </div>
  );
}
