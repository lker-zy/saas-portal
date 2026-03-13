# Portal Homepage Components Specification

This document contains the extracted content, structure, and styling data for the three missing React components needed to match the original portal homepage.

## Date
March 13, 2026

## Source
- Original Portal: http://localhost:3001
- Current Implementation: http://localhost:3000

---

## 1. CoverageSection Component

### Purpose
Display global coverage statistics showing 60+ countries with 99.99% availability.

### Content Structure

#### Main Data
```javascript
{
  title: "覆盖全球60+国家，可用性高达99.99%",
  features: [
    "满足各类场景",
    "多种协议",
    "10G+高速带宽",
    "定制化服务"
  ],
  countries: [
    { name: "美国", ips: "468327 IPS", flag: "🇺🇸" },
    { name: "加拿大", ips: "468327 IPS", flag: "🇨🇦" },
    { name: "英国", ips: "468327 IPS", flag: "🇬🇧" },
    { name: "法国", ips: "468327 IPS", flag: "🇫🇷" },
    { name: "印尼", ips: "468327 IPS", flag: "🇮🇩" },
    { name: "香港 中国", ips: "468327 IPS", flag: "🇭🇰" },
    { name: "印度", ips: "468327 IPS", flag: "🇮🇳", status: "已售罄", action: "补货通知" },
    { name: "韩国", ips: "468327 IPS", flag: "🇰🇷" },
    { name: "德国", ips: "468327 IPS", flag: "🇩🇪" },
    { name: "巴西", ips: "468327 IPS", flag: "🇧🇷" },
    { name: "日本", ips: "468327 IPS", flag: "🇯🇵" }
  ],
  viewMore: "查看更多国家",
  stats: [
    { number: "60+", label: "覆盖国家" },
    { number: "99.99%", label: "可用性" },
    { number: "10G+", label: "高速带宽" }
  ]
}
```

#### Layout Structure
1. **Header Section**
   - Main title with highlighted "99.99%" in blue
   - Feature tags separated by "|"

2. **Country Grid**
   - Grid layout with responsive columns
   - Each country card shows:
     - Country flag (emoji)
     - Country name
     - IP count (468327 IPS)
     - Status indicator (sold out for India)
     - Notify button for sold out items

3. **View More Button**
   - Centered button with arrow icon
   - "查看更多国家" text

4. **Statistics Summary**
   - Three stats in a row
   - Large numbers with labels below

#### Visual Elements
- Background: Light gradient (#f8fafc to #e2e8f0)
- Cards: White with subtle shadows
- Highlight color: Blue (#3b82f6)
- Hover effects: Transform translateY and shadow
- Border radius: 16px for cards
- Spacing: 20px gap between grid items

#### Interactive Elements
- Country card hover: Lift effect with shadow
- Sold out cards: Different styling, "补货通知" button
- Selected state: Blue border and gradient background

---

## 2. PricingSection Component

### Purpose
Display three-tier pricing structure for different proxy types (Static/Dynamic/Data Center IPs).

### Content Structure

#### Main Data
```javascript
{
  title: "选择代理套餐",
  subtitle: "灵活的定价方案，满足不同业务需求",
  billingCycle: "monthly" | "yearly",
  plans: [
    {
      id: "static",
      name: "静态住宅IP",
      icon: "🏠",
      description: "高质量纯净住宅IP，稳定可靠",
      price: {
        monthly: 0.15,
        yearly: 0.12
      },
      unit: "IP / 天",
      features: [
        "多协议支持",
        "多地域接入",
        "多行业适配",
        "99.99% 可用性",
        "24/7 技术支持"
      ],
      popular: true,
      badge: "最受欢迎"
    },
    {
      id: "dynamic",
      name: "动态住宅IP",
      icon: "🔄",
      description: "真实住宅IP池，自动轮换",
      price: {
        monthly: 0.08,
        yearly: 0.06
      },
      unit: "IP / 天",
      features: [
        "多协议支持",
        "多地域接入",
        "多行业适配",
        "自动IP轮换",
        "无限并发"
      ],
      popular: false
    },
    {
      id: "datacenter",
      name: "数据中心IP",
      icon: "🖥️",
      description: "高性能数据中心IP，极速稳定",
      price: {
        monthly: 0.05,
        yearly: 0.04
      },
      unit: "IP / 天",
      features: [
        "多协议支持",
        "多地域接入",
        "多行业适配",
        "极速连接",
        "高性价比"
      ],
      popular: false
    }
  ]
}
```

#### Layout Structure
1. **Header Section**
   - Main title
   - Subtitle
   - Billing toggle (monthly/yearly with discount badge)

2. **Pricing Cards**
   - Three cards in a responsive grid
   - Each card contains:
     - Popular badge (for static plan)
     - Icon/emoji
     - Plan name
     - Description
     - Price (large currency + amount)
     - Price unit
     - Features list with checkmarks
     - CTA button

3. **Trust Badges**
   - Security, support, and refund badges
   - Icons with text labels

#### Visual Elements
- Background: White
- Cards: White with borders
- Popular card: Blue border with gradient background
- Price: Large, prominent typography
- Features: Green checkmark icons
- CTA buttons: Gradient blue for popular, gray for others
- Box shadow: Subtle on cards, stronger on hover

#### Interactive Elements
- Billing toggle: Switch between monthly/yearly prices
- Card hover: Lift effect with enhanced shadow
- Card selection: Border color change and background gradient
- CTA buttons: Scale effect on hover

---

## 3. QuickStartSection Component

### Purpose
Guide users through three simple steps to get started with the proxy service.

### Content Structure

#### Main Data
```javascript
{
  title: "如何快速上手使用？",
  subtitle: "三步开启您的全球代理之旅",
  steps: [
    {
      number: "01",
      icon: "🎯",
      title: "简单选择您的代理需求",
      description: "仅需几步，轻松定义您的代理配置。从选择国家/地区和具体使用场景（如跨境电商、社交媒体），到设定IP级别、使用终端和交付协议，每项选择都将精准匹配您的业务场景。",
      details: [
        "选择国家/地区",
        "选择使用场景",
        "设定IP级别",
        "选择使用终端",
        "配置交付协议"
      ]
    },
    {
      number: "02",
      icon: "⚡",
      title: "智能推荐方案",
      description: "基于您在第一步中确定的多维度业务场景，我们的智能系统将自动为您生成一套高度匹配的代理推荐方案。告别繁琐选择，高效找到最适合您的代理服务组合。",
      details: [
        "AI智能分析",
        "自动匹配方案",
        "性价比优化",
        "性能预估",
        "兼容性检查"
      ]
    },
    {
      number: "03",
      icon: "🚀",
      title: "一键下单，体验高速服务",
      description: "专属方案为您量身定制，点击立即下单可直接跳转到购买页面，系统将自动填充完您所有配置，无论是集成至软件路由、指纹浏览器，还是代理客户端都能轻松部署，即刻享受稳定、高速的全球代理服务。",
      details: [
        "自动填充配置",
        "支持多种集成方式",
        "即时生效",
        "24/7 技术支持",
        "性能监控"
      ]
    }
  ],
  cta: {
    buttonText: "立即开始",
    note: "无需信用卡 · 免费试用 · 随时取消"
  },
  helpLinks: [
    { text: "需要帮助？查看使用指南", url: "/help" },
    { text: "联系技术支持", url: "/contact" }
  ]
}
```

#### Layout Structure
1. **Header Section**
   - Main title
   - Subtitle

2. **Steps Container**
   - Vertical stack of step cards
   - Each step contains:
     - Step number (01, 02, 03) in gradient circle
     - Step icon (emoji)
     - Step title
     - Step description
     - Detail tags in pill shapes
   - Connector arrows between steps

3. **CTA Section**
   - Large gradient button with arrow
   - Trust note below button

4. **Help Links**
   - Two links with icons
   - Help center and contact support

#### Visual Elements
- Background: Light gradient (#f8fafc to #e2e8f0)
- Step cards: White with shadows
- Step numbers: Gradient circles (blue to purple)
- Detail tags: Pill-shaped with blue dots
- Connector arrows: Dashed gradient lines
- CTA button: Large gradient blue
- Typography: Clear hierarchy with large numbers

#### Interactive Elements
- Step card hover: Lift effect with enhanced shadow
- CTA button hover: Arrow animation
- Help links: Underline on hover
- Connector animations: Subtle gradient flow

---

## Implementation Notes

### File Structure
```
src/components/
├── CoverageSection.jsx
├── CoverageSection.css
├── PricingSection.jsx
├── PricingSection.css
├── QuickStartSection.jsx
└── QuickStartSection.css
```

### Integration into HomePage.jsx
```javascript
import CoverageSection from './CoverageSection';
import PricingSection from './PricingSection';
import QuickStartSection from './QuickStartSection';

// In HomePage component, after UseCasesSection:
<CoverageSection />
<PricingSection />
<QuickStartSection />
```

### Responsive Design
All components should be responsive with breakpoints at:
- Desktop: 1200px+
- Tablet: 768px - 1199px
- Mobile: < 768px

### Color Palette
- Primary Blue: #3b82f6
- Secondary Purple: #8b5cf6
- Text Dark: #1e293b
- Text Gray: #64748b
- Background Light: #f8fafc
- Background Gray: #e2e8f0

### Typography
- Headings: 48px (desktop), 32px (mobile)
- Subheadings: 24px (desktop), 20px (mobile)
- Body: 18px (desktop), 16px (mobile)
- Font Weight: 400-700
- Line Height: 1.2-1.6

### Spacing
- Section padding: 80px 20px (desktop), 60px 16px (mobile)
- Card padding: 40px (desktop), 32px (mobile)
- Gap between elements: 20-32px

### Shadows
- Subtle: 0 4px 6px -1px rgba(0, 0, 0, 0.1)
- Medium: 0 8px 16px rgba(0, 0, 0, 0.1)
- Strong: 0 20px 25px -5px rgba(0, 0, 0, 0.1)

### Border Radius
- Cards: 16-20px
- Buttons: 12px
- Pills: 20px

### Transitions
- Duration: 0.3s ease
- Hover effects: transform translateY
- Color transitions: smooth color changes

---

## Testing Checklist

### CoverageSection
- [ ] All countries display correctly
- [ ] Country flags are visible
- [ ] Sold out status shows for India
- [ ] Notify button works for sold out items
- [ ] View more button is clickable
- [ ] Statistics display correctly
- [ ] Responsive layout on mobile

### PricingSection
- [ ] All three plans display
- [ ] Monthly/yearly toggle works
- [ ] Prices update correctly with toggle
- [ ] Popular badge shows on static plan
- [ ] Feature lists display with checkmarks
- [ ] CTA buttons are clickable
- [ ] Trust badges display
- [ ] Responsive layout on mobile

### QuickStartSection
- [ ] All three steps display
- [ ] Step numbers are visible
- [ ] Detail tags show correctly
- [ ] Connector arrows display between steps
- [ ] CTA button is clickable
- [ ] Help links work
- [ ] Responsive layout on mobile

---

## Assets Required

### Icons
- Country flags: Use emoji or SVG flag icons
- Plan icons: 🏠 🔄 🖥️ (or equivalent SVG icons)
- Step icons: 🎯 ⚡ 🚀 (or equivalent SVG icons)
- UI icons: Arrow, checkmark, help, security, etc.

### Images
- No images required for these components
- All icons can be SVG or emoji-based

---

## Future Enhancements

### CoverageSection
- Add world map visualization
- Real-time availability indicators
- Country search/filter functionality
- Click to view detailed country info

### PricingSection
- Annual billing discount calculator
- Feature comparison table
- Custom plan builder
- Enterprise plan contact form

### QuickStartSection
- Interactive step-by-step wizard
- Video tutorials for each step
- Progress indicator
- Skip to dashboard option

---

## Maintenance Notes

### Content Updates
- Country availability: Update daily/weekly
- Pricing: Update based on business decisions
- Feature lists: Keep aligned with actual capabilities

### Performance
- Lazy load country grid if many countries
- Optimize SVG icons
- Consider CSS animations over JavaScript

### Accessibility
- ARIA labels for interactive elements
- Keyboard navigation support
- Screen reader compatibility
- Focus indicators
- Color contrast compliance

---

## Conclusion

These three components will bring the current portal implementation to feature parity with the original, adding critical content for user decision-making and onboarding. The components are designed to be:

1. **Visually consistent** with the existing design system
2. **Fully responsive** across all device sizes
3. **Interactive** with smooth animations and transitions
4. **Accessible** following WCAG guidelines
5. **Maintainable** with clear structure and documentation

All extracted data and specifications are based on the actual content from the original portal at localhost:3001.
