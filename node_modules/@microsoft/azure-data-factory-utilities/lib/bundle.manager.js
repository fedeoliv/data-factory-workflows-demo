"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var https = require("https");
var path = require("path");
var child_process_1 = require("child_process");
var utils_1 = require("./utils");
var BundleManager = /** @class */ (function () {
    function BundleManager(_bundleUrl, _nodeOptions) {
        if (_bundleUrl === void 0) { _bundleUrl = BundleManager.defaultBundleUrl; }
        this._bundleUrl = _bundleUrl;
        this._nodeOptions = _nodeOptions;
    }
    BundleManager.prototype.invokeBundle = function (args) {
        var _this = this;
        if (!fs.existsSync(BundleManager.defaultBundleDir)) {
            fs.mkdirSync(BundleManager.defaultBundleDir);
        }
        var file = fs.createWriteStream(BundleManager.defaultBundleFilePath);
        utils_1.printToConsole("Downloading bundle from: " + this._bundleUrl);
        utils_1.printToConsole("Process cwd: " + process.cwd());
        https.get(this._bundleUrl, function (response) {
            response.pipe(file);
            file.on('finish', function () {
                file.close();
                utils_1.printToConsole("Bundle downloaded successfully, saved in: " + BundleManager.defaultBundleFilePath);
                var escapedBundleFilePath = utils_1.escapeArgIfNeeded(BundleManager.defaultBundleFilePath);
                var argsToInsert = args.join(' ');
                utils_1.printToConsole('Executing bundle...');
                if (_this._nodeOptions) {
                    utils_1.printToConsole("Using the following node options: " + _this._nodeOptions);
                }
                utils_1.printToConsole("Inserting the following arguments: " + argsToInsert);
                var execCommand = ['node', _this._nodeOptions, escapedBundleFilePath, argsToInsert].join(' ');
                _this._execShellCommand(execCommand);
            });
        });
    };
    BundleManager.prototype._execShellCommand = function (cmd) {
        return new Promise(function (resolve) {
            utils_1.printToConsole("Executing bundle file, full command:\n\n" + cmd + "\n\n");
            var bundleProcess = child_process_1.exec(cmd, function (error, stdout) {
                utils_1.printToConsole(stdout);
                if (error) {
                    utils_1.printToConsole("\n=====ERROR=====\n" + error.toString());
                }
                utils_1.printToConsole("Execution finished....");
                resolve();
            });
            bundleProcess.on('close', function (exitCode) {
                if (exitCode !== 0) {
                    // tslint:disable-next-line:no-string-throw
                    throw "Execution failed with exit code: " + exitCode;
                }
            });
        });
    };
    BundleManager.defaultBundleUrl = 'https://adf.azure.com/assets/cmd-api/main.js';
    BundleManager.defaultBundleDir = 'downloads';
    BundleManager.defaultBundleName = 'main.js';
    BundleManager.defaultBundleFilePath = path.join(process.cwd(), BundleManager.defaultBundleDir, BundleManager.defaultBundleName);
    return BundleManager;
}());
exports.BundleManager = BundleManager;
