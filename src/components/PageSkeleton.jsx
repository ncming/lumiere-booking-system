/**
 * PageSkeleton — fallback nhẹ khi lazy page chunk đang load.
 * Hiển thị nền trắng + spinner nhỏ ở giữa để tránh flash.
 * Không dùng màu tối hay spinner quá nổi bật — giữ tone luxury.
 */
export default function PageSkeleton() {
  return (
    <div style={{
      minHeight: '60vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Spinner tối giản — 1 vòng tròn mảnh xoay */}
      <div style={{
        width: '32px',
        height: '32px',
        border: '1px solid #E0E0E0',
        borderTopColor: '#000',
        borderRadius: '50%',
        animation: 'spinnerRotate 0.8s linear infinite',
      }} />
      <style>{`
        @keyframes spinnerRotate {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
