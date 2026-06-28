import React, { useEffect, useState } from 'react';
import api from '../api';

const EMPTY_FAC = { name: '', email: '', department_id: '' };
const EMPTY_SUB = { name: '', code: '', department_id: '', semester: '', is_lab: false, credits: 3 };

export default function FacultyPage() {
  const [tab, setTab] = useState('faculty');
  const [depts, setDepts] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [facForm, setFacForm] = useState(EMPTY_FAC);
  const [subForm, setSubForm] = useState(EMPTY_SUB);
  const [editFacId, setEditFacId] = useState(null);
  const [editSubId, setEditSubId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [err, setErr] = useState('');

  const flash = (type, text) => {
    if (type === 'ok') { setMsg(text); setErr(''); }
    else { setErr(text); setMsg(''); }
    setTimeout(() => { setMsg(''); setErr(''); }, 3000);
  };

  useEffect(() => {
    api.get('/departments').then(r => setDepts(r.data));
    api.get('/faculty').then(r => setFaculty(r.data));
    api.get('/subjects').then(r => setSubjects(r.data));
  }, []);

  // Faculty CRUD
  const saveFaculty = async () => {
    if (!facForm.name || !facForm.email || !facForm.department_id) return flash('err', 'All fields required');
    setLoading(true);
    try {
      if (editFacId) {
        await api.put(`/faculty/${editFacId}`, facForm);
        flash('ok', 'Faculty updated');
      } else {
        await api.post('/faculty', facForm);
        flash('ok', 'Faculty added');
      }
      const r = await api.get('/faculty');
      setFaculty(r.data);
      setFacForm(EMPTY_FAC);
      setEditFacId(null);
    } catch (e) { flash('err', e.response?.data?.error || 'Error'); }
    setLoading(false);
  };

  const deleteFaculty = async (id) => {
    if (!window.confirm('Delete this faculty?')) return;
    await api.delete(`/faculty/${id}`);
    setFaculty(f => f.filter(x => x.id !== id));
    flash('ok', 'Faculty deleted');
  };

  const editFaculty = (f) => {
    setFacForm({ name: f.name, email: f.email, department_id: f.department_id });
    setEditFacId(f.id);
  };

  // Subject CRUD
  const saveSubject = async () => {
    if (!subForm.name || !subForm.code || !subForm.department_id || !subForm.semester) return flash('err', 'All fields required');
    setLoading(true);
    try {
      if (editSubId) {
        await api.put(`/subjects/${editSubId}`, subForm);
        flash('ok', 'Subject updated');
      } else {
        await api.post('/subjects', subForm);
        flash('ok', 'Subject added');
      }
      const r = await api.get('/subjects');
      setSubjects(r.data);
      setSubForm(EMPTY_SUB);
      setEditSubId(null);
    } catch (e) { flash('err', e.response?.data?.error || 'Error'); }
    setLoading(false);
  };

  const deleteSubject = async (id) => {
    if (!window.confirm('Delete this subject?')) return;
    await api.delete(`/subjects/${id}`);
    setSubjects(s => s.filter(x => x.id !== id));
    flash('ok', 'Subject deleted');
  };

  const editSubject = (s) => {
    setSubForm({ name: s.name, code: s.code, department_id: s.department_id, semester: s.semester, is_lab: s.is_lab, credits: s.credits });
    setEditSubId(s.id);
  };

  return (
    <div>
      <div className="tabs">
        <div className={`tab${tab === 'faculty' ? ' active' : ''}`} onClick={() => setTab('faculty')}>Faculty Management</div>
        <div className={`tab${tab === 'subject' ? ' active' : ''}`} onClick={() => setTab('subject')}>Subject Management</div>
      </div>

      {msg && <div className="alert alert-success">{msg}</div>}
      {err && <div className="alert alert-error">{err}</div>}

      {tab === 'faculty' ? (
        <>
          <div className="card">
            <div className="card-title">{editFacId ? 'Edit Faculty' : 'Add Faculty'}</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Faculty Name</label>
                <input placeholder="e.g. Dr. Anjali Sharma" value={facForm.name} onChange={e => setFacForm({ ...facForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input type="email" placeholder="email@college.edu" value={facForm.email} onChange={e => setFacForm({ ...facForm, email: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select value={facForm.department_id} onChange={e => setFacForm({ ...facForm, department_id: e.target.value })}>
                  <option value="">Select Department</option>
                  {depts.map(d => <option key={d.id} value={d.id}>{d.name} ({d.code})</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={saveFaculty} disabled={loading}>
                {loading ? <span className="spinner" /> : (editFacId ? '✏️ Update Faculty' : '➕ Add Faculty')}
              </button>
              {editFacId && <button className="btn btn-outline" onClick={() => { setFacForm(EMPTY_FAC); setEditFacId(null); }}>Cancel</button>}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Faculty List ({faculty.length})</div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>ID</th><th>Name</th><th>Department</th><th>Email</th><th>Actions</th></tr></thead>
                <tbody>
                  {faculty.length === 0 ? (
                    <tr><td colSpan={5} className="empty-state">No faculty added yet</td></tr>
                  ) : faculty.map(f => (
                    <tr key={f.id}>
                      <td>{f.id}</td>
                      <td><strong>{f.name}</strong></td>
                      <td><span className="badge badge-blue">{f.dept_code}</span></td>
                      <td>{f.email}</td>
                      <td><div className="action-btns">
                        <button className="icon-btn edit" onClick={() => editFaculty(f)} title="Edit">✏️</button>
                        <button className="icon-btn del" onClick={() => deleteFaculty(f.id)} title="Delete">🗑️</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="card">
            <div className="card-title">{editSubId ? 'Edit Subject' : 'Add Subject'}</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Subject Name</label>
                <input placeholder="e.g. Data Structures" value={subForm.name} onChange={e => setSubForm({ ...subForm, name: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Subject Code</label>
                <input placeholder="e.g. CS301" value={subForm.code} onChange={e => setSubForm({ ...subForm, code: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Department</label>
                <select value={subForm.department_id} onChange={e => setSubForm({ ...subForm, department_id: e.target.value })}>
                  <option value="">Select Department</option>
                  {depts.map(d => <option key={d.id} value={d.id}>{d.name} ({d.code})</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Semester</label>
                <select value={subForm.semester} onChange={e => setSubForm({ ...subForm, semester: e.target.value })}>
                  <option value="">Select Semester</option>
                  {[1,2,3,4,5,6,7,8].map(s => <option key={s} value={s}>Semester {s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Credits</label>
                <input type="number" min={1} max={6} value={subForm.credits} onChange={e => setSubForm({ ...subForm, credits: e.target.value })} />
              </div>
              <div className="form-group" style={{ justifyContent: 'flex-end' }}>
                <label>&nbsp;</label>
                <div className="checkbox-group">
                  <input type="checkbox" id="islab" checked={subForm.is_lab} onChange={e => setSubForm({ ...subForm, is_lab: e.target.checked })} />
                  <label htmlFor="islab" style={{ cursor: 'pointer', fontSize: 13, color: '#374151' }}>Is Lab Subject?</label>
                </div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button className="btn btn-primary" onClick={saveSubject} disabled={loading}>
                {loading ? <span className="spinner" /> : (editSubId ? '✏️ Update Subject' : '➕ Add Subject')}
              </button>
              {editSubId && <button className="btn btn-outline" onClick={() => { setSubForm(EMPTY_SUB); setEditSubId(null); }}>Cancel</button>}
            </div>
          </div>

          <div className="card">
            <div className="card-title">Subject List ({subjects.length})</div>
            <div className="table-wrap">
              <table>
                <thead><tr><th>ID</th><th>Name</th><th>Code</th><th>Department</th><th>Semester</th><th>Credits</th><th>Type</th><th>Actions</th></tr></thead>
                <tbody>
                  {subjects.length === 0 ? (
                    <tr><td colSpan={8} className="empty-state">No subjects added yet</td></tr>
                  ) : subjects.map(s => (
                    <tr key={s.id}>
                      <td>{s.id}</td>
                      <td><strong>{s.name}</strong></td>
                      <td><code style={{ fontSize: 12, background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>{s.code}</code></td>
                      <td><span className="badge badge-green">{s.dept_code}</span></td>
                      <td>Sem {s.semester}</td>
                      <td>{s.credits}</td>
                      <td><span className={`badge ${s.is_lab ? 'badge-purple' : 'badge-blue'}`}>{s.is_lab ? 'Lab' : 'Theory'}</span></td>
                      <td><div className="action-btns">
                        <button className="icon-btn edit" onClick={() => editSubject(s)} title="Edit">✏️</button>
                        <button className="icon-btn del" onClick={() => deleteSubject(s.id)} title="Delete">🗑️</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
