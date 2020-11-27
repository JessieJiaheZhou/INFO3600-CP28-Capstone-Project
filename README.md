# Introduction to Running and Deploying Our Code #
## User Guide ##
No extra installation is needed, just navigate to the URL [https://meeting.info3600cp28.net/hello/](https://meeting.info3600cp28.net/hello/)

## Self-hosting/Deployment guide ##
### Pre-requisites ###
To host our project on your own server, you will need to meet the following requirements: Server or VPS with Debian 10 (Buster) or later Ubuntu 18.04 (Bionic Beaver) or later, a Fully Qualified Domain Name assigned to your server root user access or Non-root sudo user access, an Email address for Let's Encrypt SSL Certificate. For demonstration purposes, we will use the domain demo.info3600cp28.net

### Install Jitsi ###

1.Set up fully qualified domain name (FQDN)
Create a DNS A record for the domain we want to use.
Access the server using SSH. Set host name and FQDN using following command

	$ sudo hostnamectl set-hostname demo

Then add this FQDN to /etc/hosts

	127.0.0.1 localhost
	x.x.x.x meet.example.org meet
	
2.Configure the firewall. Jitsi requires openSSH, HTTP and HTTPS, UDP on port 10000 and 20000. Set the firewall configuration to allow them with the following commands:

	$ sudo ufw allow OpenSSH
	$ sudo ufw allow http
	$ sudo ufw allow https
	$ sudo ufw allow in 10000:20000/udp
	$ sudo ufw enable
	Command may disrupt existing ssh connections. Proceed with operation (y|n)? y
	
3.Install OpenJDK JRE8 Jitsi require Java running environment. Install using following commands and set JAVA_HOME variable:

	$ sudo apt install -y openjdk-8-jre-headless
	$ echo "JAVA_HOME=$(readlink -f /usr/bin/java | sed "s:bin/java::")" | sudo tee -a /etc/profile
	$ source /etc/profile
	$ sudo apt install default-jdk
	
4.Install Nginx. Jisti performs better when using Nginx. Install it using following commands:

	$ sudo apt install -y nginx
	$ sudo systemctl start nginx.service
	$ sudo systemctl enable nginx.service
	
5.Install Jitsi from official repo:

	$ wget -qO - https://download.jitsi.org/jitsi-key.gpg.key | sudo apt-key add -
	$ echo "deb https://download.jitsi.org stable/"  | sudo tee -a /etc/apt/sources.list.d/jitsi-stable.list
	$ sudo apt update
	$ sudo apt install -y jitsi-meet
	
The installer will require you to set a FQDN, use the FQDN of your server. e.g. demo.info3600cp28.net 

Jitsi meet will ask you to setup a SSL certificate, select Generate a new self-signed certificate

6.Install Let's Encrypt and get an SSL Certificate Use following command to request SSL certificate. 
When prompted, enter your email address

	$ sudo /usr/share/jitsi-meet/scripts/install-letsencrypt-cert.sh
	Enter your email and press [ENTER]: demo@in3600.com
	
7.Test meeting
Navigate to [https://demo.info3600cp28.net.](https://demo.info3600cp28.net) You should be able to see jitsi welcome page 

8.Setup access page
Download source code of our project from project repository either directly from bitbucket or using git command 
	
	$ git clone https://lili7435@bitbucket.org/Kimbanu27/info3600_group2.git

Modify the meeting.html line
	
	var domain = "demo.info3600cp28.net";

change this line to your Jitsi server's FQDN.

9.Use any server you prefer

meeting.html is a static website and can be hosted using any preferred method of static website hosting.





