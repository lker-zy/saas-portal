import React from 'react';

const countries = [
  { name: '美国', flag: '/assets/American-DPZXoKWv.png', ips: '468327 IPS' },
  { name: '加拿大', flag: '/assets/Canada-DSFQHTRo.png', ips: '468327 IPS' },
  { name: '英国', flag: '/assets/UK-BnLVh2vy.png', ips: '468327 IPS' },
  { name: '法国', flag: '/assets/France-0eDr1Mh7.png', ips: '468327 IPS' },
  { name: '印尼', flag: '/assets/Indonesia-BABiG34B.png', ips: '468327 IPS' },
  { name: '香港 中国', flag: '/assets/Hong%20Kong-BRl05eMT.png', ips: '468327 IPS' },
  { name: '印度', flag: '/assets/Indie-C1HqC94-.png', ips: '468327 IPS', soldOut: true },
  { name: '韩国', flag: '/assets/Korea-Dl_Hzy49.png', ips: '468327 IPS' },
  { name: '德国', flag: '/assets/Germany-ByQPjjzs.png', ips: '468327 IPS' },
  { name: '巴西', flag: '/assets/Brazil-Beg36V3I.png', ips: '468327 IPS' },
  { name: '日本', flag: '/assets/Japan-CjiPYhFq.png', ips: '468327 IPS' },
];

function CoverageSection() {
  return (
    <section className="coverage-section">
      <h2 className="section-title">覆盖全球60+国家，可用性高达99.99%</h2>

      <div className="coverage-features">
        <div className="feature-item">满足各类场景</div>
        <div className="feature-divider">|</div>
        <div className="feature-item">多种协议</div>
        <div className="feature-divider">|</div>
        <div className="feature-item">10G+高速带宽</div>
        <div className="feature-divider">|</div>
        <div className="feature-item">定制化服务</div>
      </div>

      <div className="world-map">
        <img alt="世界地图" className="map-image" src="/assets/map-B2s9UNF1.png" />
      </div>

      <div className="country-list">
        {countries.map((country, index) => (
          <div key={index} className={`country-item ${country.soldOut ? 'oos-item' : ''}`}>
            <img alt={country.name} className="country-flag-img" src={country.flag} />
            <div className="country-info">
              <div className="country-name">{country.name}</div>
              <div className="country-ips">{country.ips}</div>
            </div>
            {country.soldOut && (
              <>
                <div className="oos-hover-layer">
                  <div className="oos-icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="oos-main-icon">
                      <path d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3.251l4.286 5.828M15 10.751l-4.286 5.828m4.286-5.828l-4.286-5.828m4.286 5.828H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5"></path>
                    </svg>
                    <span className="oos-icon-label">已售罄</span>
                  </div>
                  <button className="oos-hover-notify" data-region="IN">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"></path>
                      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"></path>
                    </svg>
                    补货通知
                  </button>
                </div>
                <span className="oos-corner-dot"></span>
              </>
            )}
          </div>
        ))}
        <div className="country-item more-countries">
          <div className="more-link">查看更多国家</div>
        </div>
      </div>
    </section>
  );
}

export default CoverageSection;
