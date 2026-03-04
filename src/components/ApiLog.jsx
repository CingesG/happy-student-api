import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Terminal } from "lucide-react";

function statusColor(status) {
  if (status < 300) return "default";
  if (status < 500) return "destructive";
  return "secondary";
}

const ApiLog = ({ logs }) => {
  return (
    <Card className="border-border/60 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Terminal className="h-5 w-5 text-primary" />
          API Log
        </CardTitle>
      </CardHeader>
      <CardContent>
        {logs.length === 0 ? (
          <p className="text-sm text-muted-foreground">No API calls yet</p>
        ) : (
          <div className="max-h-48 space-y-1.5 overflow-y-auto">
            {logs.slice().reverse().map((log, i) => (
              <div key={i} className="flex items-center gap-2 rounded-md bg-muted/50 px-3 py-1.5 font-mono text-xs">
                <span className="font-semibold text-primary">{log.method}</span>
                <span className="text-foreground">{log.endpoint}</span>
                <Badge variant={statusColor(log.status)} className="ml-auto text-[10px]">{log.status}</Badge>
                {log.message && <span className="max-w-[180px] truncate text-muted-foreground">{log.message}</span>}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ApiLog;
