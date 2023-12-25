---
external: false
draft: false
title: Node.js 21 - A Leap Forward in Security and Features
description: Exploring Nodejs 21 updates and security improvements 
date: 2023-11-18
image: '/images/nodejs-21.webp'
thumb: '/images/thumbs/10.png'
tags: ['nodejs', 'javascript']
popular: false
---

![NodeJS](/images/nodejs-21.webp)

The Node.js community has been buzzing with excitement following the release of Node.js 21, a significant update that brings a host of new features and security improvements. This release marks a pivotal moment for Node.js, emphasizing both the platform’s ongoing commitment to security and its continuous evolution to meet the needs of modern web development.

### Node.js 21: What’s New and Exciting

Enhanced V8 JavaScript Engine
Node.js 21 introduces an updated V8 JavaScript engine (version 11.8), which is a part of Chromium 118. This update brings improved performance and new language features, including Array grouping, ArrayBuffer.prototype.transfer, and WebAssembly extended-const expressions.

### Stable WebStreams and Fetch API

A major highlight of Node.js 21 is the stabilization of WebStreams and the Fetch API. These features are crucial for processing data in small sizes, particularly for browser applications, enhancing the efficiency and capabilities of Node.js in handling web-based tasks.

### Experimental Flag for Module Defaults

Node.js 21 introduces an experimental flag (`--experimental-default-type`) that allows developers to flip the default module system used by Node.js. This feature provides greater flexibility in handling CommonJS and ECMAScript modules, making it easier to manage different types of JavaScript files.

### Built-in WebSocket Client

The release also includes an experimental browser-compatible WebSocket implementation, enabled through the `--experimental-websocket` flag. This addition is particularly useful for developers looking to implement real-time communication features in their applications.

### Built-in WebSocket Client

The release also includes an experimental browser-compatible WebSocket implementation, enabled through the `--experimental-websocket` flag. This addition is particularly useful for developers looking to implement real-time communication features in their applications.

### Security Enhancements and Progress

#### Addressing CVEs

In October, Node.js addressed four CVEs within Node.js and two within its dependencies, including two high severity issues, one medium severity issue, and one low severity issue in Node.js. This proactive approach to security underscores the platform’s commitment to providing a secure environment for developers.

### OpenSSL Security Releases

The Node.js team assessed three security releases from OpenSSL as non-critical patches, which were handled in regular releases. This assessment and response demonstrate the team’s vigilance in maintaining the security integrity of the platform.

### Permission Model Updates

Node.js has moved its Permission Model to version 1.1 and Active Development, documenting that some files can be read before V8 initialization. This update is part of the ongoing efforts to enhance the security framework of Node.js.

### GitHub Actions Pinning

The Node.js team created pull requests to pin GitHub Actions by commit-hash, evaluating the effectiveness of this approach for non-libraries. This initiative is part of a broader effort to improve the scorecard for different repositories under Node.js.

### Conclusion

Node.js 21 represents a significant step forward in the platform’s evolution, offering new features and security enhancements that cater to the needs of modern web development. With its improved V8 engine, stable WebStreams, experimental WebSocket client, and enhanced test runner, Node.js continues to be a robust and versatile platform for developers. The focus on security, demonstrated through the handling of CVEs and updates to the Permission Model, reinforces Node.js’s commitment to providing a secure and reliable environment for building web applications.

Developers are encouraged to explore the new features and improvements in Node.js 21 and contribute to the ongoing development and security of this vital platform.

[Node.js 21 Announcement](https://nodejs.org/en/blog/announcements/v21-release-announce)
