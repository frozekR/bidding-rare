// app/sign-in/page.tsx
import { signIn } from "@/src/auth";
import { Button } from "./ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/" });
      }}
    >
      <Button type="submit">Войдите при помощи Google</Button>
    </form>
  );
}