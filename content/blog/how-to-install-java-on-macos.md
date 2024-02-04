---
external: false
draft: false
title: How to Install Java on macOS
description: Step By step guide how to install Java on your macOS and managing it
date: 2024-02-03
image: '/images/java-macos.webp'
thumb: '/images/thumbs/10.png'
tags: ['java', 'backend']
popular: false
---

![Java](/images/java-macos.webp)

Java has played a significant role in shaping the tech landscape. It is a fundamental component of numerous applications, a common feature of enterprise software, and often the first programming language new developers learn. Due to its platform-independent nature, Java lives up to its promise and principles of allowing developers to write code once and have it run on any platform.

At some point, as a developer, you'll need to install Java on your system. It's common to require multiple versions to perform compatibility testing and review features in early-access builds.

Managing different versions of Java on a single system can become complicated. This article will guide you through the process of installing and managing different versions of Java on your macOS system. It will provide you with the necessary tools to simplify the process and answer some frequently asked questions.

### Manually installing Java on macOS

Manually installing Java on macOS gives us more control and greater insight into the process than more automated methods.

First, navigate to Oracle's [Java Downloads](https://www.oracle.com/ca-en/java/technologies/downloads/) page, where you’ll find various Java versions and their specific features. This page also includes a [Java Archive](https://www.oracle.com/ca-en/java/technologies/downloads/archive/) section for finding specific older versions. Select the Java version that meets your requirements, download the macOS installer as a DMG file, and double-click to run it.

Follow the prompts to install Java on your system.

It is important to note that while Oracle offers Java distributions, several other vendors do as well.
The choice of which vendor to work with will depend on your specific needs, such as licensing requirements and the development environment you use. For instance, if you are developing for AWS, Amazon's Corretto may be the best option for you.
To see a full list of available Java distributions, you can refer to the following resource: [Foojay almanac](https://foojay.io/almanac/java-17/).

We'll focus on Oracle’s Java distribution for this guide.

After installing Java in your macOS system, it is important to set up the environment variables to ensure that the installation is recognized.
The key variable that must be set is `JAVA_HOME`. This variable informs the operating system and other applications about the location of the Java Development Kit (JDK) installation.

For setting `JAVA_HOME`, open your terminal and type the following:

```bash
echo 'export JAVA_HOME=$(/usr/libexec/java_home)' >> ~/.bash_profile
```

This command adds an export line to your `.bash_profile` file so that the `JAVA_HOME` variable is set every time you start a new terminal session. `/usr/libexec/java_home` calls a `Java_Home` script that returns the path to a Java runtime installation. Ensure the location has backticks around it (`), not single quotation marks (').

Manually installing Java on macOS may seem straightforward, but several aspects can make it difficult and time-consuming, particularly for developers new to Java or macOS.

1. The process requires navigating Oracle’s website and ensuring compatibility with your macOS version, which can be complex if you’re unfamiliar.

2. Configuring environment variables such as `JAVA_HOME` and `PATH` involves editing hidden system files. Navigating hidden system folders may be daunting, and mistakes can lead to unexpected Java behavior or macOS errors.

Let’s look at alternative ways to install Java on macOS so you can avoid these issues.

### Installing Java on macOS using Homebrew

Homebrew is a popular package manager for macOS that simplifies the Java installation process through its vast library of software.

To install Homebrew, run the following command in your terminal:

```sh
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Once the installation is complete, you’re ready to fetch Java. Run the following command in your terminal, replacing 11 with your desired Java version:

```sh
brew install openjdk@11
```

Homebrew may not set up the `JAVA_HOME` environment variable automatically, so you should add the following lines to your shell profile file (.bash_profile, .zshrc, etc.)

```sh
export JAVA_HOME=$(/usr/libexec/java_home -v 11)
export PATH=$JAVA_HOME/bin:$PATH
```

The Homebrew method has many advantages over installing Java manually. The commands are simple and intuitive, and Homebrew takes care of updates, meaning your Java version stays current without any extra effort.

### Installing Java on macOS using SDKMAN

Another option for installing Java is [SDKMAN!](https://sdkman.io/), a versatile tool that’s easy to install and helps you manage multiple versions of Java.

The installation process is simple. Open your terminal and run the following command:

```sh
curl -s "https://get.sdkman.io" | bash
```

Next, you need to initiate SDKMAN! in your current shell. Do so by running the following command:

```sh
source $HOME/.sdkman/bin/sdkman-init.sh
```

Now, you can list all the available Java versions:

```sh
sdk list java
```

The output presents all the available versions. To install Java 19.0.2-oracle, for example, use the following command:

```sh
sdk install java 19.0.2-oracle
```

With Java installed, SDKMAN! let you choose the Java version you wish to use at any given moment. To select a specific Java version, use the following command, replacing the version number:

```sh
sdk use java 19.0.2-oracle
```

SDKMAN! allows for easy switching between Java versions, accommodating the requirements of multiple projects. It also supports several JDK distributions.

### Managing multiple Java versions on macOS

It can be beneficial to have multiple versions of Java installed on your system, as you may need to switch between them depending on the task at hand.

To switch between versions, all you have to do is edit the `JAVA_HOME` environment variable. As explained earlier, that variable gives your system the location of the Java SDK installation.

Open the terminal and enter the following command, replacing 11 with the Java version you want:

```sh
export JAVA_HOME=`/usr/libexec/java_home -v 11`
```

This command will set the Java version for the current session. To make the setting permanent, you'll need to write the line to the shell initialization file. If you’re using Bash, add it to your `.bashrc` file, if you’re using `zsh`, add it to your .`zshrc` file.

The other method for managing multiple Java versions is to create shell scripts. A shell script is a small program that — in this case — automates the version-switching process, reducing it to a single command.

Finally, we can use SDKMAN! to switch between Java versions easily. Running sdk use instructs SDKMAN! to set the active Java version to 19.0.2:

```sh
sdk use java 19.0.2-oracle
```

### FAQs

Now that we’ve reviewed several methods for installing and managing Java on macOS, let's review the answers to some of the most common questions about the process.

#### How do I install Java on my Mac?

You can do it manually, use a package manager like Homebrew, or employ a versatile tool like SDKMAN!.

#### How do I set or change the Java path on macOS?

To set or change the Java path, edit the environment variable, `JAVA_HOME`. Depending on your shell, you can add an export command to your `.bashrc` or `.zshrc` file, which points JAVA_HOME to your chosen Java version.

#### How do I uninstall Java on macOS?

Uninstalling Java is as simple as deleting the Java folder from your system. This folder is typically located at `/Library/Java/JavaVirtualMachines/`.

#### How do I install Java on macOS Big Sur (or the current version)?

You install Java similarly in all recent macOS versions, including Big Sur or the most current OS version. Select from manual installation, using Homebrew, or SDKMAN!, and follow the steps outlined earlier in this article.

#### Which Java package do I need?

The Java package you need depends on your requirements. You’ll need the JDK if you’re developing Java applications. The Java Runtime Environment (JRE) should suffice if you’re just running Java applications.

#### Where is Java on Mac installed?

Java is typically installed in /Library/Java/JavaVirtualMachines/ on macOS. Each Java version has its own subdirectory at this location.

#### How do I install Java on Mac M1?

Installing Java on Mac M1 is the same as installing it on any other Mac system. Select from manual installation, using Homebrew, or SDKMAN!, and follow the steps outlined above.
