import { useState } from "react";
import { X, Phone, Mail, User } from "lucide-react";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConsultationModal({ isOpen, onClose }: ConsultationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log("Form submitted:", formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full relative overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
        >
          <X className="h-6 w-6" />
        </button>

        {/* Modal content */}
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-[#D6A461]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="h-8 w-8 text-[#D6A461]" />
            </div>
            <h3 className="text-2xl font-bold text-[#333333] mb-2">
              Programează o Consultație
            </h3>
            <p className="text-[#666666]">
              Completează formularul de mai jos și te vom contacta în cel mai
              scurt timp.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
                  <User className="h-5 w-5" />
                </div>
                <input
                  type="text"
                  placeholder="Nume și Prenume"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#D6A461] transition-colors"
                  required
                />
              </div>

              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
                  <Phone className="h-5 w-5" />
                </div>
                <input
                  type="tel"
                  placeholder="Număr de telefon"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#D6A461] transition-colors"
                  required
                />
              </div>

              <div className="relative md:col-span-2">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-[#666666]">
                  <Mail className="h-5 w-5" />
                </div>
                <input
                  type="email"
                  placeholder="Adresa de email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full pl-10 pr-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#D6A461] transition-colors"
                  required
                />
              </div>
            </div>

            <div>
              <textarea
                placeholder="Mesaj (opțional)"
                value={formData.message}
                onChange={(e) =>
                  setFormData({ ...formData, message: e.target.value })
                }
                rows={4}
                className="w-full px-4 py-3 border border-[#E5E5E5] rounded-lg focus:outline-none focus:border-[#D6A461] transition-colors"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#D6A461] text-white py-4 rounded-lg font-medium hover:bg-[#C89551] transition-colors"
            >
              Trimite Cererea
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
