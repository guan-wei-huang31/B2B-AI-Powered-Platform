import { AlertCircle, Home } from 'lucide-react';
import { useNavigate } from 'react-router';

import { Button } from '@/components/ui/button';

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4">
      <div className="flex flex-col items-center text-center max-w-md space-y-6">
        <h1 className="rounded-full bg-destructive/10 p-4">
          <AlertCircle className="h-12 w-12 text-destructive" />
        </h1>
        <h2 className="text-2xl font-semibold tracking-tight">Page not found</h2>
        <p className="text-muted-foreground">
          Sorry, we couldn't find the page you're looking for. It might have been moved, deleted, or
          never existed.
        </p>
        <div className="flex flex-col sm:flex-row gap-10">
          <Button onClick={() => navigate('/')}>
            <Home className="mr-2 h-4 w-4" />
            Back to home
          </Button>
          <Button variant="outline" onClick={() => navigate(-1)}>
            Go back
          </Button>
        </div>
      </div>
    </div>
  );
}
