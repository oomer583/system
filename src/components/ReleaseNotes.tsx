import React from 'react';
import './ReleaseNotes.css';

interface Release {
  version: string;
  date: Date;
  features: string[];
  bugFixes: string[];
  improvements: string[];
}

const ReleaseNotes: React.FC = () => {
  const releases: Release[] = [
    {
      version: '1.0.0',
      date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      features: [
        'Temel uzak kontrol sistemi',
        'Cihaz yönetimi',
        'Realtime ekran yayını',
        'Touch ve keyboard input'
      ],
      bugFixes: [
        'Bağlantı stabilite sorunları',
        'Ekran kütüphanesi optimize'
      ],
      improvements: [
        'UI/UX iyileştirmeleri',
        'Performans optimizasyonları'
      ]
    },
    {
      version: '0.9.0',
      date: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000),
      features: [
        'Beta sürümü yayınlandı',
        'İlk test sürümü'
      ],
      bugFixes: [],
      improvements: ['İlk versiyonun temel özellikleri']
    }
  ];

  return (
    <div className="release-notes">
      <div className="release-header">
        <h2>📝 Sürüm Notları</h2>
        <p>Geçmiş güncellemeler ve değişiklikler</p>
      </div>

      <div className="releases-timeline">
        {releases.map((release, index) => (
          <div key={index} className="release-item">
            <div className="release-marker" />
            
            <div className="release-content">
              <div className="release-title">
                <h3>v{release.version}</h3>
                <span className="release-date">
                  {release.date.toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </span>
              </div>

              {release.features.length > 0 && (
                <div className="release-section">
                  <h4>✨ Yeni Özellikler</h4>
                  <ul>
                    {release.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {release.bugFixes.length > 0 && (
                <div className="release-section">
                  <h4>🐛 Hata Düzeltmeleri</h4>
                  <ul>
                    {release.bugFixes.map((fix, i) => (
                      <li key={i}>{fix}</li>
                    ))}
                  </ul>
                </div>
              )}

              {release.improvements.length > 0 && (
                <div className="release-section">
                  <h4>⚡ İyileştirmeler</h4>
                  <ul>
                    {release.improvements.map((imp, i) => (
                      <li key={i}>{imp}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReleaseNotes;
