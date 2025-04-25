import { signOut } from "@/src/auth"
import { Button } from "./ui/button"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">Выйти из аккаунта</Button>
    </form>
  )
}