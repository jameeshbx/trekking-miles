import Profile from "../profile/profile-admin";
import { TopBarContainer } from "@/app/admin/components/tobBarContainer";

export default function profile() {
  return (
    <div className="relative">
      <div className="w-full z-0 relative">
        <TopBarContainer />
      </div>
      <div className="w-[97%] mx-auto -mt-10 rounded-2xl overflow-hidden  relative z-10">
        <Profile />
      </div>
    </div>
  );
}