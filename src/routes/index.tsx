import { AccessibleButton } from "@/components/common/AccessibleButton";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Root,
});

function Root() {
  return (
    <AccessibleButton onPress={() => alert("clicked")}>Click</AccessibleButton>
  );
}
