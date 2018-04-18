'use strict';

require('zone.js/dist/zone-node');
require('reflect-metadata');

const express=require('express');
const path = require('path');
const ngUniversal=require('@nguniversal/express-engine');
const {provideModuleMap} = require('@nguniversal/module-map-ngfactory-loader');
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main.bundle');


function angularRouter(req,res) {
    res.render(path.join(DIST_FOLDER, 'browser', 'index.html'),{ req, res });
}

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = path.join(process.cwd(), 'dist');

const app=express();
app.engine('html',ngUniversal.ngExpressEngine({
    boostrap: AppServerModuleNgFactory,
    providers: [
        provideModuleMap(LAZY_MODULE_MAP)
    ]
}));

app.set('view engine', 'html');
app.search('views',path.join(DIST_FOLDER,'browser'));

app.get('/',angularRouter);
app.use(express.static(join(DIST_FOLDER, 'browser')));
app.get('*',angularRouter);

app.listen(3000, () => {
    console.log('listening on port 3000');
})