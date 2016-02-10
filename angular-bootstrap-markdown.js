var module = angular.module("angularBootstrapMarkdown", []);

module.directive("markdownEditor", [function(){
  return {
    restrict: "E",
    scope: {
      "ngModel": "="
    },
    link: function(scope, element, attrs){

      if(!element.markdown)
      {
        throw Error("bootstrap-markdown.js must be loaded.");
      }

      if(!element.hasClass("editorified")) {
        var bootstrapMarkdownOpts = {
          "autofocus": false,
          "savable": false,
          "onChange": function(element){
            scope.$apply(function(){
              scope.ngModel = element.getContent();
            });
          }
        };

        element.markdown(bootstrapMarkdownOpts);
        element.addClass("editorified");
      }
    }
  } //end return
}]);

module.directive("markdownPreview", [function(){
  return {
    restrict: "E",
    scope: {
      "ngModel": "="
    },
    template: "<div class='preview-output' ng-bind-html='output'>Nothing yet...</div>",
    link: function(scope, element, attrs){

      scope.output = null;

      if(!marked)
      {
        throw Error("marked.js must be loaded.");
      }

      if(!element.hasClass("previewified")) {
        marked = marked.setOptions({
          renderer: new marked.Renderer()
        });
        scope.$watch("ngModel", function(newValue){
          if(newValue == null || newValue.trim() == "") {
            scope.output = null;
            return;
          }
          scope.output = marked(newValue);
        });
        element.addClass("previewified");
      }
    }

  } // end return
}]);
