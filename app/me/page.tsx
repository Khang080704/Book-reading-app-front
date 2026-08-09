import { UserInfo } from "./_component/UserInfo";
import { getUserInfoAction } from "@/actions/user.action";

export default async function MePage() {
  const data = await getUserInfoAction();
  console.log(data);

  return (
    <UserInfo email={data.email} username={data.userName} />
  )
}
