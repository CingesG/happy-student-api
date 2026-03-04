import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trash2, GraduationCap } from "lucide-react";

function getGpaBadgeVariant(gpa) {
  if (gpa >= 3.5) return "default";
  if (gpa >= 2.5) return "secondary";
  return "destructive";
}

const StudentTable = ({ students, onDelete }) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <GraduationCap className="h-5 w-5 text-primary" />
          Оюутнууд ({students.length})
        </CardTitle>
      </CardHeader>
      <CardContent>
        {students.length === 0 ? (
          <p className="py-8 text-center text-muted-foreground">Оюутан бүртгэгдээгүй байна</p>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-12">ID</TableHead>
                  <TableHead>Нэр</TableHead>
                  <TableHead>И-мэйл</TableHead>
                  <TableHead className="w-24 text-center">GPA</TableHead>
                  <TableHead className="w-20 text-center">Устгах</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell className="font-mono text-xs text-muted-foreground">{s.id}</TableCell>
                    <TableCell className="font-medium text-foreground">{s.name}</TableCell>
                    <TableCell className="text-muted-foreground">{s.email}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant={getGpaBadgeVariant(s.gpa)}>{s.gpa.toFixed(1)}</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Button variant="ghost" size="icon" onClick={() => onDelete(s.id)} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default StudentTable;
