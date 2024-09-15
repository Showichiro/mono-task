import { AccessibleButton } from "@/components/common/AccessibleButton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  component: Login,
});

function Login() {
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="w-full">
            <AccessibleButton
              variant="outline"
              onPress={() => {
                window.location.href = "/api/auth/google/login";
              }}
            >
              Login with Google
            </AccessibleButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
