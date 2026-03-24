/**
 * ProxyExportModal.jsx
 * 批量代理导出模态框
 *
 * 支持多种查看模式：
 * - guide: 新手引导（指纹浏览器、代理软件等场景教程）
 * - config: 配置文件（Clash/Surge/Shadowrocket/Quantumult X）
 * - table: 参数详情表（IP、地理位置、认证信息等）
 * - link: 列表文本（纯文本或标准URL格式）
 * - qr: 二维码（支持放大查看和左右切换）
 * - json: JSON配置导出
 *
 * 数据格式支持：
 * - 简化格式：{ ip, port, username, password, protocols, ...geoInfo }
 * - 真实API格式：{ accessNodes: [{ ipAddress, serverPort, clientConfig, ... }], ...geoInfo }
 *
 * @author Extracted from App.jsx
 * @since 2025-03-11
 */

import React, { useState, useEffect, useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  Zap,
  X,
  BookOpen,
  FileCode,
  Table2,
  Terminal,
  QrCode,
  FileText,
  Globe,
  Shield,
  Lock,
  Wifi,
  AppWindow,
  MapPin,
  Copy,
  DownloadCloud,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  EyeOff,
  CheckCircle2
} from 'lucide-react';

// 复制到剪贴板工具函数
const copyToClipboard = (text) => {
  if (typeof navigator !== 'undefined' && navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    navigator.clipboard.writeText(text).catch((err) => {
      console.warn('Copy failed:', err);
    });
  } else {
    // Fallback for older browsers or non-secure contexts
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.left = "-9999px";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.warn('Copy failed:', err);
    }
    document.body.removeChild(textArea);
  }
};

// 密码字段组件（显示/隐藏切换）
const PasswordField = ({ value }) => {
  const [show, setShow] = useState(false);
  return (
    <div className="flex items-center gap-2 group">
      <span className="font-mono text-xs text-gray-700 bg-gray-50 px-2 py-1 rounded border border-gray-200 min-w-[100px]">
        {show ? value : "••••••••"}
      </span>
      <button onClick={() => setShow(!show)} className="text-gray-400 hover:text-blue-600" type="button">
        {show ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
      </button>
      <button onClick={() => copyToClipboard(value)} className="text-gray-400 hover:text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" title="复制" type="button">
        <Copy className="w-3 h-3" />
      </button>
    </div>
  );
};

/**
 * 解析 clientConfig 字符串或对象
 * @param {string|object} clientConfig - 配置数据
 * @returns {object} 解析后的配置对象
 */
const parseClientConfig = (clientConfig) => {
  if (!clientConfig) return {};
  if (typeof clientConfig === 'string') {
    try {
      return JSON.parse(clientConfig);
    } catch (e) {
      console.error('Failed to parse clientConfig:', e);
      return {};
    }
  }
  return clientConfig;
};

/**
 * 从 accessNodes 数组中提取所有 inbounds
 * 新格式：clientConfig 直接是 inbound 内容（扁平化结构）
 * @param {object} ip - IP对象，包含 accessNodes 数组
 * @returns {Array} inbound 数组，每个 inbound 包含元数据
 */
const getAllInboundsFromAccessNodes = (ip) => {
  if (!ip.accessNodes || ip.accessNodes.length === 0) {
    return [];
  }

  const allInbounds = [];
  ip.accessNodes.forEach(accessNode => {
    try {
      const clientConfigObj = parseClientConfig(accessNode.clientConfig);

      // 新格式：clientConfig 直接是 inbound 内容（有 tag、port、protocol 字段）
      if (clientConfigObj.tag && clientConfigObj.port && clientConfigObj.protocol) {
        allInbounds.push({
          ...clientConfigObj,
          _accessNodeId: accessNode.id,
          _accessNodeTag: accessNode.tag,
          _accessNodeAddress: `${accessNode.ipAddress}:${accessNode.serverPort}`,
          _accessNodeIpAddress: accessNode.ipAddress,
          _accessNodeServerPort: accessNode.serverPort,
          _source: 'accessNode'
        });
      }
    } catch (e) {
      console.error('Failed to parse clientConfig for accessNode:', accessNode.id, e);
    }
  });

  return allInbounds;
};

/**
 * 将真实API数据格式转换为内部统一格式
 * @param {Array} selectedProxies - 原始代理数据
 * @returns {Array} 转换后的代理数据
 */
const normalizeProxyData = (selectedProxies) => {
  return selectedProxies.flatMap(proxy => {
    // 检查是否是真实API格式（有 accessNodes）
    if (proxy.accessNodes && proxy.accessNodes.length > 0) {
      const inbounds = getAllInboundsFromAccessNodes(proxy);

      return inbounds.map(inbound => {
        const protocol = inbound.protocol || 'unknown';
        const config = inbound.config || {};

        // 提取认证信息
        let username = '';
        let password = '';
        let uuid = '';
        let ssMethod = '';
        let flow = '';
        let tls = null;
        let reality = null;

        if (protocol === 'http' || protocol === 'socks') {
          username = config.username || inbound.username || '';
          password = config.password || inbound.password || '';
        } else if (protocol === 'shadowtls' || protocol === 'shadowsocks' || protocol === 'ss') {
          // shadowtls 和 shadowsocks 使用 password
          password = config.password || inbound.password || '';
          // 提取 method（对于 shadowtls，method 可能是 "shadowtls" 或 "shadowtls-v{version}"）
          if (config.version) {
            ssMethod = `shadowtls-v${config.version}`;
          } else {
            ssMethod = config.method || config.ssMethod || 'shadowtls';
          }
        } else if (protocol === 'vmess' || protocol === 'vless') {
          // uuid 在 config.users[0].uuid 或直接在 config.uuid
          if (config.users && config.users.length > 0 && config.users[0].uuid) {
            uuid = config.users[0].uuid;
            // 提取 flow（VLESS）
            if (config.users[0].flow) {
              flow = config.users[0].flow;
            }
          } else {
            uuid = config.uuid || inbound.uuid || '';
          }

          // 提取 flow（直接在 config 中）
          if (config.flow) {
            flow = config.flow;
          }

          // 提取 TLS 配置
          if (config.tls && typeof config.tls === 'object') {
            tls = config.tls;
          } else if (inbound.tls && typeof inbound.tls === 'object') {
            tls = inbound.tls;
          }

          // 提取 Reality 配置（后端 ClientConfigGenerator 在根级别生成 reality）
          if (config.reality && typeof config.reality === 'object') {
            reality = config.reality;
          }
        }

        return {
          id: inbound._accessNodeId || proxy.id || `${proxy.ip}-${inbound.tag}`,
          ip: inbound._accessNodeIpAddress || proxy.ip || proxy.ipAddress || '',
          port: inbound._accessNodeServerPort || proxy.port || inbound.port || 0,
          protocol: protocol,
          protocols: [protocol],
          availableProtocols: [protocol],
          username: username,
          password: password,
          uuid: uuid,
          ssMethod: ssMethod,
          method: ssMethod,
          flow: flow,
          tls: tls,
          reality: reality,
          // 地理位置信息
          city: proxy.city || 'Unknown',
          region: proxy.region || 'Unknown',
          region_code: proxy.region_code || proxy.regionCode || '',
          country: proxy.country || 'Unknown',
          country_code: proxy.country_code || proxy.countryCode || '',
          continent: proxy.continent || '',
          continent_code: proxy.continent_code || proxy.continentCode || '',
          latitude: proxy.latitude || 0,
          longitude: proxy.longitude || 0,
          timezone: proxy.timezone || '',
          zip: proxy.zip || proxy.postal_code || '',
          // 元数据
          _tag: inbound.tag || inbound._accessNodeTag,
          _accessNodeAddress: inbound._accessNodeAddress
        };
      });
    }

    // 简化格式（Mock数据），直接返回
    return [{
      ...proxy,
      id: proxy.id || `${proxy.ip}-${proxy.port}`,
      protocols: proxy.protocols || proxy.availableProtocols || ['HTTP'],
      availableProtocols: proxy.availableProtocols || proxy.protocols || ['HTTP']
    }];
  });
};

/**
 * ProxyExportModal 主组件
 */
const ProxyExportModal = ({ isOpen, onClose, selectedProxies = [] }) => {
  // 状态管理
  const [activeProtoTab, setActiveProtoTab] = useState('');
  const [viewMode, setViewMode] = useState('table');
  const [guideCategory, setGuideCategory] = useState('fingerprint');
  const [configFormat, setConfigFormat] = useState('clash');
  const [authType, setAuthType] = useState('userpass');
  const [whitelistIp, setWhitelistIp] = useState('');
  const [linkFormat, setLinkFormat] = useState('raw');
  const [lockedQrIndex, setLockedQrIndex] = useState(null);
  const [showCopied, setShowCopied] = useState(false);

  // 规范化代理数据
  const normalizedProxies = useMemo(() => normalizeProxyData(selectedProxies), [selectedProxies]);

  // 初始化协议标签
  useEffect(() => {
    if (isOpen && normalizedProxies.length > 0 && !activeProtoTab) {
      const firstAvailable = normalizedProxies[0].protocols?.[0] || normalizedProxies[0].availableProtocols?.[0] || 'HTTP';
      setActiveProtoTab(firstAvailable);
    }
  }, [isOpen, normalizedProxies, activeProtoTab]);

  // 重置二维码索引
  useEffect(() => {
    setLockedQrIndex(null);
  }, [activeProtoTab, viewMode]);

  if (!isOpen) return null;

  // 计算可用协议
  const allAvailableProtocols = Array.from(
    new Set(normalizedProxies.flatMap(p => p.protocols || p.availableProtocols || []))
  ).sort();

  const currentTab = activeProtoTab || allAvailableProtocols[0] || 'HTTP';
  const isClassicProto = ['HTTP', 'SOCKS5', 'http', 'socks'].includes(currentTab.toLowerCase());

  // 生成代理链接
  const getLink = (p) => {
    const protocol = currentTab.toLowerCase();
    const ip = p.ip;
    const port = p.port;

    // HTTP / SOCKS5 协议
    if (protocol === 'http' || protocol === 'socks' || protocol === 'socks5') {
      if (linkFormat === 'raw') {
        return authType === 'userpass'
          ? `${ip}:${port}:${p.username}:${p.password}`
          : `${ip}:${port}`;
      }
      return authType === 'userpass'
        ? `${protocol}://${p.username}:${p.password}@${ip}:${port}`
        : `${protocol}://${ip}:${port}`;
    }

    // VLESS 协议
    if (protocol === 'vless') {
      const params = new URLSearchParams();

      // 提取 flow 参数
      const flow = p.flow || '';
      if (flow) {
        params.append('flow', flow);
      }

      // 提取 TLS/Reality 配置
      const tls = p.tls || {};
      const reality = p.reality || {};

      // 判断安全协议类型
      if (reality && reality.enabled) {
        params.append('security', 'reality');

        // Reality 参数
        if (reality.public_key) {
          params.append('pbk', reality.public_key);
        }
        if (reality.short_id) {
          // short_id 可能是字符串或数组，取第一个值
          const sid = Array.isArray(reality.short_id) ? reality.short_id[0] : reality.short_id;
          params.append('sid', sid);
        }
        if (reality.fingerprint) {
          params.append('fp', reality.fingerprint);
        }

        // SNI
        if (tls.server_name) {
          params.append('sni', tls.server_name);
        }
      } else if (tls.enabled) {
        params.append('security', 'tls');
        if (tls.server_name) {
          params.append('sni', tls.server_name);
        }
        if (tls.alpn && tls.alpn.length > 0) {
          params.append('alpn', tls.alpn.join(','));
        }
      } else {
        params.append('security', 'none');
      }

      const queryString = params.toString();
      return `vless://${p.uuid}@${ip}:${port}${queryString ? `?${queryString}` : ''}#Node-${p.id}`;
    }

    // VMess 协议
    if (protocol === 'vmess') {
      const vmessConfig = {
        v: '2',
        ps: `Node-${p.id}`,
        add: ip,
        port: port.toString(),
        id: p.uuid,
        aid: '0',
        net: 'tcp',
        type: 'none',
        host: '',
        path: '',
        tls: 'tls'
      };
      return 'vmess://' + btoa(JSON.stringify(vmessConfig));
    }

    // Trojan 协议
    if (protocol === 'trojan') {
      return `trojan://${p.uuid || p.password}@${ip}:${port}?security=tls#Node-${p.id}`;
    }

    // Shadowsocks 协议
    if (protocol === 'shadowsocks' || protocol === 'ss') {
      // SS URL 格式: ss://BASE64(method:password@server:port)
      const method = p.ssMethod || p.method || 'aes-256-gcm';
      const password = p.ssPass || p.password || '';
      const userInfo = `${method}:${password}`;
      const base64UserInfo = btoa(userInfo);
      return `ss://${base64UserInfo}@${ip}:${port}#Node-${p.id}`;
    }

    // ShadowTLS 协议
    if (protocol === 'shadowtls') {
      // ShadowTLS URL 格式: ss://BASE64(method:password@server:port)
      // method 通常是 "shadowtls" 或 "shadowtls-v{version}"
      const method = p.ssMethod || p.method || 'shadowtls';
      const password = p.password || '';
      const userInfo = `${method}:${password}`;
      const base64UserInfo = btoa(userInfo);
      return `ss://${base64UserInfo}@${ip}:${port}#Node-${p.id}`;
    }

    // Hysteria2 协议
    if (protocol === 'hysteria2' || protocol === 'hy2') {
      return `hysteria2://${p.uuid || p.password}@${ip}:${port}?sni=${ip}#Node-${p.id}`;
    }

    // 未知协议，返回基本信息
    return `${protocol}://${ip}:${port}`;
  };

  // 生成配置文件内容
  const generateConfigFile = () => {
    const validProxies = normalizedProxies.filter(p => {
      const protocols = p.protocols || p.availableProtocols || [];
      return protocols.map(p => p.toLowerCase ? p.toLowerCase() : p).includes(currentTab.toLowerCase());
    });

    if (configFormat === 'clash') {
      const proxiesStr = validProxies.map(p => {
        const protocol = currentTab.toLowerCase();
        const name = `${p.country || ''} ${p.city || ''} ${p.id}`.trim();

        if (protocol === 'http' || protocol === 'socks' || protocol === 'socks5') {
          return `  - name: "${name}"\n    type: ${protocol}\n    server: ${p.ip}\n    port: ${p.port}\n    username: ${p.username}\n    password: ${p.password}`;
        } else if (protocol === 'vmess') {
          return `  - name: "${name}"\n    type: vmess\n    server: ${p.ip}\n    port: ${p.port}\n    uuid: ${p.uuid}\n    alterId: 0\n    cipher: auto`;
        } else if (protocol === 'vless') {
          return `  - name: "${name}"\n    type: vless\n    server: ${p.ip}\n    port: ${p.port}\n    uuid: ${p.uuid}\n    network: tcp\n    tls: true`;
        } else if (protocol === 'trojan') {
          return `  - name: "${name}"\n    type: trojan\n    server: ${p.ip}\n    port: ${p.port}\n    password: ${p.uuid || p.password}\n    sni: ${p.ip}`;
        } else if (protocol === 'shadowsocks' || protocol === 'ss') {
          return `  - name: "${name}"\n    type: ss\n    server: ${p.ip}\n    port: ${p.port}\n    cipher: ${p.ssMethod || p.method || 'aes-256-gcm'}\n    password: ${p.ssPass || p.password}`;
        } else if (protocol === 'hysteria2' || protocol === 'hy2') {
          return `  - name: "${name}"\n    type: hysteria2\n    server: ${p.ip}\n    port: ${p.port}\n    password: ${p.uuid || p.password}\n    sni: ${p.ip}`;
        }
        return `  - name: "${name}"\n    type: ${protocol}\n    server: ${p.ip}\n    port: ${p.port}`;
      }).join('\n');

      const groupsStr = validProxies.map(p => `      - "${p.country || ''} ${p.city || ''} ${p.id}"`.trim()).join('\n');

      return `# Clash Configuration Generated by ProxyManager\nport: 7890\nsocks-port: 7891\nallow-lan: true\nmode: Rule\nlog-level: info\nexternal-controller: :9090\n\nproxies:\n${proxiesStr}\n\nproxy-groups:\n  - name: PROXY\n    type: select\n    proxies:\n${groupsStr}\n\nrules:\n  - MATCH,PROXY`;
    }

    if (configFormat === 'surge') {
      const proxiesStr = validProxies.map(p => {
        const name = `${p.country}_${p.city}_${p.id}`.replace(/^_+|_+$/g, '');
        const protocol = currentTab.toLowerCase();

        if (protocol === 'http' || protocol === 'socks' || protocol === 'socks5') {
          return `${name} = ${protocol}, ${p.ip}, ${p.port}, username=${p.username}, password=${p.password}`;
        } else if (protocol === 'vmess') {
          return `${name} = vmess, ${p.ip}, ${p.port}, username=${p.uuid}`;
        } else if (protocol === 'vless') {
          return `${name} = vless, ${p.ip}, ${p.port}, username=${p.uuid}`;
        } else if (protocol === 'trojan') {
          return `${name} = trojan, ${p.ip}, ${p.port}, password=${p.uuid || p.password}`;
        } else if (protocol === 'shadowsocks' || protocol === 'ss') {
          return `${name} = ss, ${p.ip}, ${p.port}, encrypt-method=${p.ssMethod || p.method || 'aes-256-gcm'}, password=${p.ssPass || p.password}`;
        }
        return `${name} = ${protocol}, ${p.ip}, ${p.port}`;
      }).join('\n');

      return `[General]\nloglevel = notify\nbypass-system = true\n\n[Proxy]\n${proxiesStr}\n\n[Proxy Group]\nProxy = select, ${validProxies.map(p => `${p.country}_${p.city}_${p.id}`.replace(/^_+|_+$/g, '')).join(', ')}\n\n[Rule]\nFINAL, Proxy`;
    }

    if (configFormat === 'shadowrocket') {
      return validProxies.map(p => getLink(p)).join('\n');
    }

    return "Select a format to view configuration.";
  };

  // 生成完整JSON
  const getFullJson = (p) => ({
    id: `Node-${p.id}`,
    ip: p.ip,
    port: p.port,
    protocol: currentTab,
    link: getLink(p),
    tag: p._tag,
    accessNode: p._accessNodeAddress,
    geo_info: {
      city: p.city,
      region: p.region,
      region_code: p.region_code,
      country: p.country,
      country_code: p.country_code,
      continent: p.continent,
      continent_code: p.continent_code,
      latitude: p.latitude,
      longitude: p.longitude,
      timezone: p.timezone,
      zip: p.zip
    }
  });

  // 筛选当前协议的代理
  const validProxies = normalizedProxies.filter(p => {
    const protocols = (p.protocols || p.availableProtocols || []).map(pr =>
      typeof pr === 'string' ? pr.toLowerCase() : pr
    );
    return protocols.includes(currentTab.toLowerCase());
  });

  const rawTextContent = validProxies.map(p => getLink(p)).join('\n');
  const configFileContent = generateConfigFile();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden ring-1 ring-gray-900/5">
        {/* 标题栏 */}
        <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-white shrink-0">
          <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-600" /> 批量查看 / 导出
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400 hover:text-gray-600">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 协议标签页 */}
        <div className="bg-gray-50/80 border-b border-gray-200 px-6 pt-3 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto pb-0 no-scrollbar">
            {allAvailableProtocols.map(proto => {
              const isActive = currentTab.toLowerCase() === proto.toLowerCase();
              let Icon = Shield;
              if (['HTTP', 'SOCKS5', 'http', 'socks', 'socks5'].includes(proto)) Icon = Globe;
              if (['Shadowsocks', 'Trojan', 'shadowsocks', 'trojan', 'ss'].includes(proto)) Icon = Lock;
              if (['Hysteria2', 'hysteria2', 'hy2'].includes(proto)) Icon = Wifi;
              if (['VMess', 'VLESS', 'vmess', 'vless'].includes(proto)) Icon = Shield;

              return (
                <button
                  key={proto}
                  onClick={() => setActiveProtoTab(proto)}
                  className={`relative px-6 py-3 text-sm font-bold rounded-t-lg transition-all flex items-center gap-2 ${
                    isActive
                      ? 'bg-white text-blue-600 shadow-sm border-t border-x border-gray-200 z-10'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100/50 border-transparent'
                  }`}
                >
                  {isActive && <div className="absolute top-0 left-0 right-0 h-0.5 bg-blue-600 rounded-t-full" />}
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-500' : 'text-gray-400'}`} />
                  {proto.toUpperCase()}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex flex-1 overflow-hidden bg-gray-50">
          {/* 左侧边栏 - 查看模式选择 */}
          <div className="w-72 bg-white border-r border-gray-200 p-6 flex flex-col gap-6 overflow-y-auto shrink-0 z-10">
            <div className="space-y-3">
              <label className="text-xs font-bold text-gray-400 uppercase">查看模式</label>
              <div className="flex flex-col gap-1">
                {[
                  { id: 'guide', icon: BookOpen, label: '新手引导 (Guide)' },
                  { id: 'config', icon: FileCode, label: '配置文件 (Config)' },
                  { id: 'table', icon: Table2, label: '参数详情表' },
                  { id: 'link', icon: Terminal, label: '列表文本' },
                  { id: 'qr', icon: QrCode, label: '二维码' },
                  { id: 'json', icon: FileText, label: 'JSON 配置' }
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id)}
                    className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${viewMode === mode.id ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'}`}
                  >
                    <mode.icon className="w-4 h-4" /> {mode.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 经典协议授权设置 */}
            {viewMode !== 'guide' && viewMode !== 'config' && isClassicProto && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">授权方式</label>
                  <div className="grid grid-cols-2 gap-2 bg-gray-100 p-1 rounded-lg">
                    <button
                      onClick={() => setAuthType('userpass')}
                      className={`py-1.5 text-xs font-bold rounded ${authType === 'userpass' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    >
                      密码模式
                    </button>
                    <button
                      onClick={() => setAuthType('ip_whitelist')}
                      className={`py-1.5 text-xs font-bold rounded ${authType === 'ip_whitelist' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-500'}`}
                    >
                      白名单
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 flex items-center justify-between">
                    复制格式 <span className="text-[10px] text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded">推荐</span>
                  </label>
                  <div className="grid grid-cols-1 gap-2">
                    <button
                      onClick={() => setLinkFormat('raw')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-all ${linkFormat === 'raw' ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${linkFormat === 'raw' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                        {linkFormat === 'raw' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold">纯文本格式</div>
                        <div className="text-[10px] text-gray-500 truncate">IP:Port{authType === 'userpass' ? ':User:Pass' : ''}</div>
                      </div>
                    </button>
                    <button
                      onClick={() => setLinkFormat('std')}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-all ${linkFormat === 'std' ? 'border-blue-600 bg-blue-50 text-blue-800 ring-1 ring-blue-600' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${linkFormat === 'std' ? 'border-blue-600 bg-blue-600' : 'border-gray-300'}`}>
                        {linkFormat === 'std' && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-xs font-bold">标准 URL</div>
                        <div className="text-[10px] text-gray-500 truncate">protocol://...</div>
                      </div>
                    </button>
                  </div>
                </div>
                {authType === 'ip_whitelist' && (
                  <textarea
                    className="w-full text-xs border rounded p-2"
                    rows={3}
                    placeholder="输入授权IP..."
                    value={whitelistIp}
                    onChange={e => setWhitelistIp(e.target.value)}
                  />
                )}
              </div>
            )}

            {/* 配置文件格式选择 */}
            {viewMode === 'config' && (
              <div className="space-y-4">
                <label className="text-sm font-medium text-gray-700">客户端格式</label>
                <div className="space-y-2">
                  {['clash', 'surge', 'shadowrocket', 'quantumultx'].map(fmt => (
                    <button
                      key={fmt}
                      onClick={() => setConfigFormat(fmt)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium capitalize transition-all ${configFormat === fmt ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {fmt === 'quantumultx' ? 'Quantumult X' : fmt}
                      {configFormat === fmt && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 底部复制按钮 */}
            <div className="mt-auto pt-4 border-t">
              {viewMode === 'config' ? (
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(configFileContent)}
                    className="flex-1 py-2.5 bg-gray-900 text-white text-xs font-medium rounded-lg hover:bg-black flex items-center justify-center gap-2"
                  >
                    <Copy className="w-3.5 h-3.5" /> 复制配置
                  </button>
                  <button className="px-3 bg-white border border-gray-200 text-gray-600 rounded-lg hover:bg-gray-50">
                    <DownloadCloud className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => copyToClipboard(rawTextContent)}
                  className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black"
                >
                  <Copy className="w-4 h-4 inline mr-2" />一键复制
                </button>
              )}
            </div>
          </div>

          {/* 右侧内容区域 */}
          <div className="flex-1 flex flex-col bg-slate-50 relative min-w-0">
            <div className="flex-1 overflow-y-auto p-6">

              {/* 新手引导模式 */}
              {viewMode === 'guide' && (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <div className="space-y-3">
                    <h3 className="text-base font-bold text-gray-900">选择您的使用场景</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { id: 'fingerprint', label: '指纹浏览器', sub: 'AdsPower / Bit', icon: Globe },
                        { id: 'client', label: '代理软件', sub: 'v2rayN / Clash', icon: AppWindow },
                        { id: 'router', label: '路由', sub: 'OpenWrt', icon: Wifi },
                        { id: 'dev', label: '开发/命令行', sub: 'cURL / Python', icon: Terminal },
                      ].map(item => (
                        <button
                          key={item.id}
                          onClick={() => setGuideCategory(item.id)}
                          className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all ${guideCategory === item.id ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-gray-100 hover:border-gray-200 bg-white text-gray-600'}`}
                        >
                          <item.icon className="w-8 h-8 mb-2 opacity-80" />
                          <div className="font-bold text-sm">{item.label}</div>
                          <div className="text-[10px] opacity-60">{item.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm space-y-6">
                    {guideCategory === 'fingerprint' && (
                      <div className="space-y-4">
                        <h4 className="font-bold text-gray-900 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-blue-600" /> 指纹浏览器快速配置
                        </h4>
                        <ol className="list-decimal list-inside space-y-2 text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                          <li>打开指纹浏览器（如 AdsPower），新建浏览器环境。</li>
                          <li>在"代理配置"选项中，选择协议 <strong>{currentTab.toUpperCase()}</strong>。</li>
                          <li>点击下方按钮复制代理信息，直接粘贴到配置框中。</li>
                          <li>点击"检查代理"确认连接成功。</li>
                        </ol>
                        <div className="pt-2">
                          <button
                            onClick={() => copyToClipboard(rawTextContent)}
                            className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center gap-2"
                          >
                            <Copy className="w-4 h-4" /> 复制 IP:Port:User:Pass
                          </button>
                        </div>
                      </div>
                    )}
                    {guideCategory !== 'fingerprint' && (
                      <div className="text-center py-8 text-gray-400">
                        更多教程正在开发中... <br />
                        <button onClick={() => copyToClipboard(rawTextContent)} className="text-blue-600 hover:underline mt-2 text-sm">
                          直接复制列表
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 配置文件模式 */}
              {viewMode === 'config' && (
                <div className="h-full flex flex-col animate-in fade-in">
                  <div className="bg-slate-900 rounded-xl p-4 shadow-inner overflow-hidden h-full border border-slate-700 relative">
                    <div className="absolute top-0 right-0 p-2">
                      <span className="text-[10px] text-gray-400 font-mono px-2 py-1 bg-white/10 rounded uppercase">{configFormat}</span>
                    </div>
                    <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all h-full custom-scrollbar p-2">
                      {configFileContent}
                    </pre>
                  </div>
                </div>
              )}

              {/* 列表文本模式 */}
              {viewMode === 'link' && (
                <textarea
                  readOnly
                  className="w-full h-full p-4 text-sm font-mono bg-white border rounded-lg resize-none focus:ring-2 ring-blue-500"
                  value={rawTextContent}
                />
              )}

              {/* 表格模式 */}
              {viewMode === 'table' && (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-3">IP 地址</th>
                        <th className="px-4 py-3">地理位置</th>
                        <th className="px-4 py-3">接入点</th>
                        <th className="px-4 py-3">时区 / 坐标</th>
                        {isClassicProto ? (
                          <>
                            <th className="px-4 py-3">用户名</th>
                            <th className="px-4 py-3">密码</th>
                          </>
                        ) : (
                          <>
                            <th className="px-4 py-3">传输</th>
                            <th className="px-4 py-3">UUID / 密钥</th>
                          </>
                        )}
                        <th className="px-4 py-3 text-center">操作</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {validProxies.map(p => (
                        <tr key={p.id}>
                          <td className="px-4 py-3 font-mono">{p.ip}:{p.port}</td>
                          <td className="px-4 py-3 text-gray-600">
                            <div className="font-medium text-gray-900">{p.city}, {p.region}</div>
                            <div className="text-xs text-gray-400 mt-0.5">{p.country}</div>
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            <div className="font-mono text-xs">{p._tag || '-'}</div>
                            {p._accessNodeAddress && (
                              <div className="text-[10px] text-gray-400 mt-0.5">{p._accessNodeAddress}</div>
                            )}
                          </td>
                          <td className="px-4 py-3 text-gray-600">
                            <div className="font-mono text-xs">{p.timezone || '-'}</div>
                            <div className="text-[10px] text-gray-400 flex items-center gap-1 mt-0.5">
                              <MapPin className="w-3 h-3" /> {p.latitude?.toFixed(2) || '-'}, {p.longitude?.toFixed(2) || '-'}
                            </div>
                          </td>
                          {isClassicProto ? (
                            <>
                              <td className="px-4 py-3 font-mono text-gray-500">{authType === 'userpass' ? p.username : '-'}</td>
                              <td className="px-4 py-3 font-mono text-gray-500">{authType === 'userpass' ? <PasswordField value={p.password} /> : '已授权'}</td>
                            </>
                          ) : (
                            <>
                              <td className="px-4 py-3 text-xs">TCP</td>
                              <td className="px-4 py-3 font-mono text-gray-500"><PasswordField value={p.uuid} /></td>
                            </>
                          )}
                          <td className="px-4 py-3 text-center">
                            <button
                              onClick={() => copyToClipboard(getLink(p))}
                              className="text-blue-600 hover:text-blue-800 text-xs font-medium bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded transition-colors"
                            >
                              复制
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* 二维码模式 */}
              {viewMode === 'qr' && (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-10">
                    {validProxies.map((p, idx) => (
                      <div
                        key={p.id}
                        className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col items-center gap-2 shadow-sm hover:shadow-md transition-all cursor-pointer group hover:border-blue-200"
                        onClick={() => setLockedQrIndex(idx)}
                      >
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-50 to-blue-50/30 border border-gray-100 rounded-lg flex items-center justify-center relative overflow-hidden group-hover:from-blue-50 group-hover:to-blue-100/50 transition-colors p-2 shadow-inner">
                          <QRCodeSVG
                            value={getLink(p)}
                            size={112}
                            level="M"
                            includeMargin={false}
                            className="w-full h-full"
                            fgColor="#1f2937"
                            bgColor="transparent"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-white/90 text-blue-600 text-[10px] font-bold px-2 py-1 rounded shadow-sm">点击放大</span>
                          </div>
                        </div>
                        <div className="text-center w-full mt-2 space-y-1">
                          <div className="font-mono text-sm font-bold text-gray-900">{p.ip}</div>
                          <div className="flex items-center justify-center gap-1 text-xs text-gray-600 font-medium">
                            <span className="truncate max-w-[100px]" title={`${p.city}, ${p.region}`}>{p.city}, {p.region_code}</span>
                          </div>
                          {p._tag && (
                            <div className="text-[10px] text-blue-600">{p._tag}</div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* 放大二维码浮层 */}
                  {lockedQrIndex !== null && (() => {
                    const targetProxy = validProxies[lockedQrIndex];
                    if (!targetProxy) return null;

                    return (
                      <div
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-white/50 backdrop-blur-[2px] animate-in fade-in duration-200"
                        onClick={() => setLockedQrIndex(null)}
                      >
                        <div
                          className="bg-white p-8 rounded-3xl shadow-2xl border border-gray-100 transform scale-100 animate-in zoom-in-95 duration-200 flex flex-col items-center gap-4 max-w-sm w-full relative"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <button onClick={() => setLockedQrIndex(null)} className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors z-20">
                            <X className="w-4 h-4" />
                          </button>

                          {/* 导航按钮 */}
                          {validProxies.length > 1 && (
                            <>
                              <button
                                className="absolute left-2 md:-left-16 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-100/80 md:bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 transition-all z-20 shadow-sm md:shadow-lg backdrop-blur-sm group/nav"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLockedQrIndex(prev => (prev - 1 + validProxies.length) % validProxies.length);
                                  setShowCopied(false);
                                }}
                                title="上一个节点"
                              >
                                <ChevronLeft className="w-6 h-6 group-hover/nav:-translate-x-0.5 transition-transform" />
                              </button>
                              <button
                                className="absolute right-2 md:-right-16 top-1/2 -translate-y-1/2 p-2 md:p-3 rounded-full bg-gray-100/80 md:bg-white/80 hover:bg-white text-gray-600 hover:text-gray-900 transition-all z-20 shadow-sm md:shadow-lg backdrop-blur-sm group/nav"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLockedQrIndex(prev => (prev + 1) % validProxies.length);
                                  setShowCopied(false);
                                }}
                                title="下一个节点"
                              >
                                <ChevronRight className="w-6 h-6 group-hover/nav:translate-x-0.5 transition-transform" />
                              </button>
                            </>
                          )}

                          <div
                            className="w-64 h-64 bg-gradient-to-br from-gray-50 via-blue-50/20 to-purple-50/30 rounded-xl flex items-center justify-center relative overflow-hidden cursor-pointer active:scale-95 transition-transform group border-2 border-gray-200 p-4 shadow-inner"
                            onClick={() => {
                              copyToClipboard(getLink(targetProxy));
                              setShowCopied(true);
                              setTimeout(() => setShowCopied(false), 2000);
                            }}
                            title="点击复制链接"
                          >
                            <QRCodeSVG
                              value={getLink(targetProxy)}
                              size={240}
                              level="M"
                              includeMargin={false}
                              className="w-full h-full"
                              fgColor="#1f2937"
                              bgColor="transparent"
                            />

                            {/* 复制成功提示 */}
                            {showCopied && (
                              <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center text-white animate-in fade-in duration-200 z-10">
                                <CheckCircle2 className="w-12 h-12 mb-2 text-green-400" />
                                <span className="font-bold">已复制链接</span>
                              </div>
                            )}

                            {/* 悬停提示 */}
                            {!showCopied && (
                              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="bg-white/90 text-gray-800 text-xs font-bold px-3 py-1.5 rounded-full shadow-sm">点击复制</span>
                              </div>
                            )}
                          </div>
                          <div className="text-center space-y-2 w-full px-4">
                            <div className="font-mono text-xl font-bold text-gray-900 truncate" title={targetProxy.ip}>{targetProxy.ip}</div>
                            <div className="text-sm text-gray-500 truncate">{targetProxy.city}, {targetProxy.country}</div>
                            {targetProxy._tag && (
                              <div className="text-xs text-blue-600">{targetProxy._tag}</div>
                            )}

                            {validProxies.length > 1 && (
                              <div className="text-xs font-medium text-gray-400 py-1">
                                节点 {lockedQrIndex + 1} / {validProxies.length}
                              </div>
                            )}

                            <div className="pt-2 flex justify-center gap-3">
                              <button
                                onClick={() => {
                                  copyToClipboard(getLink(targetProxy));
                                  setShowCopied(true);
                                  setTimeout(() => setShowCopied(false), 2000);
                                }}
                                className={`px-6 py-2.5 text-white text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2 ${showCopied ? 'bg-green-600 shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200 hover:shadow-blue-300 transform hover:-translate-y-0.5'}`}
                              >
                                {showCopied ? <CheckCircle2 className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                {showCopied ? '已复制' : '复制链接'}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()}
                </>
              )}

              {/* JSON 模式 */}
              {viewMode === 'json' && (
                <div className="bg-slate-900 rounded-xl p-4 shadow-inner overflow-hidden h-full border border-slate-700">
                  <pre className="text-xs font-mono text-emerald-400 overflow-x-auto whitespace-pre-wrap break-all h-full custom-scrollbar">
                    {JSON.stringify(validProxies.map((p) => getFullJson(p)), null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProxyExportModal;
