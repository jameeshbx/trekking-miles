import SmartFeature from "./components/smartFeature";
import HowItWorks from "./components/working";
import SeeItInAction from "./components/wVideo";

export default function Home() {
  return (
    <div>
      <HowItWorks/>
      <SeeItInAction/>
      <SmartFeature/>
    </div>
  );
}