#!/usr/bin/env python3
"""
Simple HTTP server to serve the Love Game Click website
This is a temporary solution until Node.js is installed
"""

import http.server
import socketserver
import os
import sys
from pathlib import Path

# Change to the project directory
project_dir = Path(__file__).parent
os.chdir(project_dir)

# Create a simple HTML file to serve
html_content = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Love Game Click - Ultimate Gaming Hub</title>
    <meta name="description" content="Play free online games at Love Game Click. Discover amazing puzzle, action, strategy, and word games. No downloads required - just click and play!">
    <link rel="canonical" href="https://lovegame.click">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #1f2937;
            background: linear-gradient(135deg, #007AFF 0%, #5856D6 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 2rem;
        }
        
        .header {
            text-align: center;
            color: white;
            margin-bottom: 3rem;
        }
        
        .header h1 {
            font-size: 3rem;
            font-weight: bold;
            margin-bottom: 1rem;
        }
        
        .header p {
            font-size: 1.25rem;
            opacity: 0.9;
            max-width: 600px;
            margin: 0 auto;
        }
        
        .setup-instructions {
            background: white;
            border-radius: 1rem;
            padding: 2rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            margin-bottom: 2rem;
        }
        
        .setup-instructions h2 {
            color: #007AFF;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .setup-instructions ol {
            margin-left: 1.5rem;
            margin-bottom: 1rem;
        }
        
        .setup-instructions li {
            margin-bottom: 0.5rem;
            color: #374151;
        }
        
        .code-block {
            background: #f3f4f6;
            border-radius: 0.5rem;
            padding: 1rem;
            font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
            font-size: 0.875rem;
            color: #1f2937;
            margin: 1rem 0;
            overflow-x: auto;
        }
        
        .features {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }
        
        .feature-card {
            background: white;
            border-radius: 1rem;
            padding: 1.5rem;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        }
        
        .feature-card h3 {
            color: #007AFF;
            margin-bottom: 0.5rem;
        }
        
        .feature-card p {
            color: #6b7280;
        }
        
        .status {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 0.5rem;
            padding: 1rem;
            margin: 1rem 0;
        }
        
        .status h3 {
            color: #92400e;
            margin-bottom: 0.5rem;
        }
        
        .status p {
            color: #92400e;
        }
        
        @media (max-width: 768px) {
            .header h1 {
                font-size: 2rem;
            }
            
            .header p {
                font-size: 1rem;
            }
            
            .container {
                padding: 1rem;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🎮 Love Game Click</h1>
            <p>Ultimate Gaming Hub - Play Free Online Games</p>
        </div>
        
        <div class="setup-instructions">
            <h2>🚀 网站已创建完成！</h2>
            <p>你的游戏集成网站已经成功创建，包含以下功能：</p>
            
            <div class="status">
                <h3>⚠️ 需要安装 Node.js</h3>
                <p>要运行完整的网站，请先安装 Node.js 和 npm。</p>
            </div>
            
            <h3>安装步骤：</h3>
            <ol>
                <li>访问 <a href="https://nodejs.org" target="_blank">nodejs.org</a> 下载并安装 Node.js</li>
                <li>或者使用 Homebrew：<code>brew install node</code></li>
                <li>安装完成后运行：<code>npm install</code></li>
                <li>启动开发服务器：<code>npm run dev</code></li>
            </ol>
            
            <div class="code-block">
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
            </div>
        </div>
        
        <div class="features">
            <div class="feature-card">
                <h3>🎯 游戏管理</h3>
                <p>通过对话框轻松添加新游戏，只需输入iframe URL和游戏信息即可。</p>
            </div>
            
            <div class="feature-card">
                <h3>📱 响应式设计</h3>
                <p>完美适配PC和移动端，使用苹果典型色系，提供优秀的用户体验。</p>
            </div>
            
            <div class="feature-card">
                <h3>🔍 SEO优化</h3>
                <p>完整的SEO优化，包含H1/H2标签、canonical URL和结构化数据。</p>
            </div>
            
            <div class="feature-card">
                <h3>⚡ 高性能</h3>
                <p>使用Next.js 14和Tailwind CSS构建，支持静态生成和CDN加速。</p>
            </div>
            
            <div class="feature-card">
                <h3>🚀 一键部署</h3>
                <p>配置了GitHub Actions自动部署到Spaceship和Cloudflare。</p>
            </div>
            
            <div class="feature-card">
                <h3>🎨 现代UI</h3>
                <p>采用苹果设计语言，包含动画效果和交互反馈。</p>
            </div>
        </div>
        
        <div class="setup-instructions">
            <h2>📁 项目结构</h2>
            <div class="code-block">
lovegame/
├── app/                    # Next.js App Router
│   ├── page.tsx           # 首页
│   ├── layout.tsx         # 布局
│   ├── game/[slug]/       # 游戏详情页
│   └── category/[category]/ # 分类页面
├── components/            # React组件
│   ├── Header.tsx         # 导航栏
│   ├── Footer.tsx         # 页脚
│   └── AddGameModal.tsx   # 添加游戏对话框
├── lib/                   # 工具函数
│   └── games.ts           # 游戏数据管理
├── data/                  # 数据文件
│   └── games.json         # 游戏和分类数据
└── public/                # 静态资源
            </div>
        </div>
        
        <div class="setup-instructions">
            <h2>🎮 添加游戏功能</h2>
            <p>网站包含完整的游戏管理功能：</p>
            <ul>
                <li>点击"Add Game"按钮打开对话框</li>
                <li>填写游戏标题、分类、iframe URL</li>
                <li>添加游戏介绍、玩法指南、特色功能</li>
                <li>设置常见问题和答案</li>
                <li>自动生成SEO友好的URL</li>
            </ul>
        </div>
        
        <div class="setup-instructions">
            <h2>🌐 部署配置</h2>
            <p>已配置完整的部署流程：</p>
            <ul>
                <li>GitHub Actions 自动构建和部署</li>
                <li>Spaceship 托管平台</li>
                <li>Cloudflare CDN 加速</li>
                <li>自动缓存清理</li>
            </ul>
        </div>
    </div>
</body>
</html>
"""

# Write the HTML file
with open('index.html', 'w', encoding='utf-8') as f:
    f.write(html_content)

# Start the server
PORT = 3000
Handler = http.server.SimpleHTTPRequestHandler

print(f"🎮 Love Game Click 网站预览服务器启动中...")
print(f"📱 访问地址: http://localhost:{PORT}")
print(f"🛑 按 Ctrl+C 停止服务器")
print(f"📁 服务目录: {project_dir}")

try:
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        httpd.serve_forever()
except KeyboardInterrupt:
    print(f"\n🛑 服务器已停止")
    sys.exit(0)
except OSError as e:
    if e.errno == 48:  # Address already in use
        print(f"❌ 端口 {PORT} 已被占用，尝试使用端口 {PORT + 1}")
        try:
            with socketserver.TCPServer(("", PORT + 1), Handler) as httpd:
                print(f"📱 访问地址: http://localhost:{PORT + 1}")
                httpd.serve_forever()
        except KeyboardInterrupt:
            print(f"\n🛑 服务器已停止")
            sys.exit(0)
    else:
        print(f"❌ 启动服务器失败: {e}")
        sys.exit(1)
