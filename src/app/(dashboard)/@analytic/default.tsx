import React from 'react'

const AnalyticPage12 = () => {
  // Dữ liệu mẫu
  const stats = [
    { label: 'Tổng số người dùng', value: 1200 },
    { label: 'Tổng số phim', value: 350 },
    { label: 'Lượt xem hôm nay', value: 5400 },
    { label: 'Đánh giá trung bình', value: 4.5 },
  ]

  return (
    <div style={{ padding: 24 }}>
      <h2>Thống kê tổng quan</h2>
      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        {stats.map((item) => (
          <div
            key={item.label}
            style={{
              background: '#f5f5f5',
              padding: 20,
              borderRadius: 8,
              minWidth: 180,
              textAlign: 'center',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            }}
          >
            <div style={{ fontSize: 32, fontWeight: 700 }}>{item.value}</div>
            <div style={{ color: '#888', marginTop: 8 }}>{item.label}</div>
          </div>
        ))}
      </div>
      <h3>Biểu đồ lượt xem (giả lập)</h3>
      <div style={{ background: '#e3e8f0', height: 180, borderRadius: 8, display: 'flex', alignItems: 'flex-end', gap: 8, padding: 16 }}>
        {[80, 120, 60, 150, 100, 90, 130].map((h, i) => (
          <div
            key={i}
            style={{
              width: 30,
              height: h,
              background: '#3182ce',
              borderRadius: 4,
              transition: 'height 0.3s',
            }}
            title={`Ngày ${i + 1}: ${h * 30} lượt xem`}
          />
        ))}
      </div>
      <div style={{ marginTop: 8, color: '#666', fontSize: 14 }}>
        Biểu đồ lượt xem 7 ngày gần nhất (dữ liệu mẫu)
      </div>
    </div>
  )
}

export default AnalyticPage12
