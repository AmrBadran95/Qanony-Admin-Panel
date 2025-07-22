import { useEffect, useState } from "react";
import { getPendingLawyers } from "../services/lawyerService";
import LawyerCard from "../components/lawyers/LawyerCard";

const PendingLawyers = () => {
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

  if (loading) return <div className="text-center mt-10">جاري التحميل...</div>;

  if (lawyers.length === 0)
    return (
      <div className="text-center mt-10">لا يوجد محامين قيد المراجعة.</div>
    );

  return (
    <div className="grid gap-4">
      {lawyers.map((lawyer) => (
        <LawyerCard key={lawyer.uid} lawyer={lawyer} />
      ))}
    </div>
  );
};

export default PendingLawyers;
