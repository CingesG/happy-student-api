import { useState, useEffect } from "react";
import { studentController } from "@/controllers/studentController";
import StudentForm from "@/components/StudentForm";
import StudentTable from "@/components/StudentTable";
import ApiLog from "@/components/ApiLog";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Server } from "lucide-react";

const Index = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  const addLog = (method, endpoint, status, message) => {
    setLogs((prev) => [...prev, { method, endpoint, status, message, timestamp: new Date().toISOString() }]);
  };

  const loadStudents = () => {
    const res = studentController.getStudents();
    addLog("GET", "/students", res.status);
    if (res.data) setStudents(res.data);
  };

  useEffect(() => {
    addLog("GET", "/health", 200, "ok: true");
    loadStudents();
  }, []);

  const handleCreate = (data) => {
    setError(null);
    const res = studentController.createStudent(data);
    addLog("POST", "/students", res.status, res.error?.message);
    if (res.error) {
      setError(res.error.message);
    } else {
      loadStudents();
    }
  };

  const handleDelete = (id) => {
    const res = studentController.deleteStudent(id);
    addLog("DELETE", `/students/${id}`, res.status, res.error?.message);
    if (res.data) loadStudents();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border/60 bg-card">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Student Management</h1>
              <p className="text-xs text-muted-foreground">Layered Architecture Demo</p>
            </div>
          </div>
          <Badge variant="outline" className="gap-1.5 border-success/40 text-success">
            <Server className="h-3 w-3" />
            localhost:4000
          </Badge>
        </div>
      </header>

      <div className="container py-4">
        <div className="flex flex-wrap gap-2">
          {["Controller", "Service", "Repository", "DTO", "AppError"].map((layer) => (
            <Badge key={layer} variant="secondary" className="text-xs">{layer}</Badge>
          ))}
        </div>
      </div>

      <main className="container pb-12">
        <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
          <div className="space-y-6">
            <StudentForm onSubmit={handleCreate} error={error} />
            <ApiLog logs={logs} />
          </div>
          <StudentTable students={students} onDelete={handleDelete} />
        </div>
      </main>
    </div>
  );
};

export default Index;
