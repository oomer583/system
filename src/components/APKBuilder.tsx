import React, { useState } from 'react';
import './APKBuilder.css';

const APKBuilder: React.FC = () => {
  const [buildProgress, setBuildProgress] = useState(0);
  const [isBuilding, setIsBuilding] = useState(false);
  const [buildStatus, setBuildStatus] = useState<'idle' | 'building' | 'success' | 'error'>('idle');

  const handleBuild = async () => {
    setIsBuilding(true);
    setBuildStatus('building');
    setBuildProgress(0);

    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setBuildProgress(i);
    }

    setIsBuilding(false);
    setBuildStatus('success');
  };

  return (
    <div className="apk-builder">
      <div className="builder-header">
        <h2>📦 APK Builder</h2>
        <p>Android cihaz ajanı oluşturma</p>
      </div>

      <div className="builder-sections">
        <div className="builder-section">
          <h3>Yapı Konfigürasyonu</h3>
          <div className="config-group">
            <label>Uygulama Adı</label>
            <input type="text" placeholder="Örn: RemoteControl" />
          </div>
          <div className="config-group">
            <label>Paket Adı</label>
            <input type="text" placeholder="Örn: com.example.remotecontrol" />
          </div>
          <div className="config-group">
            <label>Versiyon</label>
            <input type="text" placeholder="1.0.0" />
          </div>
          <div className="config-group">
            <label>Hedef API Seviyesi</label>
            <select>
              <option>API 30</option>
              <option>API 31</option>
              <option>API 32</option>
              <option>API 33</option>
            </select>
          </div>
        </div>

        <div className="builder-section">
          <h3>İzinler</h3>
          <div className="permissions">
            <label className="permission-item">
              <input type="checkbox" defaultChecked />
              <span>Screen Capture</span>
            </label>
            <label className="permission-item">
              <input type="checkbox" defaultChecked />
              <span>Input Device</span>
            </label>
            <label className="permission-item">
              <input type="checkbox" defaultChecked />
              <span>Media Projection</span>
            </label>
            <label className="permission-item">
              <input type="checkbox" defaultChecked />
              <span>Accessibility Service</span>
            </label>
          </div>
        </div>

        {isBuilding && (
          <div className="builder-section">
            <h3>Yapı İlerleme</h3>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${buildProgress}%` }} />
            </div>
            <p className="progress-text">{buildProgress}% Tamamlandı</p>
          </div>
        )}

        {buildStatus === 'success' && (
          <div className="builder-section success-section">
            <h3>✓ Yapı Tamamlandı</h3>
            <div className="download-info">
              <p>RemoteControl-v1.0.0.apk (4.2 MB)</p>
              <button className="btn-download">⬇️ İndir</button>
            </div>
          </div>
        )}
      </div>

      <div className="builder-actions">
        <button 
          className="btn-build"
          onClick={handleBuild}
          disabled={isBuilding}
        >
          {isBuilding ? '⏳ Yapılandırılıyor...' : '🔨 Yapı Başlat'}
        </button>
        <button className="btn-preview">👁️ Önizleme</button>
      </div>
    </div>
  );
};

export default APKBuilder;
