@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background: #f1f5f9;
  color: #1e293b;
  font-size: 14px;
}

/* Layout */
.app-layout { display: flex; height: 100vh; overflow: hidden; }

/* Sidebar */
.sidebar {
  width: 220px;
  background: #0f172a;
  color: #fff;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}
.sidebar-brand {
  padding: 18px 16px;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  display: flex;
  align-items: center;
  gap: 10px;
}
.brand-icon {
  width: 36px; height: 36px;
  background: #4f46e5;
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
  font-size: 18px;
}
.brand-name { font-size: 13px; font-weight: 500; line-height: 1.35; }
.sidebar nav { flex: 1; padding: 10px 8px; }
.nav-item {
  display: flex; align-items: center; gap: 10px;
  padding: 9px 12px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 13px;
  color: rgba(255,255,255,0.6);
  margin-bottom: 2px;
  text-decoration: none;
  transition: background 0.15s, color 0.15s;
}
.nav-item:hover { background: rgba(255,255,255,0.07); color: #fff; }
.nav-item.active { background: #4f46e5; color: #fff; }
.nav-item svg { width: 17px; height: 17px; flex-shrink: 0; }
.sidebar-footer { padding: 10px 8px; border-top: 1px solid rgba(255,255,255,0.08); }

/* Main */
.main-area { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.topbar {
  background: #fff;
  border-bottom: 1px solid #e2e8f0;
  padding: 14px 24px;
  display: flex; align-items: center; justify-content: space-between;
  flex-shrink: 0;
}
.topbar h1 { font-size: 18px; font-weight: 600; }
.admin-pill {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; color: #64748b;
  background: #f8fafc;
  padding: 6px 12px;
  border-radius: 20px;
  border: 1px solid #e2e8f0;
}
.page-content { flex: 1; overflow-y: auto; padding: 24px; }

/* Cards */
.card {
  background: #fff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 20px;
}
.card-title { font-size: 15px; font-weight: 600; margin-bottom: 16px; color: #1e293b; }

/* Stats */
.stat-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; margin-bottom: 20px; }
.stat-card {
  background: #fff; border: 1px solid #e2e8f0; border-radius: 12px;
  padding: 20px; text-align: center;
}
.stat-icon {
  width: 48px; height: 48px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 10px; font-size: 22px;
}
.stat-label { font-size: 13px; color: #64748b; margin-bottom: 6px; }
.stat-num { font-size: 30px; font-weight: 600; color: #1e293b; }

/* Welcome banner */
.welcome-banner {
  background: #0f172a; color: #fff;
  border-radius: 12px; padding: 28px 32px;
  display: flex; align-items: center; justify-content: space-between;
}
.welcome-banner h2 { font-size: 20px; font-weight: 600; margin-bottom: 8px; }
.welcome-banner p { font-size: 13px; color: rgba(255,255,255,0.65); margin-bottom: 18px; }
.welcome-icon { font-size: 72px; opacity: 0.15; }

/* Buttons */
.btn { display: inline-flex; align-items: center; gap: 6px; padding: 9px 18px; border-radius: 8px; font-size: 13px; font-weight: 500; cursor: pointer; border: none; transition: all 0.15s; }
.btn-primary { background: #4f46e5; color: #fff; }
.btn-primary:hover { background: #4338ca; }
.btn-primary:disabled { background: #a5b4fc; cursor: not-allowed; }
.btn-outline { background: transparent; color: #374151; border: 1px solid #d1d5db; }
.btn-outline:hover { background: #f9fafb; }
.btn-danger { background: #ef4444; color: #fff; }
.btn-danger:hover { background: #dc2626; }
.btn-success { background: #22c55e; color: #fff; }
.btn-full { width: 100%; justify-content: center; padding: 11px; font-size: 14px; }

/* Forms */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 16px; }
.form-group { display: flex; flex-direction: column; gap: 5px; }
.form-group label { font-size: 12px; color: #64748b; font-weight: 500; }
.form-group input, .form-group select {
  padding: 9px 12px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  font-size: 13px;
  background: #fff;
  color: #1e293b;
  outline: none;
  transition: border-color 0.15s;
}
.form-group input:focus, .form-group select:focus { border-color: #4f46e5; }
.checkbox-group { display: flex; align-items: center; gap: 8px; }
.checkbox-group input { width: 16px; height: 16px; cursor: pointer; }

/* Tables */
.table-wrap { overflow-x: auto; }
table { width: 100%; border-collapse: collapse; font-size: 13px; }
th { text-align: left; padding: 10px 14px; background: #f8fafc; font-weight: 500; font-size: 12px; color: #64748b; border-bottom: 1px solid #e2e8f0; }
td { padding: 10px 14px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
tr:last-child td { border-bottom: none; }
tr:hover td { background: #fafafa; }

/* Badges */
.badge { display: inline-flex; align-items: center; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 500; }
.badge-blue { background: #dbeafe; color: #1d4ed8; }
.badge-green { background: #dcfce7; color: #15803d; }
.badge-amber { background: #fef9c3; color: #92400e; }
.badge-purple { background: #ede9fe; color: #6d28d9; }
.badge-red { background: #fee2e2; color: #b91c1c; }

/* Action buttons */
.action-btns { display: flex; gap: 6px; }
.icon-btn { border: none; background: none; cursor: pointer; padding: 5px; border-radius: 6px; font-size: 15px; display: flex; align-items: center; justify-content: center; }
.icon-btn:hover { background: #f1f5f9; }
.icon-btn.edit { color: #4f46e5; }
.icon-btn.del { color: #ef4444; }

/* Tabs */
.tabs { display: flex; border-bottom: 1px solid #e2e8f0; margin-bottom: 20px; }
.tab { padding: 10px 18px; font-size: 13px; cursor: pointer; color: #64748b; border-bottom: 2px solid transparent; margin-bottom: -1px; font-weight: 500; transition: all 0.15s; }
.tab.active { color: #4f46e5; border-bottom-color: #4f46e5; }
.tab:hover:not(.active) { color: #1e293b; }

/* Timetable grid */
.tt-wrap { overflow-x: auto; }
.tt-table { width: 100%; border-collapse: collapse; font-size: 12px; min-width: 700px; }
.tt-table th { background: #0f172a; color: #fff; padding: 10px 12px; text-align: center; font-size: 12px; border: 1px solid #1e293b; }
.tt-table td { border: 1px solid #e2e8f0; padding: 8px 10px; text-align: center; vertical-align: middle; line-height: 1.4; }
.tt-table .time-col { font-size: 11px; color: #64748b; background: #f8fafc; font-weight: 500; white-space: nowrap; min-width: 80px; }
.tt-table .lunch-row { background: #fefce8; color: #92400e; font-weight: 500; }
.tt-table .lab-cell { background: #ede9fe; color: #6d28d9; font-size: 11px; }
.tt-table .empty-cell { color: #cbd5e1; }

/* Status steps */
.status-steps { padding: 4px 0; }
.status-step { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f1f5f9; font-size: 13px; }
.status-step:last-child { border-bottom: none; }
.step-check { width: 24px; height: 24px; background: #22c55e; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; color: #fff; font-size: 13px; }
.step-pending { background: #e2e8f0; color: #94a3b8; }

/* Login */
.login-page { min-height: 100vh; background: linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%); display: flex; align-items: center; justify-content: center; }
.login-card { background: #fff; border-radius: 16px; padding: 40px 36px; width: 360px; box-shadow: 0 8px 32px rgba(79,70,229,0.1); }
.login-logo { text-align: center; margin-bottom: 28px; }
.login-logo-icon { width: 60px; height: 60px; background: #ede9fe; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; margin: 0 auto 14px; }
.login-logo h2 { font-size: 17px; font-weight: 600; color: #0f172a; }
.login-logo p { font-size: 13px; color: #64748b; margin-top: 4px; }
.input-wrap { position: relative; margin-bottom: 14px; }
.input-wrap svg { position: absolute; left: 11px; top: 50%; transform: translateY(-50%); color: #9ca3af; width: 16px; height: 16px; }
.input-wrap input { width: 100%; padding: 10px 12px 10px 36px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 13px; outline: none; transition: border-color 0.15s; }
.input-wrap input:focus { border-color: #4f46e5; }
.login-admin-link { text-align: center; margin-top: 14px; font-size: 12px; color: #4f46e5; cursor: pointer; }
.login-admin-link:hover { text-decoration: underline; }

/* Empty state */
.empty-state { text-align: center; padding: 40px 20px; color: #94a3b8; font-size: 13px; }
.empty-icon { font-size: 36px; margin-bottom: 10px; }

/* Filter row */
.filter-row { display: flex; align-items: flex-end; gap: 12px; margin-bottom: 20px; flex-wrap: wrap; }
.filter-row .form-group { flex: 1; min-width: 150px; }

/* Alert */
.alert { padding: 12px 16px; border-radius: 8px; font-size: 13px; margin-bottom: 16px; }
.alert-error { background: #fee2e2; color: #b91c1c; border: 1px solid #fca5a5; }
.alert-success { background: #dcfce7; color: #15803d; border: 1px solid #86efac; }

/* Spinner */
.spinner { width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff; border-radius: 50%; animation: spin 0.7s linear infinite; display: inline-block; }
@keyframes spin { to { transform: rotate(360deg); } }

/* Responsive */
@media (max-width: 768px) {
  .sidebar { width: 60px; }
  .brand-name, .nav-item span { display: none; }
  .stat-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}
