import { useEffect, useState } from "react";
import { getPendingLawyers } from "../services/lawyerService";
import LawyerCard from "../components/lawyers/LawyerCard";

const LawyersList = () => {
  const [lawyers, setLawyers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      const data = await getPendingLawyers();
      setLawyers(data);
      setLoading(false);
    };

    fetchLawyers();
  }, []);

  if (loading) return <p className="text-center mt-10">جاري التحميل...</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800 text-right">
        قائمة المحامين في الانتظار
      </h1>
      {lawyers.map((lawyer) => (
        <LawyerCard key={lawyer.id} lawyer={lawyer} />
      ))}
    </div>
  );
};

export default LawyersList;
