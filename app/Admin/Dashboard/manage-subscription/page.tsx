import { subscriptions } from "@/data/subscriptions";
import { TopBarContainer } from "../../(components)/TobBarContainer";
import { SubscriptionTable } from "./manage-subscription";



export default function managedmc() {
  return (
     <div className="flex flex-col min-h-screen bg-gray-50">
           <div className="sticky top-0 z-10">
             <TopBarContainer />
           </div>
           <main className="min-h-screen p-6 md:p-8 lg:p-10">
           <SubscriptionTable subscriptions={subscriptions} />
           </main>
           </div>
  );
}