import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";

const StudentForm = ({ onSubmit, error, loading }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gpa, setGpa] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ name, email, gpa: parseFloat(gpa) });
    setName("");
    setEmail("");
    setGpa("");
  };

  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <UserPlus className="h-5 w-5 text-primary" />
          Оюутан бүртгэх
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="name" className="text-sm font-medium text-foreground">Нэр</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Bat-Erdene" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-sm font-medium text-foreground">И-мэйл</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="bat@example.com" required />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="gpa" className="text-sm font-medium text-foreground">GPA (0–4)</Label>
            <Input id="gpa" type="number" step="0.1" min="0" max="4" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="3.5" required />
          </div>
          {error && (
            <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? "Бүртгэж байна..." : "Бүртгэх"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default StudentForm;
