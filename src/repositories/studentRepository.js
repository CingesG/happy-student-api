let students = [
  { id: "1", name: "Bat-Erdene", email: "baterdene@example.com", gpa: 3.8, createdAt: new Date().toISOString() },
  { id: "2", name: "Solongo", email: "solongo@example.com", gpa: 3.5, createdAt: new Date().toISOString() },
  { id: "3", name: "Temuulen", email: "temuulen@example.com", gpa: 2.9, createdAt: new Date().toISOString() },
];

let nextId = 4;

export const studentRepository = {
  findAll() {
    return [...students];
  },

  findByEmail(email) {
    return students.find((s) => s.email === email.toLowerCase());
  },

  create(data) {
    const student = {
      id: String(nextId++),
      name: data.name,
      email: data.email,
      gpa: data.gpa,
      createdAt: new Date().toISOString(),
    };
    students.push(student);
    return student;
  },

  deleteById(id) {
    const index = students.findIndex((s) => s.id === id);
    if (index === -1) return false;
    students.splice(index, 1);
    return true;
  },
};
