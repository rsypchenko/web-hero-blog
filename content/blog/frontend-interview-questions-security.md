---
external: false
draft: false
title: Front-End Interview Questions - Web Security
description: Exploring 3 frontend interview questions about web security
date: 2023-10-21
image: '/images/js2.webp'
thumb: '/images/thumbs/10.png'
---

![Blogster](/images/js2.webp)

Let us explore some of the popular interview questions related to web security. This is a list of frequently asked questions that I encountered during my interviews.

### 1. Explain the cookie attribute: “SameSite”
The “SameSite” attribute in cookies is a setting that defines when a cookie should be sent with a cross-site request. It helps enhance privacy and security by controlling whether cookies should be restricted to the same site from which the request originated. There are three possible values for the “SameSite” attribute:

1. Strict: If a cookie has the “SameSite=Strict” attribute, it will only be sent in a first-party context. This means the cookie is sent only if the site for the cookie matches the site currently being visited.
2. Lax: With “SameSite=Lax,” cookies are allowed to be sent with top-level navigations and with GET requests initiated by third-party websites. This provides a balance between privacy and usability.
3. None: If “SameSite=None” is set, the cookie can be sent with cross-origin requests. However, when using this option, it’s recommended to also include the “Secure” attribute to ensure the cookie is only sent over HTTPS connections.
Understanding and properly configuring the “SameSite” attribute is crucial for web developers to prevent certain types of cross-site request forgery (CSRF) attacks and enhance user privacy.

**Read more about:**
[here](https://web.dev/articles/samesite-cookies-explained?source=post_page-----e3c4c7641a3a--------------------------------)

### 2. What is CSRF? How to prevent it?
The attacker creates a malicious website or sends a malicious email to the victim.
The victim visits the malicious website or clicks on a link in an email while being authenticated in some other web application (e.g., a banking site) in the same browser.
The malicious website sends a request to the target web application on behalf of the victim without their knowledge.
The target web application processes the malicious request, thinking it’s legitimate, and carries out an action on behalf of the victim.
This is a problem because it can lead to unauthorized actions being taken on behalf of the user, potentially resulting in data loss, financial loss, or other harmful consequences.

#### How to prevent it ?
- CSRF token
- Implementing CORS
- Applying SameSite flag in cookies

Read more about: [here](https://developer.mozilla.org/en-US/docs/Glossary/CSRF?source=post_page-----e3c4c7641a3a--------------------------------)

### 3.What is XSS? How to prevent it?
This malicious code can execute within the context of the victim’s browser, leading to various attacks, such as stealing user data, session hijacking, defacement of websites, and more.

Types of XSS:
1. Stored XSS: The malicious script is permanently stored on the server, and all users who view the affected page are vulnerable.
2. Reflected XSS: The injected script is reflected off a web server, such as in the URL, and executed immediately in the victim’s browser. This type often involves social engineering to trick the victim into clicking a link.
3. DOM-based XSS: The attack occurs entirely on the client-side, with the malicious script manipulating the Document Object Model (DOM) of a web page. This type is often more difficult to detect and prevent.

#### Prevention
Input Validation and Sanitization: Ensure that all user inputs are validated and sanitized before being displayed on a web page. This includes escaping or encoding special characters like <, >, &, and quotes.

1. Input Validation and Sanitization: Ensure that all user inputs are validated and sanitized before being displayed on a web page. This includes escaping or encoding special characters like <, >, &, and quotes.

```js
const userInput = "<script>alert('XSS');</script>";
const sanitizedInput = DOMPurify.sanitize(userInput);
document.getElementById("output").innerHTML = sanitizedInput;
```

2. Content Security Policy (CSP): CSP is an HTTP header that helps mitigate XSS attacks by defining the sources from which certain content, such as scripts, can be executed on a web page. You can specify trusted sources and disallow inline scripts.

```
Content-Security-Policy: default-src 'self'; script-src trusted-scripts.com;
```

In this example, the script-src directive restricts scripts to be loaded only from the "trusted-scripts.com" domain, and default-src specifies that other content should be loaded from the same origin (the 'self' keyword).

3. Output Encoding: Encode user-generated content appropriately when rendering it in HTML, JavaScript, or other contexts. Use functions like encodeURIComponent or output encoding libraries to ensure data is displayed as data, not code.

4. Use Security Libraries: Utilize security libraries like OWASP’s AntiSamy, DOMPurify, or various language-specific libraries that can help you prevent XSS vulnerabilities.

5. Regular Security Testing: Regularly perform security testing, including penetration testing and code reviews, to identify and fix potential XSS vulnerabilities.


### Conclusion
In conclusion, this exploration of web security interview questions sheds light on fundamental concepts crucial for developers aiming to create robust and secure web applications.