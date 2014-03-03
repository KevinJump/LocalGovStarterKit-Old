angular.module("umbraco")
    .controller("tooorangey.uCssClassNameDropdownController",
    function ($scope, $http) {
        $scope.classnamestest = [
    { name: 'hospital' },
    { name: 'telephone' },
    { name: 'fish' },
    { name: 'swan' },
    { name: 'goaty' }
  ];

        $scope.classnames = [];

        $scope.getClassNames = function () {

            var cssPath = $scope.model.config.cssPath;
            var cssRegexPattern = $scope.model.config.cssRegex;
            var excludeList = $scope.model.config.excludeList || '';
           
            //validate cssPath & cssRegex supplied
          
            //default values for testing
            if (cssPath == '') {
                cssPath = '/css/font-awesome.css';
            }
            if (cssRegexPattern == ''){
                
                cssRegexPattern = '\.fa-(.*?):before';
            }
            
            var cssRegex = new RegExp(cssRegexPattern, 'g');
           // excludeList = 'large,flag,gift';
            // get the classnames somehow from the specified stylesheet
            var matches = [];
            var cssText = '';
            var isError = false;
            var hasMatches = false;
            //use angular http request to make a cached request for the stylesheet content
            $http({ method: 'GET', url: cssPath, cache: true }).
  success(function (data, status, headers, config) {
      cssText = data;
      if (cssRegex.test(cssText)) {
          hasMatches = true;
          var match = cssRegex.exec(cssText);
          matches.push(match[1]);
          while (match != null) {
              match = cssRegex.exec(cssText);
              // check if match has populated array
              if (match != null && match.length > 1) {
                  //check if array already contains match and not on exclude list
                  if (!(matches.indexOf(match[1]) > 0) && !(excludeList.split(',').indexOf(match[1]) > 0)) {
                      matches.push(match[1]);
                      hasMatches = true;

                  }
              }
          }
      }
      matches.sort();
      if (!hasMatches && !isError) {
          isError = true;
          $scope.info = 'no matches in stylesheet for regex: ' + cssRegexPattern;
      }


  }).
  error(function (data, status, headers, config) {
      $scope.info = 'stylesheet or file: ' + cssPath + ' not found on server'
      isError = true;
  });
            $scope.classnames = matches;
            return matches;
        }
        //call getclassnames to populate classnames scope
        $scope.getClassNames();
    });


     