

# umi-plugin-check-for-updates

**检测更新(fetch version.json)**  ?

首次加载页面。
轮询 （default: 10 * 60 * 1000 ms）。
标签页 refocus or revisible。

## Why

部分用户（老板）没有关闭网页的习惯，在网页有新版本更新或问题修复时，用户继续使用旧的版本，影响用户体验和后端数据准确性。也有可能会出现报错（文件404）、白屏的情况。

## 安装

```bash
npm add umi-plugin-check-for-updates -D

```


