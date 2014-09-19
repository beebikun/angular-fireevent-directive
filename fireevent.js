angular.module('fireEvent', [])
  .factory('$fireEvent', ['$timeout', function($timeout) {
    function create(eventName){
      var event; // The custom event that will be created

      if (document.createEvent) {
        event = document.createEvent("HTMLEvents");
        event.initEvent(eventName, true, true);
      } else {
        event = document.createEventObject();
        event.eventType = eventName;
      }

      event.eventName = eventName;
      return event
    }

    function fire(eventName, element){
      var event = create(eventName, element)
      var element = element || document;
      if (document.createEvent) {
        element.dispatchEvent(event);
      } else {
        element.fireEvent("on" + event.eventType, event);
      }
    }

    var $fireEvent = new Object;
    $fireEvent.fire = fire;
    $fireEvent.delayFire = function(fn, eventName, element){
      $timeout(function(){
        if(!fn()) $fireEvent.delayFire(fn, eventName, element)
        else $fireEvent.fire(eventName, element)
      }, 10)
    }

    return $fireEvent
}]);