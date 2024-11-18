import React from "react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import TownFilter from "./TownFilter";
import { Town } from "@/types/types";

type AdvertProps = {
  topAdUrl?: string;
  middleAdUrl?: string;
  bottomAdUrl?: string;
  // towns: { id: string; title: string }[]; 
  towns: Town[];
  onTownSelect: (townId: string) => void;
};



const SideAdverts: React.FC<AdvertProps> = ({
  topAdUrl,
  middleAdUrl,
  bottomAdUrl,
  towns,
   onTownSelect 
}) => {
  const router = useRouter();

  const handleTownClick = (townId: string) => {
    router.push(`/search?townId=${townId}`); // Navigate to filtered properties by town
  };

  const handleAdClick = (url: string) => {
    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div className="space-y-6">
      {/* List of Towns */}
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Filter by Town</h3>
        <TownFilter towns={towns} onSelect={onTownSelect} />
      </div>

      {/* Property Investment Opportunities */}
      <Card
        className={`cursor-pointer transition-all hover:shadow-lg ${
          middleAdUrl ? "opacity-100" : "opacity-50"
        }`}
        onClick={() =>
          handleAdClick(
            "https://www.cbz.co.zw/diaspora-foreign-denominated-individual-and-or-joint-mortgages/"
          )
        }
      >
        <CardHeader>
          <CardTitle>Diaspora Mortgages</CardTitle>
        
        </CardHeader>
        {topAdUrl && (
        <div onClick={() => handleAdClick(topAdUrl)} className="cursor-pointer">
          <img src={topAdUrl} alt="Mortgages" />
        </div>
      )}
      </Card>

      {/* Other Advertisements */}
      
      
    </div>
  );
};

export default SideAdverts;
