// import { getServices } from "@/actions/services";
// import NewButton from "@/components/Dashboard/Doctor/NewButton";
// import PanelHeader from "@/components/Dashboard/Doctor/PanelHeader";
// import ServiceCard from "@/components/Dashboard/ServiceCard";
// import { ScrollArea } from "@/components/ui/scroll-area";
import NewButton from "@/components/Dashboard/NewButton";
import { LayoutGrid } from "lucide-react";
import React from "react";
export default async function page() {
//   const services = (await getServices()).data || [];
  return (
    <div>
      {/* Header */}

      {/* 2 PANNELS */}
      <div className="grid grid-cols-12">
        {/* LIST PANNEL */}
        <div className="lg:col-span-4 col-span-full  py-3 border-r border-gray-100">
          <div className="flex items-center justify-between">
            {/* <PanelHeader
              title="Services"
              count={services.length}
              icon={LayoutGrid}
            />
            <div className="lg:hidden">
              <NewButton title="New Service" href="/dashboard/services/new" />
            </div>
          </div> */}
          <div className="px-3">
            {/* <ScrollArea className="h-96 w-full ">
              {categories.map((category) => (
                <CategoryCard key={category?.title} category={category} />
              ))}
            </ScrollArea> */}
          </div>
        </div>

        <div className="lg:col-span-8 col-span-full hidden lg:block">
          <div className="py-2  border-b border-gray-200 flex items-center justify-end px-4">
            <div className="flex items-center gap-4">
              <NewButton title="New Property" href="/dashboard/properties/new" />
            </div>
          </div>
          <div className="flex h-1/2 items-center justify-center">
            <div className="py-4  px-6 text-center border border-gray-100 shadow-md rounded-md flex flex-col items-center gap-1 text-sm">
              <LayoutGrid />
              <div className="py-3">
                {" "}
                <p>
                  {/* You have {services.length.toString().padStart(2, "0")}{" "} */}
                  properties .
                </p>
              </div>
              <NewButton title="New Property" href="/dashboard/properties/new" />
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
