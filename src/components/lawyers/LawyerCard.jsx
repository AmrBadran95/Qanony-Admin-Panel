import { Link } from "react-router";

const LawyerCard = ({ lawyer }) => {
  return (
    <div className="bg-white rounded-2xl shadow p-4 flex flex-col sm:flex-row gap-4">
      <img
        src={lawyer.profilePictureUrl}
        alt={lawyer.fullName}
        className="w-24 h-24 rounded-full object-cover border"
      />
      <div className="flex-1">
        <h2 className="text-xl font-bold text-gray-800">{lawyer.fullName}</h2>
        <p className="text-sm text-gray-600">
          الرقم القومي: {lawyer.nationalId}
        </p>
        <p className="text-sm text-gray-600">المحافظة: {lawyer.governorate}</p>
        <p className="text-sm text-gray-600">الهاتف: {lawyer.phone}</p>
        <p className="text-sm text-gray-600">
          التخصص: {lawyer.specialty?.[0] || "غير محدد"}
        </p>
      </div>
      <div className="flex items-center justify-end">
        <Link
          to={`/lawyers/${lawyer.uid}`}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition">
          عرض التفاصيل
        </Link>
      </div>
    </div>
  );
};

export default LawyerCard;
