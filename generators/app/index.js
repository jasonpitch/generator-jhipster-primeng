const util = require('util');
const chalk = require('chalk');
const generator = require('yeoman-generator');
const packagejs = require('../../package.json');
const semver = require('semver');
const shelljs = require('shelljs');
const fs = require('fs');
const BaseGenerator = require('generator-jhipster/generators/generator-base');
const jhipsterConstants = require('generator-jhipster/generators/generator-constants');

const JhipsterGenerator = generator.extend({});
util.inherits(JhipsterGenerator, BaseGenerator);

const ANGULAR_VERSION = '4.2.6';
const PRIMENG_VERSION = '4.2.2';
const PRIMENG_EXT_WIZARD_VERSION = '2.1.0';
const CHARTJS_VERSION = '2.6.0';
const MOMENT_VERSION = '2.18.1';
const FULLCALENDAR_VERSION = '3.5.0';
const QUILL_VERSION = '1.3.2';

const CLIENT_MAIN_SRC_DIR = jhipsterConstants.CLIENT_MAIN_SRC_DIR;
const CLIENT_TEST_SRC_DIR = jhipsterConstants.CLIENT_TEST_SRC_DIR;

let themeName = 'omega';

const THEME_OPTIONS = [
    {
        value: 'omega',
        name: 'Omega'
    },
    {
        value: 'cruze',
        name: 'Cruze'
    },
    {
        value: 'darkness',
        name: 'Darkness'
    },
    {
        value: 'home',
        name: 'Home'
    },
    {
        value: 'bootstrap',
        name: 'Bootstrap'
    },
    {
        value: 'cupertino',
        name: 'Cupertino'
    },
    {
        value: 'flick',
        name: 'Flick'
    },
    {
        value: 'kasper',
        name: 'Kasper'
    },
    {
        value: 'lightness',
        name: 'Lightness'
    },
    {
        value: 'ludvig',
        name: 'Ludvig'
    },
    {
        value: 'pepper-grinder',
        name: 'Pepper-Grinder'
    },
    {
        value: 'redmond',
        name: 'Redmond'
    },
    {
        value: 'rocket',
        name: 'Rocket'
    },
    {
        value: 'south-street',
        name: 'South-Street'
    },
    {
        value: 'start',
        name: 'Start'
    },
    {
        value: 'tronstatic',
        name: 'Tronstatic'
    },
    {
        value: 'voclain',
        name: 'Voclain'
    }
];

const COMPONENT_CHOICE_LIST = [{
    name: 'inputs',
    value: 'inputs',
    checked: true
    }, {
    name: 'buttons',
    value: 'buttons',
    checked: false
    }, {
    name: 'data',
    value: 'data',
    checked: false
    }, {
    name: 'panel',
    value: 'panel',
    checked: false
    }, {
    name: 'overlay',
    value: 'overlay',
    checked: false
    }, {
    name: 'fileupload',
    value: 'fileupload',
    checked: false
    }, {
    name: 'menu',
    value: 'menu',
    checked: false
    }, {
    name: 'charts',
    value: 'charts',
    checked: false
    }, {
    name: 'messages',
    value: 'messages',
    checked: false
    }, {
    name: 'multimedia',
    value: 'multimedia',
    checked: false
    }, {
    name: 'dragdrop',
    value: 'dragdrop',
    checked: false
    }, {
    name: 'misc',
    value: 'misc',
    checked: false
    }
];

const codes = ['ad.png',
    'ae.png',
    'af.png',
    'ag.png',
    'al.png',
    'am.png',
    'ao.png',
    'ar.png',
    'at.png',
    'au.png',
    'az.png',
    'ba.png',
    'bb.png',
    'bd.png',
    'be.png',
    'bf.png',
    'bg.png',
    'bh.png',
    'bi.png',
    'bj.png',
    'bn.png',
    'bo.png',
    'br.png',
    'bs.png',
    'bt.png',
    'bw.png',
    'by.png',
    'bz.png',
    'ca.png',
    'cd.png',
    'cf.png',
    'cg.png',
    'ch.png',
    'ci.png',
    'cl.png',
    'cm.png',
    'cn.png',
    'co.png',
    'cr.png',
    'cu.png',
    'cv.png',
    'cy.png',
    'cz.png',
    'de.png',
    'dj.png',
    'dk.png',
    'dm.png',
    'do.png',
    'dz.png',
    'ec.png',
    'ee.png',
    'eg.png',
    'eh.png',
    'er.png',
    'es.png',
    'et.png',
    'fi.png',
    'fj.png',
    'fm.png',
    'fr.png',
    'ga.png',
    'gb.png',
    'gd.png',
    'ge.png',
    'gh.png',
    'gm.png',
    'gn.png',
    'gq.png',
    'gr.png',
    'gt.png',
    'gw.png',
    'gy.png',
    'hn.png',
    'hr.png',
    'ht.png',
    'hu.png',
    'id.png',
    'ie.png',
    'il.png',
    'in.png',
    'iq.png',
    'ir.png',
    'is.png',
    'it.png',
    'jm.png',
    'jo.png',
    'jp.png',
    'ke.png',
    'kg.png',
    'kh.png',
    'ki.png',
    'km.png',
    'kn.png',
    'kp.png',
    'kr.png',
    'ks.png',
    'kw.png',
    'kz.png',
    'la.png',
    'lb.png',
    'lc.png',
    'li.png',
    'lk.png',
    'lr.png',
    'ls.png',
    'lt.png',
    'lu.png',
    'lv.png',
    'ly.png',
    'ma.png',
    'mc.png',
    'md.png',
    'me.png',
    'mg.png',
    'mh.png',
    'mk.png',
    'ml.png',
    'mm.png',
    'mn.png',
    'mr.png',
    'mt.png',
    'mu.png',
    'mv.png',
    'mw.png',
    'mx.png',
    'my.png',
    'mz.png',
    'na.png',
    'ne.png',
    'ng.png',
    'ni.png',
    'nl.png',
    'no.png',
    'np.png',
    'nr.png',
    'nz.png',
    'om.png',
    'pa.png',
    'pe.png',
    'pg.png',
    'ph.png',
    'pk.png',
    'pl.png',
    'pt.png',
    'pw.png',
    'py.png',
    'qa.png',
    'ro.png',
    'rs.png',
    'ru.png',
    'rw.png',
    'sa.png',
    'sb.png',
    'sc.png',
    'sd.png',
    'se.png',
    'sg.png',
    'si.png',
    'sk.png',
    'sl.png',
    'sm.png',
    'sn.png',
    'so.png',
    'sr.png',
    'st.png',
    'sv.png',
    'sy.png',
    'sz.png',
    'td.png',
    'tg.png',
    'th.png',
    'tj.png',
    'tl.png',
    'tm.png',
    'tn.png',
    'to.png',
    'tr.png',
    'tt.png',
    'tv.png',
    'tw.png',
    'tz.png',
    'ua.png',
    'ug.png',
    'us.png',
    'uy.png',
    'uz.png',
    'va.png',
    'vc.png',
    've.png',
    'vn.png',
    'vu.png',
    'ws.png',
    'ye.png',
    'za.png',
    'zm.png',
    'zw.png'];

const components = {
    inputgroup: 'inputs',
    inputtext: 'inputs',
    inputtextarea: 'inputs',
    calendar: 'inputs',
    chips: 'inputs',
    inputswitch: 'inputs',
    inputmask: 'inputs',
    passwordindicator: 'inputs',
    rating: 'inputs',
    spinner: 'inputs',
    togglebutton: 'inputs',
    autocomplete: 'inputs',
    checkbox: 'inputs',
    colorpicker: 'inputs',
    editor: 'inputs',
    listbox: 'inputs',
    select: 'inputs',
    radiobutton: 'inputs',
    slider: 'inputs',
    selectbutton: 'inputs',
    button: 'buttons',
    splitbutton: 'buttons',
    datatable: 'data',
    datagrid: 'data',
    carousel: 'data',
    orderlist: 'data',
    datalist: 'data',
    paginator: 'data',
    schedule: 'data',
    treetable: 'data',
    datascroller: 'data',
    orgchart: 'data',
    gmap: 'data',
    picklist: 'data',
    tree: 'data',
    accordion: 'panel',
    panel: 'panel',
    tabview: 'panel',
    fieldset: 'panel',
    grid: 'panel',
    toolbar: 'panel',
    sidebar: 'overlay',
    dialog: 'overlay',
    confirmdialog: 'overlay',
    lightbox: 'overlay',
    overlaypanel: 'overlay',
    tooltip: 'overlay',
    fileupload: 'fileupload',
    menu: 'menu',
    contextmenu: 'menu',
    panelmenu: 'menu',
    steps: 'menu',
    tieredmenu: 'menu',
    breadcrumb: 'menu',
    megamenu: 'menu',
    menubar: 'menu',
    slidemenu: 'menu',
    tabmenu: 'menu',
    barchart: 'charts',
    doughnutchart: 'charts',
    linechart: 'charts',
    piechart: 'charts',
    polarareachart: 'charts',
    radarchart: 'charts',
    messages: 'messages',
    growl: 'messages',
    galleria: 'multimedia',
    dragdrop: 'dragdrop',
    captcha: 'misc',
    defer: 'misc',
    rtl: 'misc',
    blockui: 'misc',
    terminal: 'misc',
    inplace: 'misc',
    progressbar: 'misc',
    validation: 'misc'
};

const primengTranslation = `"primeng": {
                "main": "primeng",
                "barchart": "BarChart",
                "doughnutchart": "DoughnutChart",
                "linechart": "LineChart",
                "piechart": "PieChart",
                "polarareachart": "PolarAreaChart",
                "radarchart": "RadarChart",
                "button": "Button",
                "splitbutton": "SplitButton",
                "inputgroup":"InputGroup",
                "inputtext":"InputText",
                "inputtextarea":"InputTextArea",
                "calendar": "Calendar",
                "chips": "Chips",
                "inputswitch":"InputSwitch",
                "inputmask":  "InputMask",
                "passwordindicator":  "Password Indicator",
                "rating":  "Rating",
                "spinner": "Spinner",
                "togglebutton": "ToggleButton",
                "autocomplete": "AutoComplete",
                "checkbox":  "Checkbox&TriCheckbox",
                "colorpicker":"ColorPicker",
                "editor":  "Editor",
                "listbox": "Listbox",
                "select":  "MultiSelect&Dropdown",
                "radiobutton": "RadioButton",
                "slider":  "Slider",
                "selectbutton": "SelectButton",
                "galleria":"Galleria",
                "messages":"Messages",
                "growl":"Growl",
                "dialog":"Dialog",
                "confirmdialog":"ConfirmDialog",
                "lightbox": "Lightbox",
                "overlaypanel":"OverlayPanel",
                "sidebar": "SideBar",
                "tooltip": "Tooltip",
                "datatable": "DataTable",
                "datagrid": "DataGrid",
                "carousel": "Carousel",
                "orderlist": "OrderList",
                "datalist": "DataList",
                "paginator": "Paginator",
                "schedule": "Schedule",
                "treetable": "TreeTable",
                "datascroller": "DataScroller",
                "orgchart": "OrgChart",
                "gmap":  "Gmap",
                "picklist":  "PickList",
                "tree":  "Tree",
                "dragdrop":"DragDrop",
                "menu":  "Menu",
                "contextmenu":  "ContextMenu",
                "panelmenu":"PanelMenu",
                "steps":  "Steps",
                "tieredmenu":"TieredMenu",
                "breadcrumb": "Breadcrumb",
                "megamenu": "MegaMenu",
                "menubar":  "Menubar",
                "slidemenu": "SlideMenu",
                "tabmenu":  "TabMenu",
                "fileupload":"FileUpload",
                "accordion":"Accordion",
                "panel":  "Panel",
                "tabview":  "TabView",
                "fieldset":  "Fieldset",
                "grid":  "Grid",
                "toolbar": "Toolbar",
                "validation":"validation",
                "captcha": "Captcha",
                "defer":  "Defer",
                "rtl":  "RTL",
                "blockui":  "BlockUI",
                "terminal": "Terminal",
                "inplace":  "Inplace",
                "progressbar": "ProgressBar"
            },`;

module.exports = JhipsterGenerator.extend({

    constructor: function (...args) { // eslint-disable-line object-shorthand
        generator.apply(this, args);

        this.option('default', {
            type: String,
            required: false,
            description: 'default option'
        });

        this.defaultOption = this.options.default;
    },

    initializing: {
        readConfig() {
            this.jhipsterAppConfig = this.getJhipsterAppConfig();
            if (!this.jhipsterAppConfig) {
                this.error('Can\'t read .yo-rc.json');
            }
        },
        readPackageJson() {
            const fromPath = 'package.json';
            this.libAngularVersion = ANGULAR_VERSION;
            if (shelljs.test('-f', fromPath)) {
                const fileData = this.fs.readJSON(fromPath);
                if (fileData && fileData.dependencies) {
                    if (fileData.dependencies['@angular/common']) {
                        this.libAngularVersion = fileData.dependencies['@angular/common'];
                    }
                    if (fileData.dependencies['@angular/animations']) {
                        this.libAngularAnimationsVersion = fileData.dependencies['@angular/animations'];
                    }
                    if (fileData.dependencies.primeng) {
                        this.libPrimeNgVersion = fileData.dependencies.primeng;
                    }
                    if (fileData.dependencies['primeng-extensions-wizard']) {
                        this.libPrimeNgExtensionsWizardVersion = fileData.dependencies['primeng-extensions-wizard'];
                    }

                    if (fileData.dependencies['chart.js']) {
                        this.libChartJsVersion = fileData.dependencies['chart.js'];
                    }

                    if (fileData.dependencies.moment) {
                        this.libMomentVersion = fileData.dependencies.moment;
                    }

                    if (fileData.dependencies.fullcalendar) {
                        this.libFullcalendarVersion = fileData.dependencies.fullcalendar;
                    }

                    if (fileData.dependencies.quill) {
                        this.libQuillVersion = fileData.dependencies.quill;
                    }

                    if (fileData.dependencies['chart.js']) {
                        this.libChartJsVersion = fileData.dependencies['chart.js'];
                    }
                }
            }
        },
        displayLogo() {
            // Have Yeoman greet the user.
            this.log('');
            this.log(`${chalk.red('██████╗  ██████╗  ██╗ ███╗   ███╗ ███████╗ ███╗   ██╗  ██████╗')}`);
            this.log(`${chalk.red('██╔══██╗ ██╔══██╗ ██║ ████╗ ████║ ██╔════╝ ████╗  ██║ ██╔════╝')}`);
            this.log(`${chalk.red('██████╔╝ ██████╔╝ ██║ ██╔████╔██║ █████╗   ██╔██╗ ██║ ██║  ███╗')}`);
            this.log(`${chalk.red('██╔═══╝  ██╔══██╗ ██║ ██║╚██╔╝██║ ██╔══╝   ██║╚██╗██║ ██║   ██║')}`);
            this.log(`${chalk.red('██║      ██║  ██║ ██║ ██║ ╚═╝ ██║ ███████╗ ██║ ╚████║ ╚██████╔╝')}`);
            this.log(`${chalk.red('╚═╝      ╚═╝  ╚═╝ ╚═╝ ╚═╝     ╚═╝ ╚══════╝ ╚═╝  ╚═══╝  ╚═════╝')}`);
            this.log(`\nWelcome to the ${chalk.bold.yellow('JHipster primeng')} generator! ${chalk.yellow(`v${packagejs.version}\n`)}`);
        },
        checkclientFramework() {
            if (this.jhipsterAppConfig.clientFramework !== 'angular4' && this.jhipsterAppConfig.clientFramework !== 'angularX') {
                this.env.error(`${chalk.red.bold('ERROR!')} This module works only for Angular4...`);
            }
        },
        checkJhipster() {
            const jhipsterVersion = this.jhipsterAppConfig.jhipsterVersion;
            const minimumJhipsterVersion = packagejs.dependencies['generator-jhipster'];
            if (!semver.satisfies(jhipsterVersion, minimumJhipsterVersion)) {
                this.warning(`\nYour generated project used an old JHipster version (${jhipsterVersion})... you need at least (${minimumJhipsterVersion})\n`);
            }
        }
    },


    prompting() {
        const done = this.async();
        const prompts = [
            {
                type: 'confirm',
                name: 'confirmation',
                message: 'Do you want to install PrimeNG?',
                default: true
            },
            {
                type: 'list',
                name: 'theme',
                message: 'Which theme would you like to use?',
                choices: THEME_OPTIONS,
                default: 'omega'
            },
            {
                type: 'checkbox',
                name: 'componentGroups',
                message: 'Which components you would like to include?',
                choices: COMPONENT_CHOICE_LIST,
            }
        ];

        this.prompt(prompts).then((props) => {
            this.props = props;
            this.selectAll = this.props.selectAll;
            // To access props later use this.props.someOption;
            done();
        });
    },

    writing() {
        if (this.defaultOption === undefined && !this.props.confirmation) {
            return;
        }

        themeName = this.props.theme;
        this.categories = this.props.componentGroups;

        // function to use directly template
        this.template = function (source, destination) {
            this.fs.copyTpl(
                this.templatePath(source),
                this.destinationPath(destination),
                this
            );
        };

        // function to use directly template
        this.copyImageFiles = function (source, destination) {
            this.fs.copy(
                this.templatePath(source),
                this.destinationPath(destination)
            );
        };

        const primengResources = `\n@import "~primeng/resources/primeng.min.css";\n @import "~primeng/resources/themes/${themeName}/theme.css";\n @import "~quill/dist/quill.core.css";\n @import "~quill/dist/quill.snow.css";`;
        const primengRootResources = `<script src=\"https://code.jquery.com/jquery-2.2.4.min.js\"></script>\n
                                      <link rel=\"stylesheet\" type=\"text/css\" href=\"https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.1.0/fullcalendar.min.css\">\n
                                      <script src=\"https://www.google.com/recaptcha/api.js?render=explicit&onload=initRecaptcha\" async defer>\n
                                      </script> \n <script src=\"https://cdn.quilljs.com/1.0.0/quill.js\"></script> \n  
                                      <script type=\"text/javascript\" src=\"https://maps.google.com/maps/api/js?key=AIzaSyA6Ar0UymhiklJBzEPLKKn2QHwbjdz3XV0\" ></script>\n
                                      <script src=\"https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js\"></script> \n
                                      <script src=\"https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.1.0/fullcalendar.min.js\"></script>\n`;

        if (this.copyExternalAssetsInWebpack) {
            this.copyExternalAssetsInWebpack('primeng', 'primeng');
        } else {
            this.log(`${chalk.yellow('WARNING the function copyExternalAssetsInWebpack is missing, you need to add the missing resource path in webpack.common.ts:')}`);
            this.log(`${chalk.yellow('  - inside CopyWebpackPlugin function of webpack.common.ts file: ') +  '{ from: \'./src/main/webapp/content/primeng\', to: \'content/primeng\'}'}`);
        }

        if (this.addExternalResourcesToRoot) {
            this.addExternalResourcesToRoot(`${primengRootResources}`, 'PrimeNG resources added here');
        } else {
            this.log(`${chalk.yellow('WARNING the function addExternalResourcesToRoot is missing, you need to add the missing resource path in the head section of index.html file:')}`);
            this.log(`${chalk.yellow('Add the resources- ')} ${primengRootResources}`);
        }

        if (this.addVendorSCSSStyle) {
            this.addVendorSCSSStyle(primengResources, `PrimeNG and it's third-party dependencies resources`);
            this.log('The PrimeNG resources were updated using JHipster API!');
        } else {
            // append PrimeNG resources using appendFile
            fs.appendFile(`${CLIENT_MAIN_SRC_DIR}content/scss/vendor.scss`,
                primengResources, (err) => {
                    if (err) throw err;
                    this.log('The PrimeNG resources were updated!');
                });
        }

        // init all variables
        this.anyError = false;

        this.enableTranslation = this.jhipsterAppConfig.enableTranslation;
        this.languages = this.jhipsterAppConfig.languages;
        this.baseName = this.jhipsterAppConfig.baseName;
        this.clientFramework = this.jhipsterAppConfig.clientFramework;
        this.clientPackageManager = this.jhipsterAppConfig.clientPackageManager;
        this.protractorTests = this.jhipsterAppConfig.testFrameworks.indexOf('protractor') !== -1;
        this.angular2AppName = this.getAngular2AppName();


        // add dependencies
        try {
            if (this.libAngularAnimationsVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json',
                    `"@angular/animations": "${this.libAngularAnimationsVersion}"`,
                    `"@angular/animations": "${this.libAngularVersion}"`);
            } else {
                this.addNpmDependency('@angular/animations', `${this.libAngularVersion}`);
            }

            if (this.libPrimeNgVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"primeng": "${this.libPrimeNgVersion}"`, `"primeng": "${PRIMENG_VERSION}"`);
            } else {
                this.addNpmDependency('primeng', `${PRIMENG_VERSION}`);
            }

            if (this.libPrimeNgExtensionsWizardVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"primeng-extensions-wizard": "${this.libPrimeNgExtensionsWizardVersion}"`, `"primeng-extensions-wizard": "${PRIMENG_EXT_WIZARD_VERSION}"`);
            } else {
                this.addNpmDependency('primeng-extensions-wizard', `${PRIMENG_EXT_WIZARD_VERSION}`);
            }

            if (this.libChartJsVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"chart.js": "${this.libChartJsVersion}"`, `"chart.js": "${CHARTJS_VERSION}"`);
            } else {
                this.addNpmDependency('chart.js', `${CHARTJS_VERSION}`);
            }

            if (this.libFullcalendarVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"moment": "${this.libMomentVersion}"`, `"moment": "${MOMENT_VERSION}"`);
                this.replaceContent('package.json', `"fullcalendar": "${this.libFullcalendarVersion}"`, `"fullcalendar": "${FULLCALENDAR_VERSION}"`);
            } else {
                this.addNpmDependency('moment', `${MOMENT_VERSION}`);
                this.addNpmDependency('fullcalendar', `${FULLCALENDAR_VERSION}`);
            }

            if (this.libQuillVersion) {
                // the version already exists, so try to upgrade instead
                this.replaceContent('package.json', `"quill": "${this.libQuillVersion}"`, `"quill": "${QUILL_VERSION}"`);
            } else {
                this.addNpmDependency('quill', `${QUILL_VERSION}`);
            }
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Problem when adding the new librairies in your package.json');
            this.log('  You need to add manually:\n');
            this.log(`  "@angular/animations": "${this.libAngularVersion}",`);
            this.log(`  "primeng": "${PRIMENG_VERSION}"`);
            this.log(`  "primeng-extensions-wizard": "${PRIMENG_EXT_WIZARD_VERSION}"`);
            this.log(`  "chart.js": "${CHARTJS_VERSION}",`);
            this.log(`  "moment": "${MOMENT_VERSION}",`);
            this.log(`  "fullcalendar": "${FULLCALENDAR_VERSION}",`);
            this.log(`  "quill": "${QUILL_VERSION}",`);
            this.log('');
            this.anyError = true;
        }

        // add module to app.module.ts
        try {
            this.addAngularModule(this.angular2AppName, 'primeng', 'primeng', 'primeng', this.enableTranslation, this.clientFramework);
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Problem when updating your app.module.ts');
            this.log('  You need to import manually the new primeng.module.ts:\n');
            this.log(`${chalk.yellow.bold(`  import { ${this.angular2AppName}primengModule } from './primeng/primeng.module';`)}`);
            this.log('\n  and:\n');
            this.log(`${chalk.yellow.bold(`  ${this.angular2AppName}primengModule,`)}\n`);
            this.anyError = true;
        }

        this.inputComponents = `
                   <hr/>
                   <span style="font-weight:bold">Input Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputtext" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.inputtext">InputText</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputtextarea" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.inputtextarea">InputTextArea</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputgroup" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.inputgroup">InputGroup</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="calendar" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.calendar">Calendar</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="chips" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.chips">Chips</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputswitch" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.inputswitch">InputSwitch</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputmask" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.inputmask">InputMask</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="passwordindicator" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.passwordindicator">Password Indicator</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="rating" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.rating">Rating</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="spinner" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.spinner">Spinner</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="togglebutton" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.togglebutton">ToggleButton</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="autocomplete" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.autocomplete">AutoComplete</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="checkbox" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.checkbox">Checkbox&TrieCheckbox</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="colorpicker" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.colorpicker">ColorPicker</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="editor" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.editor">Editor</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="listbox" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.listbox">Listbox</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="select" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.select">MultiSelect&Dropdown</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radiobutton" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.radiobutton">RadioButton</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="slider" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.slider">Slider</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="selectbutton" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.selectbutton">SelectButton</span>
                        </a>
                    </li>`;

        this.messageComponents = `
                   <hr/>
                   <span style="font-weight:bold">Messages Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="messages" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.messages">Messages</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="growl" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.growl">Growl</span>
                        </a>
                    </li>`;

        this.multimediaComponents = `
                   <hr/>
                    <span style="font-weight:bold">Multimedia Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="galleria" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.galleria">Galleria</span>
                        </a>
                    </li>`;

        this.fileuploadComponents = `
                   <hr/>
                    <span style="font-weight:bold">File Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="fileupload" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.fileupload">FileUpload</span>
                        </a>
                    </li>`;

        this.dataComponents = `
                   <hr/>
                   <span style="font-weight:bold">Data Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="datatable" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.datatable">Datatable</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="datagrid" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.datagrid">Datagrid</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="carousel" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.carousel">Carousel</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="orderlist" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.orderlist">OrderList</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="datalist" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.datalist">DataList</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="paginator" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.paginator">Paginator</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="schedule" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.schedule">Schedule</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="datascroller" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.datascroller">DataScroller</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="orgchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.orgchart">OrgChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="gmap" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.gmap">Gmap</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="picklist" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.picklist">PickList</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="tree" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.tree">Tree</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="treetable" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.treetable">TreeTable</span>
                        </a>
                    </li>`;
        this.dragdropComponents = `
                   <hr/>
                    <span style="font-weight:bold">Dragdrop Components</span>
                   <hr/>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="dragdrop" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.dragdrop">DragDrop</span>
                        </a>
                    </li>`;

        this.menuComponents = `
            <hr/>
            <span style="font-weight:bold">Menu Components</span>
        <hr/>
        <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="menu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.menu">Menu</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="contextmenu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.contextmenu">Contextmenu</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="panelmenu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.panelmenu">Panelmenu</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="steps" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.steps">Steps</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="tieredmenu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.tieredmenu">Tieredmenu</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="breadcrumb" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.breadcrumb">Breadcrumb</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="megamenu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.megamenu">Megamenu</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="menubar" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.menubar">Menubar</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="slidemenu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.slidemenu">Slidemenu</span>
            </a>
            </li>
            <li uiSrefActive="active">
            <a class="dropdown-item" routerLink="tabmenu" routerLinkActive="active" (click)="collapseNavbar()">
            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
            <span jhiTranslate="global.menu.primeng.tabmenu">Tabmenu</span>
            </a>
            </li>`;

        this.overlayComponents = `
                   <hr/>
                    <span style="font-weight:bold">Overlay Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="dialog" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.dialog">Dialog</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="confirmdialog" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.confirmdialog">ConfirmDialog</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="lightbox" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.lightbox">Lightbox</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="overlaypanel" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.overlaypanel">OverlayPanel</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="tooltip" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.tooltip">Tooltip</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="sidebar" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.sidebar">SideBar</span>
                        </a>
                    </li>`;
        this.panelComponents = `
                   <hr/>
                    <span style="font-weight:bold">Panel Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="accordion" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.accordion">Accordion</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="panel" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.panel">Panel</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="tabview" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.tabview">TabView</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="fieldset" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.fieldset">Fieldset</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="grid" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.grid">grid</span>
                        </a>
                    </li>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="toolbar" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.toolbar">ToolBar</span>
                        </a>
                    </li>`;
        this.buttonComponents = `
                   <hr/>
                   <span style="font-weight:bold">Button Components</span>
                   <hr/>
                   <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="button" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.button">Button</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="splitbutton" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.splitbutton">SplitButton</span>
                        </a>
                    </li>`;
        this.chartComponents = `
                   <hr/>
                   <span style="font-weight:bold">Chart Components</span>
                   <hr/>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="barchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bar-chart" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.barchart">BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="doughnutchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o-notch" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.doughnutchart">BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="linechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-line-chart" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.linechart">LineChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="piechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.piechart">PieChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="polarareachart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.polarareachart">PolarAreaChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radarchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.radarchart">RadarChart</span>
                        </a>
                    </li>`;
        this.miscComponents = `
                   <hr/>
                    <span style="font-weight:bold">Miscellaneous Components</span>
                   <hr/>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="validation" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.validation">Validation</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="captcha" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.captcha">Captcha</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="defer" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.defer">Defer</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="rtl" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.rtl">RTL</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="blockui" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.blockui">BlockUI</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="terminal" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.terminal">Terminal</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inplace" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.inplace">Inplace</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="progressbar" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o" aria-hidden="true"></i>
                            <span jhiTranslate="global.menu.primeng.progressbar">ProgressBar</span>
                        </a>
                    </li>`;
           if(this.categories) {
               this.componentGroups = (this.categories.indexOf('inputs') > -1 ? this.inputComponents : '') + (this.categories.indexOf('buttons') > -1 ? this.buttonComponents : '') + (this.categories.indexOf('data') > -1 ? this.dataComponents : '') +
                   (this.categories.indexOf('panel') > -1 ? this.panelComponents : '') + (this.categories.indexOf('dragdrop') > -1 ? this.dragdropComponents : '') + (this.categories.indexOf('fileupload') > -1 ? this.fileuploadComponents : '') +
                   (this.categories.indexOf('charts') > -1 ? this.chartComponents : '') + (this.categories.indexOf('menu') > -1 ? this.menuComponents : '') + (this.categories.indexOf('messages') > -1 ? this.messageComponents : '') +
                   (this.categories.indexOf('overlay') > -1 ? this.overlayComponents : '') + (this.categories.indexOf('multimedia') > -1 ? this.multimediaComponents : '') + (this.categories.indexOf('misc') > -1 ? this.miscComponents : '');
           } else {
               this.componentGroups = '';
           }
        // add element to menu
        let primengMenu;
        if (this.enableTranslation) {
            primengMenu = `<li *ngSwitchCase="true" ngbDropdown class="nav-item dropdown pointer" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="primeng-menu">
                    <span>
                        <i class="fa fa-area-chart" aria-hidden="true"></i>
                        <span jhiTranslate="global.menu.primeng.main">primeng</span>
                        <b class="caret"></b>
                    </span>
                </a>
                <ul class="dropdown-menu" ngbDropdownMenu style="max-height:500px;overflow: scroll">
                      ${this.componentGroups}
                </ul>
            </li>`;
        } else {
            primengMenu = `<li *ngSwitchCase="true" ngbDropdown class="nav-item dropdown pointer" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">
                <a class="nav-link dropdown-toggle" ngbDropdownToggle href="javascript:void(0);" id="primeng-menu">
                    <span>
                        <i class="fa fa-area-chart" aria-hidden="true"></i>
                        <span>primeng</span>
                        <b class="caret"></b>
                    </span>
                </a>
                <ul class="dropdown-menu" ngbDropdownMenu>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputtext" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>InputText</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputtextarea" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>InputTextArea</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="inputgroup" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>InputGroup</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="button" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span>Button</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="dialog" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>Dialog</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="confirmdialog" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span>ConfirmDialog</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="splitbutton" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>SplitButton</span>
                        </a>
                    </li>

                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="barchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bar-chart" aria-hidden="true"></i>
                            <span>BarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="doughnutchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-circle-o-notch" aria-hidden="true"></i>
                            <span>DoughnutChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="linechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-line-chart" aria-hidden="true"></i>
                            <span>LineChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="piechart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>
                            <span>PieChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="polarareachart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span>PolarAreaChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="radarchart" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>RadarChart</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="galleria" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-pie-chart" aria-hidden="true"></i>
                            <span>Galleria</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="messages" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-bullseye" aria-hidden="true"></i>
                            <span>Messages</span>
                        </a>
                    </li>
                    <li uiSrefActive="active">
                        <a class="dropdown-item" routerLink="growl" routerLinkActive="active" (click)="collapseNavbar()">
                            <i class="fa fa-fw fa-star-o" aria-hidden="true"></i>
                            <span>Growl</span>
                        </a>
                    </li>
                </ul>
            </li>`;
        }
        try {
            this.rewriteFile(
                'src/main/webapp/app/layouts/navbar/navbar.component.html',
                'jhipster-needle-add-element-to-menu',
                `${primengMenu}`);
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Missing needle \'jhipster-needle-add-element-to-menu\' in src/main/webapp/app/layouts/navbar/navbar.component.html');
            this.log('  You need to add manually the menu:\n');
            this.log(`            ${primengMenu}`);
            this.log('');
            this.anyError = true;
        }

        // add protractor tests
        if (this.protractorTests) {
            const primengSpec = '\'./e2e/primeng/primeng.spec.ts\',';
            try {
                this.rewriteFile(
                    'src/test/javascript/protractor.conf.js',
                    'jhipster-needle-add-protractor-tests',
                    `${primengSpec}`);
            } catch (e) {
                this.log(`${chalk.red.bold('ERROR!')}`);
                this.log('  Missing needle \'jhipster-needle-add-protractor-tests\' in src/test/javascript/protractor.conf.js');
                this.log('  You need to add manually in specs item:\n');
                this.log(`            ${primengSpec}`);
                this.log('');
                this.anyError = true;
            }
            this.template('src/test/javascript/e2e/primeng/_primeng.spec.ts', 'src/test/javascript/e2e/primeng/primeng.spec.ts');
        }


    // add captcha to vendor
       /* try {
            this.rewriteFile(
        'src/main/webapp/app/vendor.ts',
        'jhipster-needle-add-element-to-vendor',
        'import \'https://www.google.com/recaptcha/api.js?render=explicit&onload=initRecaptcha\';');
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Missing needle \'jhipster-needle-add-element-to-vendor\' in src/main/webapp/app/vendor.ts');
            this.log('  You need to add manually:\n');
            this.log(`${chalk.yellow.bold('https://www.google.com/recaptcha/api.js?render=explicit&onload=initRecaptcha')}`);
            this.log('');
            this.anyError = true;
        }*/

    // add quill to vendor
        try {
            this.rewriteFile(
        'src/main/webapp/app/vendor.ts',
        'jhipster-needle-add-element-to-vendor',
        'import \'quill/dist/quill.js\';');
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Missing needle \'jhipster-needle-add-element-to-vendor\' in src/main/webapp/app/vendor.ts');
            this.log('  You need to add manually:\n');
            this.log(`${chalk.yellow.bold('import \'quill/dist/quill.js\';')}`);
            this.log('');
            this.anyError = true;
        }

        // add chart to vendor
        try {
            this.rewriteFile(
                'src/main/webapp/app/vendor.ts',
                'jhipster-needle-add-element-to-vendor',
                'import \'chart.js/src/chart.js\';');
        } catch (e) {
            this.log(`${chalk.red.bold('ERROR!')}`);
            this.log('  Missing needle \'jhipster-needle-add-element-to-vendor\' in src/main/webapp/app/vendor.ts');
            this.log('  You need to add manually:\n');
            this.log(`${chalk.yellow.bold('import \'chart.js/src/chart.js\';')}`);
            this.log('');
            this.anyError = true;
        }

        // copy all translations
        if (this.enableTranslation) {
            this.languages.forEach((language) => {
                this.template('src/main/webapp/i18n/en/primeng.json', `src/main/webapp/i18n/${language}/primeng.json`);
                try {
                    this.rewriteFile(
                        `src/main/webapp/i18n/${language}/global.json`,
                        'jhipster-needle-menu-add-element',
                        `${primengTranslation}`);
                } catch (e) {
                    this.log(`${chalk.red.bold('ERROR!')}`);
                    this.log(`  Missing needle 'jhipster-needle-menu-add-element' in src/main/webapp/i18n/${language}/global.json`);
                    this.log('  You need to add manually:');
                    this.log(`${primengTranslation}`);
                    this.log('');
                    this.anyError = true;
                }
            });
        }


        // copy all primeng files
        this.template('src/main/webapp/app/primeng/primeng.module.ts', 'src/main/webapp/app/primeng/primeng.module.ts');

        for (var component in components) {
            this.template(`src/main/webapp/app/primeng/${components[component]}/${component}/index.ts`, `src/main/webapp/app/primeng/${components[component]}/${component}/index.ts`);
            this.template(`src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.component.html`, `src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.component.html`);
            this.template(`src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.component.ts`, `src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.component.ts`);
            this.template(`src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.module.ts`, `src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.module.ts`);
            this.template(`src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.route.ts`, `src/main/webapp/app/primeng/${components[component]}/${component}/${component}demo.route.ts`);
        }

        const browserComponents = {
            carousel: 'data',
            datagrid: 'data',
            datalist: 'data',
            datascroller: 'data',
            datatable: 'data',
            grid: 'panel',
            defer: 'misc',
            inplace: 'misc'
        };
        for (var component in browserComponents) {
            this.template(`src/main/webapp/app/primeng/${browserComponents[component]}/${component}/service/browser.service.ts`, `src/main/webapp/app/primeng/${browserComponents[component]}/${component}/service/browser.service.ts`);
            this.template(`src/main/webapp/app/primeng/${browserComponents[component]}/${component}/service/browser.ts`, `src/main/webapp/app/primeng/${browserComponents[component]}/${component}/service/browser.ts`);
        }

        this.template('src/main/webapp/app/primeng/data/datatable/service/mybrowser.ts', 'src/main/webapp/app/primeng/data/datatable/service/mybrowser.ts');
        this.template('src/main/webapp/app/primeng/misc/defer/service/mybrowser.ts', 'src/main/webapp/app/primeng/misc/defer/service/mybrowser.ts');
        this.template('src/main/webapp/app/primeng/misc/inplace/service/mybrowser.ts', 'src/main/webapp/app/primeng/misc/inplace/service/mybrowser.ts');

        const cityComponents = { tree: 'data', treetable: 'data' };
        for (var component in cityComponents) {
            this.template(`src/main/webapp/app/primeng/${cityComponents[component]}/${component}/service/treenode.service.ts`, `src/main/webapp/app/primeng/${cityComponents[component]}/${component}/service/treenode.service.ts`);
        }

        this.template('src/main/webapp/app/primeng/data/schedule/event/event.ts', 'src/main/webapp/app/primeng/data/schedule/event/event.ts');
        this.template('src/main/webapp/app/primeng/data/schedule/service/event.service.ts', 'src/main/webapp/app/primeng/data/schedule/service/event.service.ts');
        this.template('src/main/webapp/app/primeng/data/orgchart/service/vcard.ts', 'src/main/webapp/app/primeng/data/orgchart/service/vcard.ts');
        this.template('src/main/webapp/app/primeng/data/orgchart/service/vcard.service.ts', 'src/main/webapp/app/primeng/data/orgchart/service/vcard.service.ts');
        this.template('src/main/webapp/app/primeng/menu/contextmenu/service/employee.ts', 'src/main/webapp/app/primeng/menu/contextmenu/service/employee.ts');
        this.template('src/main/webapp/app/primeng/menu/contextmenu/service/employee.service.ts', 'src/main/webapp/app/primeng/menu/contextmenu/service/employee.service.ts');
        this.template('src/main/webapp/app/primeng/dragdrop/dragdrop/service/document.ts', 'src/main/webapp/app/primeng/dragdrop/dragdrop/service/document.ts');
        this.template('src/main/webapp/app/primeng/dragdrop/dragdrop/service/document.service.ts', 'src/main/webapp/app/primeng/dragdrop/dragdrop/service/document.service.ts');
        // this.copyImageFiles(`src/main/webapp/app/primeng/overlay/overlaypanel/assets/data/videos/ironman.mp4`, `src/main/webapp/app/primeng/overlay/overlaypanel/assets/data/videos/ironman.mp4`);
        // this.copyImageFiles(`src/main/webapp/app/primeng/overlay/lightbox/assets/data/videos/ironman.mp4`, `src/main/webapp/app/primeng/overlay/lightbox/assets/data/videos/ironman.mp4`);
        this.template('src/main/webapp/app/primeng/overlay/overlaypanel/service/score.ts', 'src/main/webapp/app/primeng/overlay/overlaypanel/service/score.ts');
        this.template('src/main/webapp/app/primeng/overlay/overlaypanel/service/score.service.ts', 'src/main/webapp/app/primeng/overlay/overlaypanel/service/score.service.ts');
        this.template('src/main/webapp/app/primeng/misc/blockui/backend/employees.ts', 'src/main/webapp/app/primeng/misc/blockui/backend/employees.ts');
        this.template('src/main/webapp/app/primeng/misc/blockui/backend/fake-backend.ts', 'src/main/webapp/app/primeng/misc/blockui/backend/fake-backend.ts');
        this.template('src/main/webapp/app/primeng/misc/blockui/backend/uuid.ts', 'src/main/webapp/app/primeng/misc/blockui/backend/uuid.ts');
        this.template('src/main/webapp/app/primeng/misc/blockui/model/employee.ts', 'src/main/webapp/app/primeng/misc/blockui/model/employee.ts');
        this.template('src/main/webapp/app/primeng/misc/blockui/service/employee.service.ts', 'src/main/webapp/app/primeng/misc/blockui/service/employee.service.ts');

        const countryComponents = { orderlist: 'data', picklist: 'data', autocomplete: 'inputs', select: 'inputs' };
        for (var component in countryComponents) {
            this.template(`src/main/webapp/app/primeng/${countryComponents[component]}/${component}/service/country.ts`, `src/main/webapp/app/primeng/${countryComponents[component]}/${component}/service/country.ts`);
            this.template(`src/main/webapp/app/primeng/${countryComponents[component]}/${component}/service/country.service.ts`, `src/main/webapp/app/primeng/${countryComponents[component]}/${component}/service/country.service.ts`);

        }
        this.template('src/main/webapp/app/primeng/fileupload/fileupload/backend/fake-backend.ts', 'src/main/webapp/app/primeng/fileupload/fileupload/backend/fake-backend.ts');

        this.template(`src/main/webapp/assets/data/json/browsers/browsers.json`, `src/main/webapp/content/primeng/assets/data/json/browsers/browsers.json`);
        this.copyImageFiles(`src/main/webapp/assets/data/images/browsers/firefox.png`, `src/main/webapp/content/primeng/assets/data/images/browsers/firefox.png`);
        this.copyImageFiles(`src/main/webapp/assets/data/images/browsers/ie.png`, `src/main/webapp/content/primeng/assets/data/images/browsers/ie.png`);
        this.copyImageFiles(`src/main/webapp/assets/data/images/browsers/safari.png`, `src/main/webapp/content/primeng/assets/data/images/browsers/safari.png`);
        this.template(`src/main/webapp/assets/data/json/cities/cities.json`, `src/main/webapp/content/primeng/assets/data/json/cities/cities.json`);
        this.template(`src/main/webapp/assets/data/json/places/places.json`, `src/main/webapp/content/primeng/assets/data/json/places/places.json`);
        this.template('src/main/webapp/assets/data/json/events/scheduleevents.json', 'src/main/webapp/content/primeng/assets/data/json/events/scheduleevents.json');
        this.copyImageFiles('src/main/webapp/assets/data/images/avatars/man.png', 'src/main/webapp/content/primeng/assets/data/images/avatars/man.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/avatars/women.png', 'src/main/webapp/content/primeng/assets/data/images/avatars/women.png');
        this.template('src/main/webapp/assets/data/json/vcards/vcards.json', 'src/main/webapp/content/primeng/assets/data/json/vcards/vcards.json');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/primefaces.png', 'src/main/webapp/content/primeng/assets/data/images/logos/primefaces.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/primeng.png', 'src/main/webapp/content/primeng/assets/data/images/logos/primeng.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/primereact.png', 'src/main/webapp/content/primeng/assets/data/images/logos/primereact.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/primeui.png', 'src/main/webapp/content/primeng/assets/data/images/logos/primeui.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/angularjs.png', 'src/main/webapp/content/primeng/assets/data/images/logos/angularjs.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/angular2.svg', 'src/main/webapp/content/primeng/assets/data/images/logos/angular2.svg');
        this.copyImageFiles('src/main/webapp/assets/data/images/logos/angular4.png', 'src/main/webapp/content/primeng/assets/data/images/logos/angular4.png');

        this.template('src/main/webapp/assets/data/json/employees/employees.json', 'src/main/webapp/content/primeng/assets/data/json/employees/employees.json');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Golf.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Golf.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Jetta.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Jetta.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Passat.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Passat.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Polo.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Polo.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Scirocco.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Scirocco.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Touareg.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Touareg.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/cars/Yeni.png', 'src/main/webapp/content/primeng/assets/data/images/cars/Yeni.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/dvi.png', 'src/main/webapp/content/primeng/assets/data/images/docs/dvi.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/mid.png', 'src/main/webapp/content/primeng/assets/data/images/docs/mid.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/mp3.png', 'src/main/webapp/content/primeng/assets/data/images/docs/mp3.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/perl.png', 'src/main/webapp/content/primeng/assets/data/images/docs/perl.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/ppt.png', 'src/main/webapp/content/primeng/assets/data/images/docs/ppt.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/swf.png', 'src/main/webapp/content/primeng/assets/data/images/docs/swf.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/wav.png', 'src/main/webapp/content/primeng/assets/data/images/docs/wav.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/xls.png', 'src/main/webapp/content/primeng/assets/data/images/docs/xls.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/docs/xml.png', 'src/main/webapp/content/primeng/assets/data/images/docs/xml.png');
        this.copyImageFiles('src/main/webapp/assets/data/images/loaders/loader.svg', 'src/main/webapp/content/primeng/assets/data/images/loaders/loader.svg');
        this.template('src/main/webapp/assets/data/json/documents/documents.json', 'src/main/webapp/content/primeng/assets/data/json/documents/documents.json');
        this.template('src/main/webapp/assets/data/json/scores/scores.json', 'src/main/webapp/content/primeng/assets/data/json/scores/scores.json');
        this.template(`src/main/webapp/assets/data/json/countries/countries.json`, `src/main/webapp/content/primeng/assets/data/json/countries/countries.json`);

        _this = this;
        codes.forEach((code) => {
            _this.copyImageFiles(`src/main/webapp/assets/data/images/countries/${code}`, `src/main/webapp/content/primeng/assets/data/images/countries/${code}`);
        });

    },

    install() {
        if (!this.props.confirmation) {
            return;
        }
        if (!this.anyError) {
            const logMsg = `To install your dependencies manually, run: ${chalk.yellow.bold(`${this.clientPackageManager} install`)}`;
            const injectDependenciesAndConstants = (err) => {
                if (err) {
                    this.warning('Install of dependencies failed!');
                    this.log(logMsg);
                }
            };
            const installConfig = {
                bower: false,
                npm: this.clientPackageManager !== 'yarn',
                yarn: this.clientPackageManager === 'yarn',
                callback: injectDependenciesAndConstants
            };
            this.installDependencies(installConfig);
        } else {
            if (this.clientPackageManager === 'yarn') {
                this.warning(`There is some problem. You need to resolve them, and launch ${chalk.yellow.bold('yarn install')}`);
            } else {
                this.warning(`There is some problem. You need to resolve them, and launch ${chalk.yellow.bold('npm install')}`);
            }
        }
    },

    end() {
        this.log('End of primeng components generator');
    }
});
