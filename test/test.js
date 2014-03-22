var availableTests = ['RequestTest', 'UtilTest', 'FilterTest'];

(function run(testsToRun){
    testsToRun = testsToRun || availableTests;

    for(var i; i<testsToRun; i++){
        var test = testsToRun[i];
        if(test in availableTests){
            require(testsToRun[i]);
        }
    }
})();