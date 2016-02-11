var module = angular.module("angularMarkdownPlus", []);

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
          "hiddenButtons": [
            "cmdPreview"
          ],
          "onChange": function(element){
            scope.$apply(function(){
              scope.ngModel = element.getContent();
            });
          }
        };

        element.markdown(bootstrapMarkdownOpts);
        scope.editor = element.data("markdown");

        scope.$watch("ngModel", function(newValue){
          if(!angular.equals(scope.editor.getContent(), newValue)) {
            scope.editor.setContent(newValue);
          }
        });

        element.addClass("editorified");
      }
    }
  } //end return
}]);

module.directive("markdownPreview", [function(){
  return {
    restrict: "E",
    scope: {
      "ngModel": "=",
      "placeholder": "@"
    },
    template: "<div class='preview-output' ng-bind-html='output'></div>",
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
            scope.output = scope.placeholder;
            return;
          }
          scope.output = marked(newValue);
        });
        element.addClass("previewified");
      }
    }

  } // end return
}]);
