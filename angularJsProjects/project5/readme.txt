Jobdirectory project

Install node js by going to website 
https://nodejs.org/en/

and do necessary steps

Download mango db 
https://www.mongodb.org/
https://www.mongodb.org/downloads
https://cloud.mongodb.com/user/register?_ga=1.144832496.591115490.1441596186
https://cloud.mongodb.com/v2/55ed03b7e4b05750fe5d9b0c#deployment/topology

manishkk74R@

Installing mongo db(http://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/?_ga=1.120837196.591115490.1441596186)
curl -O https://fastdl.mongodb.org/osx/mongodb-osx-x86_64-3.0.6.tgz
tar -zxvf mongodb-osx-x86_64-3.0.6.tgz
mkdir -p mongodb
cp -R -n mongodb-osx-x86_64-3.0.6/ mongodb
export PATH=<mongodb-install-directory>/bin:$PATH
mkdir -p /data/db
Set permissions for the data directory
Run MongoDB.¶
<path to binary>/mongod --dbpath <path to data directory>
e.g. ~/mongodb/bin/mongod --dbpath ~/mongodb/data/db/

Download python
https://www.python.org/downloads/





http://meanjs.org/

What is MEAN.JS?

MEAN.JS is a full-stack JavaScript solution that helps you build fast, robust, and maintainable production web applications using MongoDB, Express, AngularJS, and Node.js.


npm install -g bower
npm install -g grunt-cli
git clone https://github.com/meanjs/mean.git meanjs