const pool = require('./pool');

const createTables = async () => {
  const queries = [
    `CREATE TABLE IF NOT EXISTS users (
      id SERIAL PRIMARY KEY,
      username VARCHAR(100) UNIQUE NOT NULL,
      password VARCHAR(255) NOT NULL,
      role VARCHAR(20) DEFAULT 'admin',
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS departments (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) UNIQUE NOT NULL,
      code VARCHAR(20) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS faculty (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      email VARCHAR(150) UNIQUE NOT NULL,
      department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS subjects (
      id SERIAL PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      code VARCHAR(30) NOT NULL,
      department_id INTEGER REFERENCES departments(id) ON DELETE SET NULL,
      semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 8),
      is_lab BOOLEAN DEFAULT FALSE,
      credits INTEGER DEFAULT 3,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS classrooms (
      id SERIAL PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      capacity INTEGER DEFAULT 60,
      is_lab BOOLEAN DEFAULT FALSE,
      created_at TIMESTAMP DEFAULT NOW()
    )`,

    `CREATE TABLE IF NOT EXISTS timetables (
      id SERIAL PRIMARY KEY,
      department_id INTEGER REFERENCES departments(id) ON DELETE CASCADE,
      semester INTEGER NOT NULL,
      academic_year VARCHAR(20) NOT NULL,
      status VARCHAR(20) DEFAULT 'draft',
      created_at TIMESTAMP DEFAULT NOW(),
      updated_at TIMESTAMP DEFAULT NOW(),
      UNIQUE(department_id, semester, academic_year)
    )`,

    `CREATE TABLE IF NOT EXISTS timetable_slots (
      id SERIAL PRIMARY KEY,
      timetable_id INTEGER REFERENCES timetables(id) ON DELETE CASCADE,
      day_of_week VARCHAR(15) NOT NULL,
      start_time TIME NOT NULL,
      end_time TIME NOT NULL,
      subject_id INTEGER REFERENCES subjects(id) ON DELETE SET NULL,
      faculty_id INTEGER REFERENCES faculty(id) ON DELETE SET NULL,
      classroom_id INTEGER REFERENCES classrooms(id) ON DELETE SET NULL,
      slot_type VARCHAR(20) DEFAULT 'lecture',
      created_at TIMESTAMP DEFAULT NOW()
    )`,
  ];

  for (const query of queries) {
    await pool.query(query);
  }

  console.log('✅ All tables created successfully');
};

const seedData = async () => {
  // Seed departments
  const depts = [
    { name: 'Computer Science', code: 'CSE' },
    { name: 'Electronics', code: 'ECE' },
    { name: 'Mechanical', code: 'MECH' },
    { name: 'Civil', code: 'CIVIL' },
  ];

  for (const d of depts) {
    await pool.query(
      `INSERT INTO departments (name, code) VALUES ($1, $2) ON CONFLICT (code) DO NOTHING`,
      [d.name, d.code]
    );
  }

  // Seed classrooms
  const rooms = [
    { name: 'Room 101', capacity: 60, is_lab: false },
    { name: 'Room 102', capacity: 60, is_lab: false },
    { name: 'Room 103', capacity: 60, is_lab: false },
    { name: 'Lab 1', capacity: 30, is_lab: true },
    { name: 'Lab 2', capacity: 30, is_lab: true },
    { name: 'Lab 3', capacity: 30, is_lab: true },
  ];

  for (const r of rooms) {
    await pool.query(
      `INSERT INTO classrooms (name, capacity, is_lab) VALUES ($1, $2, $3) ON CONFLICT DO NOTHING`,
      [r.name, r.capacity, r.is_lab]
    );
  }

  // Seed admin user (password: admin123)
  const bcrypt = require('bcryptjs');
  const hash = await bcrypt.hash('admin123', 10);
  await pool.query(
    `INSERT INTO users (username, password, role) VALUES ($1, $2, $3) ON CONFLICT (username) DO NOTHING`,
    ['admin', hash, 'admin']
  );

  console.log('✅ Seed data inserted');
};

const initDB = async () => {
  try {
    await createTables();
    await seedData();
  } catch (err) {
    console.error('❌ DB init error:', err.message);
    throw err;
  }
};

module.exports = initDB;
