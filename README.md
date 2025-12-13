<h1 align="center" title="VPM logo">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="./static/logo-full.dark.svg">
    <source media="(prefers-color-scheme: light)" srcset="./static/logo-full.svg">
    <img width="300" src="./static/logo-full.svg" alt="VPM Logo" />
  </picture>
</h1>

<p align="center">
  <a href="./README.md">English</a> | <a href="./README.zh-CN.md">简体中文</a>
</p>

## Overview

**VPM (Virtual Proxy Mapper)**, a browser extension designed for **Web developers**.

It allows you to quickly manage and switch custom proxy rules, enabling virtual proxy mapping while supporting both local and system proxy configurations.

**Core positioning**: A lightweight, secure, and instantly effective proxy management tool for developers.

## Features

- ⚡ **Instant Switching**: Quickly switch between different environments without modifying hosts or system settings
- 🎯 **Precise Mapping**: Flexibly assign proxies for different domains or services, directing requests to the designated server.
- 🛠 **Flexible Debugging**: Temporarily enable or disable rules for easy rollback
- 📊 **Rule Management**: Create, edit, delete rules, and drag to adjust priorities for precise matching
- 👁 **Status Display**: Extension icon and badge reflect the current rule status in real time
- 🔒 **Secure & Reliable**: No changes to system files or hosts, no privacy data collected

> **Compared with traditional proxy methods (hosts or system proxy):**
>
> - Instant effect, no need to restart the browser or refresh DNS
> - Flexible configuration for multiple projects and environments
> - Safe and controllable, rollback at any time without affecting system settings

## Installation

### Chrome / Chromium

1. Download the `.zip` file from the [Release](https://github.com/zjxxxxxxxxx/vpm/releases/latest) page
2. Extract it to any folder
3. Open the browser and go to `chrome://extensions`
4. Enable **Developer mode**
5. Click **Load unpacked** and select the extracted folder

Official reference: [Load an unpacked extension](https://developer.chrome.com/docs/extensions/get-started/tutorial/hello-world#load-unpacked)

### Firefox

1. Download the `.xpi` file from the [Release](https://github.com/zjxxxxxxxxx/vpm/releases/latest) page
2. Open Firefox
3. Drag and drop the `.xpi` file into the browser window
4. Confirm the installation when prompted
