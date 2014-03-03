angular.module("umbraco")
    .controller("tooorangey.uCssClassNameIconPickerController",
    function ($scope, $http, assetsService) {
         
        //watch the bound model value, when it chagnes scroll to the icon
        $scope.$watch('model.value', function (newValue, oldValue) {
            $scope.goToIcon(newValue);
        });
        //a variable to store the matching class names
        $scope.classnames = [];

        //the html pattern for each matching item defaults for old font-awesome/bootstrap this is "icon icon-"
        // new font awesome has class="fa fa-{0} you can override this in the config for the datatype in umbraco
        // every reference to {0} is replaced with the matching classname
        // so you could use this for background images as well as icons...
        $scope.iconpattern = '<i class="fa fa-{0}"></i>';
        if ($scope.model.config.iconPattern != '') {
            $scope.iconpattern = $scope.model.config.iconPattern;
        }
        // function to write out the html for the current element class name using the icon pattern
        $scope.renderIconPattern = function (currentClassName) {
            return $scope.iconpattern.replace("{0}", currentClassName);
        }
        $scope.goToIcon = function (selectedClassName) {
            //if element is visible we can animate / scroll to it
            var scrollPane = angular.element(".uCssClassNameIconPicker");
            var scrollTo = angular.element("#iconHolder-" + selectedClassName);
            var scrollToVisible = angular.element("#iconHolder-" + selectedClassName + ":visible");
            if (scrollToVisible.length > 0) {
                var scrollPos = scrollTo.offset().top + scrollPane.scrollTop() - 500;
                scrollPane.animate({ scrollTop: scrollPos }, 150, 'swing', function () { });
            }
        
        }
        // function to determine whether the current item is selected
        $scope.getSelectedClass = function (currentClassName, selectedClassName) {
            if (currentClassName == selectedClassName) {
                return "selected";
            }
            else {
                return "";
            }
        }
       
        // method to set the property values model value to be the new selected class name
        // see how the dropdown automatically changes because it is bound to model.value
        $scope.setSelectedClass = function (selectedClassName) {
            $scope.model.value = selectedClassName;
            // $scope.selected = selectedClassName;


        }

        // method to get the matching classnames from the stylesheet
        $scope.getClassNames = function () {

            var cssPath = $scope.model.config.cssPath;
            var cssRegexPattern = $scope.model.config.cssRegex;
            var excludeList = $scope.model.config.excludeList;
            var iconPattern = $scope.model.config.iconPattern;

            //validate cssPath & cssRegex supplied
            // load the supplied css stylesheet using the umbraco assetsService
            assetsService.loadCss(cssPath);

            //default values for testing
            if (cssPath == '') {
                cssPath = '/css/font-awesome.css';
            }
            if (cssRegexPattern == '') {
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
   