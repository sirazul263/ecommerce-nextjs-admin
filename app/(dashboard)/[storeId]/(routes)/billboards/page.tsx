import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { BillboardClient } from "./components/client";

interface BillboardsProps {
  params: { storeId: string };
}

const BillboardsPage: React.FC<BillboardsProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient />
      </div>
    </div>
  );
};

export default BillboardsPage;
