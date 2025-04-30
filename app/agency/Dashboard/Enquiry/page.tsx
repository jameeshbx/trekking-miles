import Enquirysection from "../Enquiry/enquiry-section";
import { TopBarContainer } from "@/app/Admin/components/tobBarContainer";

export default function Enquiry() {
  return (
    <div className="w-full  h-screen bg-gray-50 mx-auto">
      <div className="z-0 relative">
        <TopBarContainer />
      </div>
      <div className="h-screen overflow-hidden max-w-[1200px] w-full min-h-screen">
        <Enquirysection />
      </div>
    </div>
  );
}
