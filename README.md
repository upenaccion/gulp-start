# gulp-start
Project Setup Steps

Please follow the below steps in exact order to setup the project environment.

###Step 1: Install NPM
 
 Please install NPM v.4.2.2 from https://nodejs.org/en/download/
 
 Note:Please make sure that you install v.4.2.2 or earlier but not v.5.x and later.

###Step 2: Install GitBash

 Please install GitBash from  https://git-for-windows.github.io/

###Step 3: Clone Repository

 1. Open GitBash command prompt.

 Move to projects root directory

 ```$ cd ./project_root_directory```

 2.Clone Repository

 ```$ git clone https://github.com/upenaccion/gulp-start.git```

 Note: Please make sure that you have the GitHub account.If not please create it.

###Step 4: Dependency Installations

 1.Open the command prompt

 2.move to the project root directory via command prompt
 
 ```$ cd ./project_root_directory```

 Please make sure that the directory contains the folder structure mentioned above with updated package.json, gulpfile.js and bower.json.
 
 3.Run below command

 ```$ npm install```

 This will install all the required node dependencies like gulp,bower etc. which are mentioned in package.json file. 

Note: By default the dependencies installed by above command like gulp,bower etc will work locally i.e you won’t be able to run these commands outside the current directory.
To install them globally you can run below commands:
npm install -g bower --save
npm install -g gulp --save
This will install them globally.


 4.Run the below command


 ```$ bower install```

 This will install all the required front end components like jquery,angularjs,bootstrap etc.  which are mentioned in bower.json file.

 5.Run the below command


 ```$ gulp```

 This will run the automated tasks like minification & merging of files, sass to css compilation etc.These processed files would then be moved to dist/ folder for deployment. 
 
