import { useState } from 'react';
import { useApp } from '../context/AppContext';

const BOUTIQUES = [
  {
    id: 'trang-tien',
    name: 'Tràng Tiền Plaza',
    address: '24 Hai Bà Trưng, Hoàn Kiếm, Hà Nội',
    phone: '(024) 3936 ✦✦✦✦',
    hours: 'Daily 9:30 — 21:00',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'dong-khoi',
    name: 'Đồng Khởi',
    address: '92 Đồng Khởi, Bến Nghé, Quận 1, TP.HCM',
    phone: '(028) 3822 ✦✦✦✦',
    hours: 'Daily 9:30 — 21:00',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?q=80&w=800&auto=format&fit=crop',
  },
];

const STYLISTS = [
  {
    id: 's1',
    name: 'Nguyễn Linh',
    title: 'Senior Personal Stylist',
    specialty: 'Ready-To-Wear · Haute Couture',
    avatar: 'https://images.unsplash.com/photo-1589156280159-27698a70f29e?q=80&w=300&auto=format&fit=crop',
    lang: 'VI · EN · FR',
  },
  {
    id: 's2',
    name: 'Trần Minh Châu',
    title: 'Accessories Curator',
    specialty: 'Handbags · Jewellery · Fragrance',
    avatar: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?q=80&w=300&auto=format&fit=crop',
    lang: 'VI · EN',
  },
  {
    id: 's3',
    name: 'Phạm Khánh Vân',
    title: 'Beauty Consultant',
    specialty: 'Makeup · Skincare · Fragrance',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop',
    lang: 'VI · EN · KO',
  },
];

const TIME_SLOTS = [
  '10:00', '10:30', '11:00', '11:30',
  '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const OCCASIONS = [
  'Personal Styling', 'Gift Selection', 'Wedding Trousseau',
  'Corporate Wardrobe', 'Special Event', 'First Visit',
];

const Reserve = ({ setActiveTab }) => {
  const { showToast } = useApp();
  const [step, setStep] = useState(1);
  const [selectedBoutique, setSelectedBoutique] = useState(null);
  const [selectedStylist, setSelectedStylist] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = () => {
    setConfirmed(true);
    showToast('✦ Your appointment has been confirmed. See you soon.');
  };

  const stepLabel = ['', 'Select Boutique', 'Your Stylist & Time', 'Confirm'];

  if (confirmed) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '80px 20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          {/* Icon */}
          <div style={{ width: '80px', height: '80px', margin: '0 auto 32px', border: '1px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.2">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
          <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#757575', marginBottom: '12px', textTransform: 'uppercase' }}>
            Appointment Confirmed
          </div>
          <h2 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(24px, 4vw, 32px)', fontWeight: '400', letterSpacing: '2px', marginBottom: '20px' }}>
            We Look Forward<br/>To Welcoming You
          </h2>
          <div style={{ fontSize: '10px', color: '#757575', lineHeight: 1.8, marginBottom: '8px' }}>
            <strong style={{ color: '#000', letterSpacing: '1px' }}>{selectedBoutique?.name}</strong>
          </div>
          <div style={{ fontSize: '10px', color: '#757575', lineHeight: 1.8, marginBottom: '8px' }}>
            {selectedDate} at {selectedTime}
          </div>
          <div style={{ fontSize: '10px', color: '#757575', lineHeight: 1.8, marginBottom: '32px' }}>
            Stylist: {selectedStylist?.name}
          </div>
          <div style={{ height: '1px', backgroundColor: '#EEEEEE', margin: '28px 0' }} />
          <p style={{ fontSize: '10px', color: '#757575', lineHeight: 1.8, marginBottom: '32px' }}>
            A confirmation has been noted. Your personal stylist will prepare a curated selection ahead of your visit. Complimentary tea service will be arranged.
          </p>
          <button
            onClick={() => setActiveTab('/')}
            style={{ padding: '14px 40px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FFFFFF', paddingTop: '80px', paddingBottom: '80px' }}>

      {/* Page Header */}
      <div style={{ textAlign: 'center', padding: 'clamp(32px, 5vw, 56px) 20px 0' }}>
        <div style={{ fontSize: '8px', letterSpacing: '4px', color: '#757575', textTransform: 'uppercase', marginBottom: '12px' }}>
          Private Client Services
        </div>
        <h1 style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: '400', letterSpacing: '3px', marginBottom: '12px' }}>
          Reserve Your Experience
        </h1>
        <p style={{ fontSize: '11px', color: '#757575', letterSpacing: '0.5px', maxWidth: '480px', margin: '0 auto', lineHeight: 1.8 }}>
          Our stylists will prepare a curated selection tailored to your preferences in a private salon with complimentary service.
        </p>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0', padding: 'clamp(24px, 4vw, 40px) 20px', maxWidth: '600px', margin: '0 auto' }}>
        {[1, 2, 3].map((s, i) => (
          <div key={s} style={{ display: 'flex', alignItems: 'center', flex: s < 3 ? 1 : 0 }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: step >= s ? '#000' : '#FFFFFF',
                border: `1px solid ${step >= s ? '#000' : '#E0E0E0'}`,
                color: step >= s ? '#fff' : '#BDBDBD',
                fontSize: '10px', letterSpacing: '0.5px',
                transition: 'all 0.3s',
              }}>
                {step > s ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : s}
              </div>
              <div style={{ fontSize: '8px', letterSpacing: '1.5px', textTransform: 'uppercase', color: step === s ? '#000' : '#BDBDBD', whiteSpace: 'nowrap' }}>
                {stepLabel[s]}
              </div>
            </div>
            {s < 3 && (
              <div style={{ flex: 1, height: '1px', backgroundColor: step > s ? '#000' : '#E0E0E0', margin: '0 8px 20px', transition: 'background-color 0.3s' }} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '0 clamp(16px, 4vw, 40px)' }}>

        {/* ── STEP 1: Select Boutique ── */}
        {step === 1 && (
          <div>
            <div style={{ textAlign: 'center', fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '28px' }}>
              Choose your preferred location
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', gap: '16px', marginBottom: '32px' }}>
              {BOUTIQUES.map(b => (
                <div
                  key={b.id}
                  onClick={() => setSelectedBoutique(b)}
                  style={{
                    cursor: 'pointer',
                    border: `1px solid ${selectedBoutique?.id === b.id ? '#000' : '#E0E0E0'}`,
                    backgroundColor: selectedBoutique?.id === b.id ? '#000' : '#FFFFFF',
                    transition: 'all 0.3s',
                    overflow: 'hidden',
                  }}
                >
                  <div style={{ height: '180px', overflow: 'hidden' }}>
                    <img src={b.image} alt={b.name} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: selectedBoutique?.id === b.id ? 'brightness(0.6)' : 'brightness(0.85)', transition: 'filter 0.3s' }} />
                  </div>
                  <div style={{ padding: '20px', color: selectedBoutique?.id === b.id ? '#FFFFFF' : '#000' }}>
                    <div style={{ fontSize: '13px', fontWeight: '400', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '6px' }}>
                      {b.name}
                    </div>
                    <div style={{ fontSize: '10px', color: selectedBoutique?.id === b.id ? 'rgba(255,255,255,0.6)' : '#757575', lineHeight: 1.6 }}>
                      {b.address}
                    </div>
                    <div style={{ fontSize: '9px', color: selectedBoutique?.id === b.id ? 'rgba(255,255,255,0.4)' : '#BDBDBD', marginTop: '8px', letterSpacing: '1px' }}>
                      {b.hours}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={() => selectedBoutique && setStep(2)}
                disabled={!selectedBoutique}
                style={{
                  padding: '14px 40px',
                  backgroundColor: selectedBoutique ? '#000' : '#E0E0E0',
                  color: selectedBoutique ? '#fff' : '#BDBDBD',
                  border: 'none',
                  fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: selectedBoutique ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 2: Stylist & Time ── */}
        {step === 2 && (
          <div>
            {/* Stylist Selection */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '20px' }}>
                Select your stylist
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))', gap: '12px' }}>
                {STYLISTS.map(s => (
                  <div
                    key={s.id}
                    onClick={() => setSelectedStylist(s)}
                    style={{
                      cursor: 'pointer',
                      padding: '20px',
                      border: `1px solid ${selectedStylist?.id === s.id ? '#000' : '#E0E0E0'}`,
                      backgroundColor: selectedStylist?.id === s.id ? '#000' : '#FFFFFF',
                      transition: 'all 0.3s',
                      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '10px',
                    }}
                  >
                    <div style={{ width: '64px', height: '64px', borderRadius: '50%', overflow: 'hidden', border: `2px solid ${selectedStylist?.id === s.id ? 'rgba(255,255,255,0.4)' : '#E0E0E0'}` }}>
                      <img src={s.avatar} alt={s.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', fontWeight: '600', letterSpacing: '0.5px', color: selectedStylist?.id === s.id ? '#FFFFFF' : '#000', marginBottom: '4px' }}>{s.name}</div>
                      <div style={{ fontSize: '9px', color: selectedStylist?.id === s.id ? 'rgba(255,255,255,0.6)' : '#757575', letterSpacing: '0.5px', marginBottom: '4px' }}>{s.title}</div>
                      <div style={{ fontSize: '8px', color: selectedStylist?.id === s.id ? 'rgba(255,255,255,0.4)' : '#BDBDBD', letterSpacing: '1px' }}>{s.lang}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Date */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Preferred date
              </div>
              <input
                type="date"
                value={selectedDate}
                onChange={e => setSelectedDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={{
                  border: '1px solid #E0E0E0', padding: '12px 16px',
                  fontSize: '11px', letterSpacing: '0.5px', color: '#000',
                  backgroundColor: '#FFFFFF', outline: 'none', width: '200px',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
                }}
              />
            </div>

            {/* Time Slots */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Preferred time
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {TIME_SLOTS.map(t => (
                  <button
                    key={t}
                    onClick={() => setSelectedTime(t)}
                    style={{
                      padding: '10px 16px',
                      border: `1px solid ${selectedTime === t ? '#000' : '#E0E0E0'}`,
                      backgroundColor: selectedTime === t ? '#000' : '#FFFFFF',
                      color: selectedTime === t ? '#FFFFFF' : '#000',
                      fontSize: '10px', letterSpacing: '1px',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            {/* Occasion */}
            <div style={{ marginBottom: '36px' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '12px' }}>
                Occasion (optional)
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {OCCASIONS.map(o => (
                  <button
                    key={o}
                    onClick={() => setSelectedOccasion(selectedOccasion === o ? '' : o)}
                    style={{
                      padding: '8px 14px',
                      border: `1px solid ${selectedOccasion === o ? '#000' : '#E0E0E0'}`,
                      backgroundColor: selectedOccasion === o ? '#000' : '#FFFFFF',
                      color: selectedOccasion === o ? '#FFFFFF' : '#757575',
                      fontSize: '9px', letterSpacing: '1px', textTransform: 'uppercase',
                      cursor: 'pointer', transition: 'all 0.2s',
                    }}
                  >
                    {o}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(1)}
                style={{ padding: '14px 32px', backgroundColor: '#FFFFFF', color: '#000', border: '1px solid #E0E0E0', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                ← Back
              </button>
              <button
                onClick={() => (selectedStylist && selectedDate && selectedTime) && setStep(3)}
                disabled={!selectedStylist || !selectedDate || !selectedTime}
                style={{
                  padding: '14px 40px',
                  backgroundColor: (selectedStylist && selectedDate && selectedTime) ? '#000' : '#E0E0E0',
                  color: (selectedStylist && selectedDate && selectedTime) ? '#fff' : '#BDBDBD',
                  border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase',
                  cursor: (selectedStylist && selectedDate && selectedTime) ? 'pointer' : 'not-allowed', transition: 'all 0.2s',
                }}
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* ── STEP 3: Confirm ── */}
        {step === 3 && (
          <div style={{ maxWidth: '560px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '32px' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase' }}>
                Review your appointment
              </div>
            </div>

            {/* Summary Card */}
            <div style={{ border: '1px solid #EEEEEE', padding: '28px', marginBottom: '28px' }}>
              <SummaryRow label="Boutique" value={selectedBoutique?.name} />
              <SummaryRow label="Address" value={selectedBoutique?.address} small />
              <div style={{ height: '1px', backgroundColor: '#EEEEEE', margin: '16px 0' }} />
              <SummaryRow label="Stylist" value={selectedStylist?.name} />
              <SummaryRow label="Specialty" value={selectedStylist?.specialty} small />
              <div style={{ height: '1px', backgroundColor: '#EEEEEE', margin: '16px 0' }} />
              <SummaryRow label="Date" value={selectedDate} />
              <SummaryRow label="Time" value={selectedTime} />
              {selectedOccasion && <SummaryRow label="Occasion" value={selectedOccasion} />}
            </div>

            {/* Client Info */}
            <div style={{ marginBottom: '28px' }}>
              <div style={{ fontSize: '10px', color: '#757575', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '16px' }}>
                Your details
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <input
                  type="text"
                  placeholder="Full Name"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  style={{ border: 'none', borderBottom: '1px solid #E0E0E0', padding: '10px 0', fontSize: '11px', outline: 'none', background: 'transparent', letterSpacing: '0.5px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={clientPhone}
                  onChange={e => setClientPhone(e.target.value)}
                  style={{ border: 'none', borderBottom: '1px solid #E0E0E0', padding: '10px 0', fontSize: '11px', outline: 'none', background: 'transparent', letterSpacing: '0.5px', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
                />
              </div>
            </div>

            {/* VIP Note */}
            <div style={{ backgroundColor: '#F9F9F9', padding: '16px', marginBottom: '28px', borderLeft: '2px solid #000' }}>
              <div style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#000', marginBottom: '6px' }}>
                Included in your visit
              </div>
              <div style={{ fontSize: '10px', color: '#757575', lineHeight: 1.8 }}>
                Private fitting salon · Curated selection prepared · Complimentary tea service · Personalised lookbook
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button
                onClick={() => setStep(2)}
                style={{ padding: '14px 32px', backgroundColor: '#FFFFFF', color: '#000', border: '1px solid #E0E0E0', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                ← Back
              </button>
              <button
                onClick={handleConfirm}
                style={{ padding: '14px 40px', backgroundColor: '#000', color: '#fff', border: 'none', fontSize: '10px', letterSpacing: '2px', textTransform: 'uppercase', cursor: 'pointer' }}
              >
                Confirm Appointment
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Summary row helper
const SummaryRow = ({ label, value, small }) => (
  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '10px' }}>
    <span style={{ fontSize: '9px', letterSpacing: '2px', textTransform: 'uppercase', color: '#BDBDBD' }}>{label}</span>
    <span style={{ fontSize: small ? '10px' : '11px', color: small ? '#757575' : '#000', letterSpacing: '0.5px', textAlign: 'right', maxWidth: '60%', lineHeight: 1.4 }}>{value}</span>
  </div>
);

export default Reserve;
