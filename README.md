<h1>Indie game uploader</h1>
<p>Fully decentralized || 'Pure' DApp</p>
<p>Uploads a game to IPFS and stores the location on the Ethereum network</p>
<hr/>
<h2>Upload rules</h2>
<ul>
    <li>
        Upload a folder with all the assets contained inside
    </li>
    <li>
        Folder must contain a runnable index.html
    </li>
    <li>
        Folder must contain a description in description.txt
    </li>
    <li>
        Folder must contain a image in image.png
    </li>
</ul>
<hr/>
<h2>To run</h2>
<ul>
    <li>
        npm install
    </li>
    <li>
        npm start
    </li>
</ul>
<hr/>
<h2>To test</h2>
<ul>
    <li>
        npm test
    </li>
</ul>
<hr/>
<p>While writing tests, it's best to;</p>
<p>In separate terminals:</p>
<ul>
    <li>
        npm run ganache
    </li>
    <li>
        npm run start
    </li>
    <li>
        npm run test:dev
    </li>
</ul>
<hr/>
<h2>To upload productive fully decentralized app</h2>
<p>Start ipfs with 'ipfs daemon --enable-pubsub-experiment'</p>
<p>Run:</p>
<ul>
    <li>
        npm run deploy
    </li>
</ul>
<hr/>
<h2>Beware of dragons</h2>
<p>If the tests fail, replace the TEST variable in src/constants/constants.js with null</p>
<p>Always use "" for strings in src/constants/constants.js</p>
<p>Update submodules with 'git submodule update --recursive --remote'</p>
<hr/>
<h2>Tips</h2>
<p>List all ports</p>
<p>netstat -a -o -n</p>
<p>Kill ports in use</p>
<p>kill pid</p>
<p>Remove all files from IPFS</p>
<p>ipfs pin ls --type recursive | cut -d' ' -f1 | xargs -n1 ipfs pin rm</p>
<p>ipfs repo gc</p>
<hr/>