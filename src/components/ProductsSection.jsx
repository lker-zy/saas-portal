import React from 'react';

const products = [
  {
    id: 'static_residential',
    name: '静态住宅代理',
    desc: '真实家庭IP，高匿名性',
    features: ['真实IP', '高匿名', '稳定连接'],
    icon: '🏠',
    gradient: 'from-blue-500 to-blue-600',
    href: '/?tab=static_residential'
  },
  {
    id: 'dynamic_residential',
    name: '动态住宅代理',
    desc: '海量IP池，自动切换',
    features: ['海量IP', '自动切换', '覆盖全球'],
    icon: '🔄',
    gradient: 'from-emerald-500 to-emerald-600',
    href: '/?tab=dynamic_residential'
  },
  {
    id: 'datacenter',
    name: '数据中心代理',
    desc: '高速稳定，性价比高',
    features: ['高速稳定', '性价比高', '不限流量'],
    icon: '⚡',
    gradient: 'from-purple-500 to-purple-600',
    href: '/?tab=datacenter'
  },
  {
    id: 'static_isp',
    name: '静态ISP代理',
    desc: '运营商级IP，极致性能',
    features: ['运营商IP', '极致性能', '专属资源'],
    icon: '🌐',
    gradient: 'from-orange-500 to-orange-600',
    href: '/?tab=static_isp'
  }
];

function ProductsSection() {
  return (
    <section className="products-section">
      <div className="section-container">
        <h2 className="section-title">产品类型</h2>
        <p className="section-desc">
          为不同场景提供专业的代理解决方案
        </p>
        <div className="products-grid">
          {products.map((product) => (
            <a
              key={product.id}
              href={product.href}
              className="product-card"
            >
              <div className={`product-icon bg-gradient-to-br ${product.gradient}`}>
                {product.icon}
              </div>
              <h3 className="product-name">{product.name}</h3>
              <p className="product-desc">{product.desc}</p>
              <ul className="product-features">
                {product.features.map((feature, idx) => (
                  <li key={idx}>
                    <svg className="feature-check" width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProductsSection;
