import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getLawyerById, updateLawyerStatus } from "../services/lawyerService";
import { REJECTION_REASONS } from "../constants/rejectionReasons";

const LawyerDetails = () => {
  const { uid } = useParams();
  const navigate = useNavigate();
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rejectMode, setRejectMode] = useState(false);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchLawyer = async () => {
      const data = await getLawyerById(uid);
      setLawyer(data);
      setLoading(false);
    };
    fetchLawyer();
  }, [uid]);

  const handleReasonToggle = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleAccept = async () => {
    setSubmitting(true);
    await updateLawyerStatus(uid, "accepted");
    navigate("/admin/lawyers");
  };

  const handleReject = async () => {
    if (selectedReasons.length === 0) return;
    setSubmitting(true);
    await updateLawyerStatus(uid, "rejected", selectedReasons);
    navigate("/admin/lawyers");
  };

  const formatDate = (date) => {
    if (!date) return "—";
    if (date.toDate) return date.toDate().toLocaleDateString();
    if (typeof date === "string" || date instanceof Date)
      return new Date(date).toLocaleDateString();
    return "—";
  };

  if (loading) return <div className="text-center p-8">جاري التحميل...</div>;
  if (!lawyer) return <div className="text-center p-8">المحامي غير موجود</div>;

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        <div className="flex flex-col sm:flex-row gap-4 items-start">
          <img
            src={lawyer.profilePictureUrl}
            alt="صورة المحامي"
            className="w-32 h-32 rounded-full object-cover border"
          />
          <div className="flex-1 space-y-2">
            <h2 className="text-2xl font-bold">{lawyer.fullName}</h2>
            <p className="text-gray-600">البريد الإلكتروني: {lawyer.email}</p>
            <p className="text-gray-600">الهاتف: {lawyer.phone}</p>
            <p className="text-gray-600">الرقم القومي: {lawyer.nationalId}</p>
            <p className="text-gray-600">المحافظة: {lawyer.governorate}</p>
            <p className="text-gray-600">العنوان: {lawyer.address}</p>
            <p className="text-gray-600">
              تاريخ الميلاد: {formatDate(lawyer.dateOfBirth)}
            </p>
            <p className="text-gray-600">النوع: {lawyer.gender}</p>
            <p className="text-gray-600">نبذة: {lawyer.bio || "لا يوجد"}</p>
            <p className="text-gray-600">
              التخصص: {lawyer.specialty?.join(" - ") || "غير محدد"}
            </p>
            <p className="text-gray-600">
              رقم القيد: {lawyer.registrationNumber}
            </p>
            <p className="text-gray-600">
              تاريخ القيد: {formatDate(lawyer.registrationDate)}
            </p>
            <p className="text-gray-600">البنك: {lawyer.bankName}</p>
            <p className="text-gray-600">
              صاحب الحساب: {lawyer.accountHolderName}
            </p>
            <p className="text-gray-600">رقم الحساب: {lawyer.accountNumber}</p>
            <p className="text-gray-600">
              مكالمات: {lawyer.offersCall ? "نعم" : "لا"} بسعر{" "}
              {lawyer.callPrice}ج
            </p>
            <p className="text-gray-600">
              مقابلات: {lawyer.offersOffice ? "نعم" : "لا"} بسعر{" "}
              {lawyer.officePrice}ج
            </p>
            <p className="text-gray-600">
              نوع الاشتراك: {lawyer.subscriptionType}
            </p>
            <p className="text-gray-600">
              تاريخ البدء: {formatDate(lawyer.subscriptionStart) || "غير محدد"}
            </p>
            <p className="text-gray-600">
              تاريخ الانتهاء: {formatDate(lawyer.subscriptionEnd) || "غير محدد"}
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-bold mb-1">صورة كارنيه النقابة:</h3>
          <img
            src={lawyer.cardImageUrl}
            alt="كارنيه النقابة"
            className="w-full max-w-md rounded-lg border"
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow space-y-4">
        {!rejectMode ? (
          <div className="flex gap-4">
            <button
              onClick={handleAccept}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              disabled={submitting}>
              قبول
            </button>
            <button
              onClick={() => setRejectMode(true)}
              className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
              رفض
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-gray-700 font-medium">اختر أسباب الرفض:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {REJECTION_REASONS.map((reason, index) => (
                <label key={index} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedReasons.includes(reason)}
                    onChange={() => handleReasonToggle(reason)}
                    className="accent-red-600"
                  />
                  <span>{reason}</span>
                </label>
              ))}
            </div>
            <div className="flex gap-4">
              <button
                onClick={handleReject}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                disabled={submitting}>
                تأكيد الرفض
              </button>
              <button
                onClick={() => setRejectMode(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition">
                إلغاء
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerDetails;
